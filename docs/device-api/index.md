# Device API Protocol

## Overview

The Device API is a protocol used by Pirate MIDI devices that allows for control of the device and configuration exchange to and from the device using the Pirate MIDI web editor or custom applications.

The protocol is **language-agnostic** and relies solely on serial port communication using ASCII characters. Any programming language or platform that can open a serial port and send/receive text data can communicate with Pirate MIDI devices.

## Transport Methods

The Device API currently supports communication via:

- **CDC Interface** (ASCII characters over USB Serial)
- **MIDI System Exclusive** (planned) - ASCII data wrapped inside SysEx packets

## Data Size Limits and Transfer Strategies

### Simple Devices (Scribble, CLiCK)

Simple devices have smaller configuration structures and can handle complete bank transfers in a single operation. An entire `bankSettings` packet can be sent without concern for memory overflow.

### Complex Devices (Bridge OS: Aero, Bridge4, Bridge6, Bridge8, FlexiHub)

Bridge OS devices have significantly larger `bankSettings` structures due to their extensive footswitch configurations, message stacks, and advanced features. Sending an entire bank configuration in a single transfer may **overflow the device's receiving memory buffer**, causing the transfer to fail or corrupt data.

#### Recommended Transfer Strategy for Bridge OS Devices

**Step 1: Send Non-Footswitch Settings**

First, send all bank-level settings excluding the footswitches array:

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"bankId":1820074671,"bankName":"Lead Patch","midiClocks":[...],"bankMessages":{...},...}~
Device → ok~
```

**Step 2: Send Each Footswitch Individually**

Send each footswitch as a separate transfer, in numerical order (footswitch 0, then 1, then 2, etc.):

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"footswitches":[{"name":"FS 1","primaryMode":"toggle",...}]}~
Device → ok~
```

Then for footswitch 1:

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"footswitches":[{},{"name":"FS 2","primaryMode":"press",...}]}~
Device → ok~
```

**Important Rules:**

1. **Send footswitches in numerical order** (0, 1, 2, 3, etc.)
2. **Include preceding footswitch entries as empty objects**: When sending footswitch 2, include two empty objects `[{},{}]` before the actual footswitch 2 data
3. **Do not include following footswitches**: When sending footswitch 2, do not include data for footswitches 3, 4, 5, etc.
4. **Each footswitch is a complete transfer**: Each footswitch should contain all its configuration (modes, colors, message stacks, etc.)

#### Example: Sending Footswitch 2 on a Bridge6

```json
{
  "footswitches": [
    {},
    {},
    {
      "name": "FS 3",
      "primaryMode": "toggle",
      "primaryColor": 16711680,
      "toggleOnMessages": {
        "numMessages": 1,
        "messages": [...]
      },
      "toggleOffMessages": {...},
      "pressMessages": {...}
    }
  ]
}
```

The device will parse this, recognize it's updating footswitch index 2, and merge it with the existing bank configuration while ignoring the empty objects at indices 0 and 1.

### Why Do This?

The device's JSON parser can handle **partial configurations** by merging incoming data with existing settings. When you send only a `footswitches` array with sparse entries, the device:

1. Identifies which footswitch index is being updated (based on position in array)
2. Merges that footswitch's complete configuration
3. Ignores empty objects and missing fields
4. Preserves all other existing bank data

This keeps individual transfer sizes manageable while allowing complex configurations to be sent reliably.

## Protocol Structure

All communication follows a consistent structure designed for efficient, reliable data exchange.

### Command Format

Each command is sent as a separate packet:

```
[COMMAND]~
```

- **Command**: 4 uppercase letters identifying the operation
- **Terminator**: `~` character signifying end of transmission
- Each command must be sent separately and the host must wait for the device response before sending the next command

**Important:** The host must send **only** the command or data followed by the `~` terminator. Do not send any additional characters such as carriage returns (`\r`), line feeds (`\n`), or any other whitespace after the terminator. The `~` character marks the complete end of the packet.

### Text Formatting

- Command identifiers use **UPPERCASE**
- JSON keys use **camelCase** formatting
- JSON payloads are minimized (no extra whitespace)

### Response Handling

**The device will always provide a response** to each command sent by the host:

- `ok~` - Command was received and processed successfully
- `[jsonData]~` - The requested data (for DREQ and CHCK commands)

The host must wait for the device response before sending the next command in the sequence.

## Commands

The Device API supports four primary command types:

| Command | Name | Description |
|---------|------|-------------|
| `CHCK` | Check | Retrieves device properties (firmware version, device name, hardware version, unique ID, etc.) |
| `DREQ` | Data Request | Requests configuration data from the device |
| `DTXR` | Data Transfer | Sends configuration data to the device |
| `CTRL` | Control | Controls device functions (bootloader, preset navigation, reset, etc.) |

## Communication Flow

### 1. Device Information Query (CHCK)

The CHCK command queries basic device information.

**Host sends:**
```
CHCK~
```

**Device responds with JSON data:**
```json
{"deviceModel":"Bridge6","firmwareVersion":"2.1.0","hardwareVersion":"1.1.3","deviceName":"Bridge 6","uId":5,"profileId":0}~
```

*Note: This example shows data from a Bridge6 device. All devices return similar fields, though some field names or additional fields may vary by device model.*

### 2. Requesting Data (DREQ)

The DREQ command requests configuration data from the device. This is a **multi-step process** where each packet is sent separately.

#### Data Types

- `globalSettings` - Device-wide configuration
- `bankSettings` - Preset/bank configuration (requires bank index parameter)

#### Requesting Global Settings

**Step 1 - Host sends command:**
```
DREQ~
```

**Step 1 - Device responds:**
```
ok~
```

**Step 2 - Host sends data type:**
```
globalSettings~
```

**Step 2 - Device responds with configuration data:**
```json
{"currentBank":0,"midiChannel":0,"ledBrightness":66,"uiMode":"extended","holdTime":1000,"deviceName":"Bridge 6","profileId":0,...}~
```

*Note: This example shows abbreviated data from a Bridge6 device. Actual responses contain many more fields depending on device capabilities. The structure and field names vary by device model.*

#### Requesting Bank Settings

**Step 1 - Host sends command:**
```
DREQ~
```

**Step 1 - Device responds:**
```
ok~
```

**Step 2 - Host sends data type with bank index:**
```
bankSettings,0~
```
(Where `0` is the zero-indexed bank number: 0-127)

**Step 2 - Device responds with bank configuration data:**
```json
{"bankName":"New Bank","bankId":1820074671,"midiClocks":[{"tempo":0},{"tempo":0}],"bankMessages":{"numMessages":0,"messages":[]},...}~
```

*Note: This example shows abbreviated data from a Bridge6 device. Actual bank responses contain significantly more data including footswitch configurations, message stacks, and device-specific features. The structure varies by device model.*

### 3. Transferring Data (DTXR)

The DTXR command sends configuration data to the device. This is a **multi-step process** where each packet is sent separately.

#### Transferring Global Settings

**Step 1 - Host sends command:**
```
DTXR~
```

**Step 1 - Device responds:**
```
ok~
```

**Step 2 - Host sends data type:**
```
globalSettings~
```

**Step 2 - Device responds:**
```
ok~
```

**Step 3 - Host sends JSON configuration:**
```json
{"deviceName":"My Bridge","midiChannel":5}~
```

**Step 3 - Device responds:**
```
ok~
```

*Note: You can send partial configurations containing only the fields you wish to update. The device will merge these changes with existing settings.*

#### Transferring Bank Settings

**Step 1 - Host sends command:**
```
DTXR~
```

**Step 1 - Device responds:**
```
ok~
```

**Step 2 - Host sends data type with bank index:**
```
bankSettings,0~
```
(Where `0` is the zero-indexed bank number: 0-127)

**Step 2 - Device responds:**
```
ok~
```

**Step 3 - Host sends JSON configuration:**
```json
{"bankId":1820074671,"bankName":"Lead Patch"}~
```

**Step 3 - Device responds:**
```
ok~
```

*Note: More complex devices such as Bridge OS controllers (Bridge4, Bridge6, Bridge8, etc.) automatically save bank data when received via DTXR. For these devices, the `savePresets` CTRL command may not be available or necessary. Simpler devices like the Scribble require explicit saving using `savePresets`. Check device-specific documentation for save behavior.*

### 4. Control Commands (CTRL)

The CTRL command executes device functions. This is a **two-step process**.

**Step 1 - Host sends command:**
```
CTRL~
```

**Step 1 - Device responds:**
```
ok~
```

**Step 2 - Host sends JSON payload:**
```json
{"command":["restart"]}~
```

**Step 2 - Device responds:**
```
ok~
```

#### Control Command Examples

**Single command:**
```
Host → CTRL~
Device → ok~
Host → {"command":["bankUp"]}~
Device → ok~
```

**Multiple commands (executed in order):**
```
Host → CTRL~
Device → ok~
Host → {"command":["bankUp","savePresets"]}~
Device → ok~
```

**Command with parameter:**
```
Host → CTRL~
Device → ok~
Host → {"command":[{"goToBank":5}]}~
Device → ok~
```

## Banks vs. Presets Terminology

The terms "bank" and "preset" are often used interchangeably in MIDI terminology, both referring to stored configurations that can be recalled via MIDI Program Change messages.

**Important terminology notes:**

- When using **DREQ or DTXR commands**, always use `bankSettings` regardless of the device
- The term `bankSettings` is the standardized API term across all Pirate MIDI devices
- Some devices (like the Scribble) use the term "presets" in their user interface and certain CTRL commands (e.g., `savePresets`)
- Both terms refer to the same concept: a stored configuration that represents a MIDI Program Change location
- Bank/preset numbers are **zero-indexed** (0-127) in the API, even though they may be displayed as 1-128 in the user interface

**Examples:**
- API command: `bankSettings,0` refers to what users might call "Preset 1"
- CTRL command: `savePresets` saves all banks/presets to flash memory
- User interface: May display "Preset 5" for what the API calls `bankSettings,4`

## Data Scope

### Global Settings

Device-wide configuration that applies across all presets/banks:

- MIDI channels and routing
- Display settings (brightness, colors, light mode)
- Wireless configuration (BLE/WiFi)
- Global switch behaviors
- MIDI clock settings
- MIDI thru routing
- Current active bank/preset

### Bank Settings

Preset-specific configuration (up to 128 banks per device, indexed 0-127):

- Bank/preset name and display text
- Color overrides
- BPM (beats per minute)
- Switch messages (press and hold actions)
- Custom MIDI messages
- Preset recall messages

## Complete Workflow Examples

**Important Note on Partial Configurations:**

While partial configuration packets (such as sending only `{"bankName":"New Name"}` for a `bankSettings` transfer) may work in some cases, and the device should ignore non-referenced keys, this approach is **not recommended** due to the large number of possible permutations and device-specific behaviors.

**Sending partial configurations may result in:**
- Malformed configurations on the device
- Unexpected behavior or missing settings
- Inconsistent state across different firmware versions
- Silent failures where some fields are not updated

**Best Practice:** Always send as much data as possible when transferring configurations, respecting the data size limits mentioned in the "Data Size Limits and Transfer Strategies" section above. For Bridge OS devices, follow the recommended strategy of:
1. Sending complete non-footswitch bank settings first
2. Sending each footswitch individually with complete footswitch data

This ensures reliable, predictable behavior across all device models and firmware versions.

---

### Example 1: Query Device Information

```
Host → CHCK~
Device → {"deviceModel":"Scribble","firmwareVersion":"1.0.0",...}~
```

### Example 2: Read Global Settings

```
Host → DREQ~
Device → ok~
Host → globalSettings~
Device → {"deviceName":"Scribble","currentBank":0,"midiChannel":1,...}~
```

### Example 3: Read Bank 5 Settings

```
Host → DREQ~
Device → ok~
Host → bankSettings,5~
Device → {"bankId":5,"bankName":"Lead Sound","bpm":120,...}~
```

### Example 4: Update Global Settings

```
Host → DTXR~
Device → ok~
Host → globalSettings~
Device → ok~
Host → {"deviceName":"Studio Controller","midiChannel":10,"ledBrightness":75,"holdTime":1000}~
Device → ok~
```

*Note: While this example shows only a few fields being updated, best practice is to send the complete global settings object you retrieved via DREQ, with your modifications applied.*

### Example 5: Update Bank Name (Simple Device)

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"bankId":1820074671,"bankName":"Intro Song","midiClocks":[...],...}~
Device → ok~
```

*Note: For simple devices, send the complete bank configuration with your changes. For Bridge OS devices, see Example 8 for the recommended footswitch transfer strategy.*

### Example 6: Navigate to Bank 10

```
Host → CTRL~
Device → ok~
Host → {"command":[{"goToBank":10}]}~
Device → ok~
```

### Example 7: Save All Banks and Restart

```
Host → CTRL~
Device → ok~
Host → {"command":["savePresets","restart"]}~
Device → ok~
```

*Note: The `savePresets` command is device-dependent. Bridge OS controllers (Bridge4, Bridge6, Bridge8, etc.) automatically save bank data and may not implement this command. Simpler devices like the Scribble require this command to persist changes to flash memory. If your device returns an error or doesn't recognize `savePresets`, it likely saves automatically.*

### Example 8: Update Footswitch on Bridge OS Device

**Step 1: Send non-footswitch bank settings**

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"bankId":1820074671,"bankName":"Lead Patch","midiClocks":[{"tempo":120},{"tempo":0}],"bankMessages":{"numMessages":0,"messages":[]},...}~
Device → ok~
```

**Step 2: Send footswitch 0**

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"footswitches":[{"name":"FS 1","primaryMode":"toggle","primaryColor":16711680,"toggleOnMessages":{...},"toggleOffMessages":{...},...}]}~
Device → ok~
```

**Step 3: Send footswitch 1**

```
Host → DTXR~
Device → ok~
Host → bankSettings,0~
Device → ok~
Host → {"footswitches":[{},{"name":"FS 2","primaryMode":"press","primaryColor":65280,"pressMessages":{...},...}]}~
Device → ok~
```

*Note: Notice how footswitch 1 includes an empty object `{}` before its data to indicate the correct array position. This pattern continues for each subsequent footswitch.*

## Best Practices

### Communication Timing

1. **Always wait for device response** before sending the next command
2. Process responses in order - the device executes commands sequentially
3. Allow adequate time for flash memory operations (especially after `savePresets`)
4. Implement timeout detection (recommended: 1-5 seconds per command)

### Command Sequencing

For DREQ and DTXR commands:
1. Send the command (`DREQ~` or `DTXR~`)
2. Wait for `ok~`
3. Send the data type (e.g., `globalSettings~` or `bankSettings,5~`)
4. Wait for response (`ok~` or configuration data)
5. For DTXR only: Send the JSON configuration
6. Wait for final `ok~`

For CTRL commands:
1. Send the command (`CTRL~`)
2. Wait for `ok~`
3. Send the JSON payload (e.g., `{"command":["restart"]}~`)
4. Wait for final `ok~`

### Data Validation

1. Validate JSON structure before sending (proper syntax, no trailing commas)
2. Ensure all required fields are present for each data type
3. Check value ranges match device capabilities
4. Use proper camelCase formatting for all JSON keys
5. Minimize JSON (remove unnecessary whitespace)

### Error Handling

1. Implement timeout detection - if no response is received within a reasonable time (1-5 seconds), the connection may be lost
2. Validate that responses are either `ok~` or valid JSON followed by `~`
3. Handle unexpected responses gracefully
4. Log all communication for debugging purposes
5. If a command fails, do not proceed with dependent commands

### Session Management

1. Start each session with a `CHCK~` command to verify connection and device identity
2. Read current settings (`DREQ`) before making modifications
3. After updating multiple banks on devices that require manual saving (e.g., Scribble), use `CTRL{"command":["savePresets"]}~` to persist changes. Bridge OS devices (Bridge4, Bridge6, Bridge8, etc.) automatically save bank data.
4. For critical changes, verify by reading back the configuration
5. Close the serial port cleanly when finished

## Serial Port Configuration

**Typical settings for CDC interface:**
- **Baud Rate:** 115200 (device-specific, check documentation)
- **Data Bits:** 8
- **Parity:** None
- **Stop Bits:** 1
- **Flow Control:** None

## JSON Schema

Each device has a specific JSON schema defining:

- Available configuration keys
- Value types and constraints
- Enumerated options for string fields
- Nested structure for complex settings
- Required vs. optional fields

Device-specific schemas are documented in their respective sections.

## Device-Specific Documentation

For detailed information about specific devices, including complete JSON schemas and configuration options, see:

- [Scribble](devices/scribble.md)
- (Additional devices will be listed here)

## Troubleshooting

### Common Issues

**No response from device:**
- Verify serial port is open and configured correctly
- Check that baud rate matches device specification (typically 115200)
- Ensure `~` terminator is included in every transmission
- Confirm USB cable supports data (not just power)
- Try a different USB port

**Unexpected responses:**
- Verify command syntax is correct (case-sensitive)
- Check that you're waiting for each response before sending next command
- Ensure JSON is valid and properly formatted
- Verify you're using the correct data type names

**Settings not persisting:**
- For devices that require manual saving (e.g., Scribble), use `CTRL{"command":["savePresets"]}~` after making changes
- Bridge OS devices (Bridge4, Bridge6, Bridge8, etc.) automatically save bank data when received
- Wait for `ok~` response before disconnecting
- Check that device has sufficient flash memory available
- Verify the device didn't restart unexpectedly

**Bank/preset confusion:**
- Remember: API uses zero-indexed banks (0-127)
- UI might display as 1-128
- Always use `bankSettings` in API commands, regardless of device

## Version History

- **v1.0** - Initial CDC interface implementation
- **Future** - MIDI SysEx wrapper support planned