# Device API Documentation

Welcome to the Pirate MIDI Device API documentation. This protocol enables programmatic control and configuration of Pirate MIDI controllers through serial communication.

## What is the Device API?

The Device API is a language-agnostic protocol that allows developers to:

- **Query device information** - Get firmware version, hardware details, and device identity
- **Read configurations** - Retrieve global settings and bank/preset configurations
- **Update settings** - Modify device behavior, MIDI routing, and preset data
- **Control functions** - Navigate presets, save changes, and trigger device operations

The protocol works over USB CDC (serial) communication using simple ASCII commands and JSON data packets.

## Getting Started

The [Protocol Overview](Device-API/index.md) provides comprehensive documentation of:

- Command structure and communication flow
- Data transfer strategies for different device types
- Complete workflow examples
- Best practices and troubleshooting

**→ [Read the Protocol Overview](Device-API/index.md)**

## Supported Devices

The Device API is implemented across the Pirate MIDI product line:

- **Simple Devices**: Scribble, CLiCK
- **Bridge OS Devices**: Aero, Bridge4, Bridge6, Bridge8, FlexiHub

Each device implements the same core protocol with device-specific configuration fields and capabilities.


## Quick Example

Here's a simple interaction querying device information:

```
Host → CHCK~
Device → {"deviceModel":"Bridge6","firmwareVersion":"2.1.0",...}~
```

The protocol uses a multi-step approach where each command is sent separately and the device responds after each step.

## Use Cases

- **Custom Editors**: Build specialized configuration tools for specific workflows
- **Integration**: Connect Pirate MIDI devices with DAWs, show control systems, or custom rigs
- **Automation**: Programmatically manage large preset libraries or configuration backups
- **Development**: Create third-party applications and utilities for Pirate MIDI hardware

## Documentation Structure

- **[Protocol Overview](Device-API/index.md)** - Complete protocol specification, commands, and examples
- **Device-Specific References** - Detailed configuration schemas for each device model (coming soon)

## Need Help?

- Check the [troubleshooting section](Device-API/index.md#troubleshooting) in the overview
- Review the [complete workflow examples](Device-API/index.md#complete-workflow-examples)
- Visit the [Pirate MIDI support page](https://piratemidi.com/support)

---

**Ready to dive in?** Start with the **[Protocol Overview](Device-API/index.md)** to learn the complete Device API specification.