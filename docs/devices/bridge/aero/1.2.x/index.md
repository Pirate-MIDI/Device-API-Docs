# Aero - Firmware 1.2.x

<!-- This is a template file. The firmware station dispatch workflow will generate -->
<!-- a copy of this structure for each firmware version (e.g., 2.1.0.md). -->

## Device Properties

Device properties define the capabilities of the hardware device for key hardware features and firmware according to this version.
An examples of hardware properties are the number of MIDI interfaces (made up of USB, standard MIDI IO, and Flexiports where applicable).
Most keys relate to firmware structure such as the maximum size of message stacks, the maximum size of names etc...

```json
{
  "placeholder": "Replace with actual CHCK response properties for this firmware version"
}
```

## Device Schema

The device schema defines the complete structure of `globalSettings` and `bankSettings` for this firmware version, including all available configuration keys, value types, constraints, and enumerated options.

```json
{
  "placeholder": "Replace with actual device schema for this firmware version"
}
```

## Templates

Starter templates for this device and firmware version. Load into the editor or transfer manually to your device using the `DTXR` command as described in the [Protocol Overview](../../../../device-api/index.md).

### Factory Default

Complete factory default configuration.

<a href="factory-default.json" download="aero-1.2.x-factory-default.json" class="md-button md-button--primary">Download Template</a>

???+ info "Global Settings"
    ```json
    {
      "deviceName": "Aero",
      "midiChannel": 1,
      "usbMidiEnabled": true,
      "bleMidiEnabled": true,
      "brightness": 100,
      "sleepTimeout": 300,
      "bankCount": 8,
      "midiThrough": true,
      "expressionPedals": 2,
      "auxSwitchEnabled": true,
      "firmwareVersion": "1.2.0"
    }
    ```

???+ info "Bank Settings"
    ```json
    [
      {
        "bankName": "Bank 1",
        "bankColor": "#5b8dca",
        "footswitches": [
          {
            "name": "FS1",
            "mode": "toggle",
            "actions": {
              "press": [
                {
                  "type": "controlChange",
                  "channel": 1,
                  "cc": 80,
                  "value": 127
                }
              ],
              "release": [],
              "longPress": []
            }
          },
          {
            "name": "FS2",
            "mode": "momentary",
            "actions": {
              "press": [
                {
                  "type": "controlChange",
                  "channel": 1,
                  "cc": 81,
                  "value": 127
                }
              ],
              "release": [
                {
                  "type": "controlChange",
                  "channel": 1,
                  "cc": 81,
                  "value": 0
                }
              ],
              "longPress": []
            }
          }
        ],
        "expressionPedals": [
          {
            "name": "EXP1",
            "cc": 1,
            "channel": 1,
            "min": 0,
            "max": 127,
            "curve": "linear"
          }
        ]
      }
    ]
    ```

### Blank

Blank configuration for starting from scratch.

<a href="blank.json" download="aero-1.2.x-blank.json" class="md-button md-button--primary">Download Template</a>

???+ info "Global Settings"
    ```json
    {
      "deviceName": "",
      "midiChannel": 1,
      "usbMidiEnabled": false,
      "bleMidiEnabled": false,
      "brightness": 50,
      "sleepTimeout": 0,
      "bankCount": 1,
      "midiThrough": false,
      "expressionPedals": 0,
      "auxSwitchEnabled": false,
      "firmwareVersion": "1.2.0"
    }
    ```

???+ info "Bank Settings"
    ```json
    [
      {
        "bankName": "",
        "bankColor": "#000000",
        "footswitches": [],
        "expressionPedals": []
      }
    ]
    ```
