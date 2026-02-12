# Scribble - Firmware 1.0.x

## Device Properties

Device properties define the capabilities of the hardware device for key hardware features and firmware according to this version.
An examples of hardware properties are the number of MIDI interfaces (made up of USB, standard MIDI IO, and Flexiports where applicable).
Most keys relate to firmware structure such as the maximum size of message stacks, the maximum size of names etc...

```json
{
    "model": "scribble",
    "product": "scribble",
    "firmwareVersion": "1.0.1",
    "numPresets": 128,
    "globalSettings": {
        "numCustomMessages": 8,
        "numMidiInterfaces": 3,
        "numSwitchMessages": 8
    },
    "presetSettings": {
        "numCustomMessages": 8,
        "numPresetMessages": 8,
        "numSwitchMessages": 8
    }
}
```

## Device Schema

The device schema defines the complete structure of `globalSettings` and `bankSettings` for this firmware version, including all available configuration keys, value types, constraints, and enumerated options.

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "piratemidi:scribble:v1.0.1:scribble",
    "title": "Pirate MIDI Scribble Device API (v1.0.1)",
    "type": "object",
    "properties": {
        "deviceSettings": {
            "type": "object",
            "properties": {
                "deviceModel": {
                    "type": "string",
                    "description": "The product model identifier of the Pirate MIDI device."
                },
                "firmwareVersion": {
                    "type": "string",
                    "description": "The current firmware version running on the device."
                },
                "hardwareVersion": {
                    "type": "string",
                    "description": "The hardware revision level of the device."
                },
                "deviceName": {
                    "type": "string",
                    "description": "The user-configurable name assigned to this device instance."
                },
                "uId": {
                    "type": "integer",
                    "description": "A unique identifier that distinguishes this device from others of the same model."
                },
                "profileId": {
                    "type": "integer",
                    "description": "The profile identifier that determines the current feature set and behavior of the device."
                }
            },
            "required": [
                "deviceModel",
                "firmwareVersion",
                "hardwareVersion",
                "deviceName",
                "uId",
                "profileId"
            ],
            "additionalProperties": false,
            "description": "Container for read-only device identification and version information."
        },
        "globalSettings": {
            "type": "object",
            "properties": {
                "deviceName": {
                    "type": "string",
                    "maxLength": 32,
                    "description": "The name displayed on the device and broadcast during BLE discovery."
                },
                "currentBank": {
                    "type": "integer",
                    "minimum": 0,
                    "description": "The currently selected preset bank."
                },
                "lightMode": {
                    "type": "string",
                    "enum": [
                        "light",
                        "dark"
                    ],
                    "description": "Selects between light and dark color schemes for the display interface."
                },
                "mainColour": {
                    "type": "integer",
                    "description": "Sets the primary background color as an RGB888 integer value."
                },
                "textColour": {
                    "type": "integer",
                    "description": "Sets the text color as an RGB888 integer value."
                },
                "displayBrightness": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 100,
                    "description": "Controls the LCD backlight brightness level."
                },
                "midiChannel": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 15,
                    "description": "Sets the MIDI channel for device communication."
                },
                "globalBpm": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Sets the global tempo in beats per minute when using global clock mode."
                },
                "midiOutPortMode": {
                    "type": "string",
                    "enum": [
                        "midiOutA",
                        "midiOutB"
                    ],
                    "description": "Selects which physical MIDI output port receives program change messages from the device."
                },
                "clockMode": {
                    "type": "string",
                    "enum": [
                        "preset",
                        "external",
                        "global",
                        "none"
                    ],
                    "description": "Selects the MIDI clock source: preset (from song settings), external (from incoming MIDI clock), global (from global BPM setting), or none (clock disabled)."
                },
                "clockDisplayType": {
                    "type": "string",
                    "enum": [
                        "bpm",
                        "ms",
                        "indicator"
                    ],
                    "description": "Chooses how to display tempo information on the screen: BPM value, milliseconds per beat, or a visual clock indicator."
                },
                "pcBankOutputs": {
                    "type": "object",
                    "properties": {
                        "usbd": {
                            "type": "integer",
                            "description": "Program change bank value routed through the USB interface."
                        },
                        "ble": {
                            "type": "integer",
                            "description": "Program change bank value routed through the BLE interface."
                        },
                        "midi1": {
                            "type": "integer",
                            "description": "Program change bank value routed through the TRS MIDI interface."
                        }
                    },
                    "required": [
                        "usbd",
                        "ble",
                        "midi1"
                    ],
                    "additionalProperties": false,
                    "description": "Configures which interface routes outgoing program change messages for each bank selection."
                },
                "usbdThruHandles": {
                    "type": "object",
                    "properties": {
                        "usbd": {
                            "type": "boolean",
                            "description": "Enables USB input to pass through to USB output."
                        },
                        "ble": {
                            "type": "boolean",
                            "description": "Enables USB input to pass through to BLE output."
                        },
                        "midi1": {
                            "type": "boolean",
                            "description": "Enables USB input to pass through to TRS MIDI output."
                        }
                    },
                    "required": [
                        "usbd",
                        "ble",
                        "midi1"
                    ],
                    "additionalProperties": false,
                    "description": "Determines which ports forward MIDI data received on the USB interface."
                },
                "bleThruHandles": {
                    "type": "object",
                    "properties": {
                        "usbd": {
                            "type": "boolean",
                            "description": "Enables BLE input to pass through to USB output."
                        },
                        "ble": {
                            "type": "boolean",
                            "description": "Enables BLE input to pass through to BLE output."
                        },
                        "midi1": {
                            "type": "boolean",
                            "description": "Enables BLE input to pass through to TRS MIDI output."
                        }
                    },
                    "required": [
                        "usbd",
                        "ble",
                        "midi1"
                    ],
                    "additionalProperties": false,
                    "description": "Determines which ports forward MIDI data received on the BLE interface."
                },
                "midi1ThruHandles": {
                    "type": "object",
                    "properties": {
                        "usbd": {
                            "type": "boolean",
                            "description": "Enables TRS MIDI input to pass through to USB output."
                        },
                        "ble": {
                            "type": "boolean",
                            "description": "Enables TRS MIDI input to pass through to BLE output."
                        },
                        "midi1": {
                            "type": "boolean",
                            "description": "Enables TRS MIDI input to pass through to TRS MIDI output."
                        }
                    },
                    "required": [
                        "usbd",
                        "ble",
                        "midi1"
                    ],
                    "additionalProperties": false,
                    "description": "Determines which ports forward MIDI data received on the TRS MIDI interface."
                },
                "midiClockOutHandles": {
                    "type": "object",
                    "properties": {
                        "usbd": {
                            "type": "boolean",
                            "description": "Enables MIDI clock output over USB."
                        },
                        "ble": {
                            "type": "boolean",
                            "description": "Enables MIDI clock output over Bluetooth."
                        },
                        "midi1": {
                            "type": "boolean",
                            "description": "Enables MIDI clock output over TRS MIDI."
                        }
                    },
                    "required": [
                        "usbd",
                        "ble",
                        "midi1"
                    ],
                    "additionalProperties": false,
                    "description": "Controls which interfaces transmit MIDI clock signals."
                },
                "switches": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "mode": {
                                "type": "string",
                                "enum": [
                                    "pressPresetUp",
                                    "pressPresetDown",
                                    "holdPresetUp",
                                    "holdPresetDown",
                                    "midiOnly"
                                ],
                                "description": "Determines the switch behavior: preset navigation, hold-triggered preset changes, or MIDI-only mode."
                            },
                            "pressMessages": {
                                "type": "object",
                                "properties": {
                                    "numMessages": {
                                        "type": "integer",
                                        "minimum": 0,
                                        "maximum": 8,
                                        "description": "Number of MIDI messages to send on switch press."
                                    },
                                    "messages": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/$defs/messageItem"
                                        },
                                        "maxItems": 8,
                                        "description": "Array of MIDI messages triggered by a switch press event."
                                    }
                                },
                                "required": [
                                    "numMessages",
                                    "messages"
                                ],
                                "additionalProperties": false,
                                "description": "MIDI messages sent when the switch is pressed."
                            },
                            "holdMessages": {
                                "type": "object",
                                "properties": {
                                    "numMessages": {
                                        "type": "integer",
                                        "minimum": 0,
                                        "maximum": 8,
                                        "description": "Number of MIDI messages to send on switch hold."
                                    },
                                    "messages": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/$defs/messageItem"
                                        },
                                        "maxItems": 8,
                                        "description": "Array of MIDI messages triggered by a switch hold event."
                                    }
                                },
                                "required": [
                                    "numMessages",
                                    "messages"
                                ],
                                "additionalProperties": false,
                                "description": "MIDI messages sent when the switch is held."
                            }
                        },
                        "required": [
                            "mode",
                            "pressMessages",
                            "holdMessages"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 2,
                    "description": "Configuration settings for the two physical switches on the device."
                },
                "customMessages": {
                    "type": "object",
                    "properties": {
                        "numMessages": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 8,
                            "description": "Number of custom messages defined in the global messages array."
                        },
                        "messages": {
                            "type": "array",
                            "items": {
                                "$ref": "#/$defs/messageItem"
                            },
                            "maxItems": 8,
                            "description": "Array of custom MIDI messages sent when the globalCustomMessagesCC control is triggered."
                        }
                    },
                    "required": [
                        "numMessages",
                        "messages"
                    ],
                    "additionalProperties": false,
                    "description": "Container for custom MIDI messages triggered globally via CC control."
                },
                "presetUpCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number that advances to the next preset."
                },
                "presetDownCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number that moves to the previous preset."
                },
                "goToPresetCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number that selects a specific preset by CC value."
                },
                "globalCustomMessagesCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number that triggers the custom messages defined in globalSettings.customMessages."
                },
                "presetCustomMessagesCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number that triggers custom messages specific to the current preset."
                },
                "wirelessType": {
                    "type": "string",
                    "enum": [
                        "ble",
                        "wifi",
                        "none"
                    ],
                    "description": "Selects the wireless connectivity protocol for the device."
                },
                "bleMode": {
                    "type": "string",
                    "enum": [
                        "server",
                        "client"
                    ],
                    "description": "Configures whether the device acts as a BLE server or client."
                },
                "useStaticIp": {
                    "type": "boolean",
                    "description": "Enables static IP configuration instead of DHCP."
                },
                "staticIp": {
                    "type": "string",
                    "description": "The static IP address assigned to the device when static IP is enabled."
                },
                "gatewayIp": {
                    "type": "string",
                    "description": "The gateway IP address for network routing when static IP is enabled."
                },
                "mainTextResize": {
                    "type": "boolean",
                    "description": "Enables larger text rendering for improved readability."
                },
                "midiValueDisplay": {
                    "type": "string",
                    "enum": [
                        "none",
                        "bar",
                        "barPercent",
                        "barValue",
                        "percentOnly",
                        "valueOnly"
                    ],
                    "description": "Selects how incoming MIDI CC values display on screen, choosing between graphical bar representations, percentage text, numeric values, or combinations thereof."
                },
                "midiValueDisplayCC": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 127,
                    "description": "CC number whose received values are displayed on the device screen."
                },
                "kemperPlayerMode": {
                    "type": "boolean",
                    "description": "Enables compatibility mode for Kemper Profiler Player integration."
                }
            },
            "required": [
                "deviceName",
                "currentBank",
                "lightMode",
                "mainColour",
                "textColour",
                "displayBrightness",
                "midiChannel",
                "globalBpm",
                "midiOutPortMode",
                "clockMode",
                "clockDisplayType",
                "pcBankOutputs",
                "usbdThruHandles",
                "bleThruHandles",
                "midi1ThruHandles",
                "midiClockOutHandles",
                "switches",
                "customMessages",
                "presetUpCC",
                "presetDownCC",
                "goToPresetCC",
                "globalCustomMessagesCC",
                "presetCustomMessagesCC",
                "wirelessType",
                "bleMode",
                "useStaticIp",
                "staticIp",
                "gatewayIp",
                "mainTextResize",
                "midiValueDisplay",
                "midiValueDisplayCC",
                "kemperPlayerMode"
            ],
            "additionalProperties": false,
            "description": "Device-wide settings that persist across all presets and affect core functionality."
        },
        "bankSettings": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "bankId": {
                        "type": "integer",
                        "description": "Unique identifier for this preset bank."
                    },
                    "bankName": {
                        "type": "string",
                        "maxLength": 17,
                        "description": "Primary display text shown on the screen for this preset."
                    },
                    "secondaryText": {
                        "type": "string",
                        "maxLength": 17,
                        "description": "Secondary display text shown below the bank name."
                    },
                    "colourOverride": {
                        "type": "boolean",
                        "description": "Enables custom background color for this preset instead of using the default scheme."
                    },
                    "colour": {
                        "type": "integer",
                        "description": "Background color value applied when colourOverride is enabled."
                    },
                    "textColourOverride": {
                        "type": "boolean",
                        "description": "Enables custom text color for this preset instead of using the default scheme."
                    },
                    "textColour": {
                        "type": "integer",
                        "description": "Text color value applied when textColourOverride is enabled."
                    },
                    "bpm": {
                        "type": "number",
                        "minimum": 0,
                        "description": "Tempo in beats per minute for this preset."
                    },
                    "switches": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "pressMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of messages to send on switch press."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "Stack of MIDI messages triggered by a switch press."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Messages sent when the switch is pressed."
                                },
                                "holdMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of messages to send on switch hold."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "Stack of MIDI messages triggered by a switch hold."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Messages sent when the switch is held."
                                }
                            },
                            "required": [
                                "pressMessages",
                                "holdMessages"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 2,
                        "description": "Defines press and hold message overrides for the two physical switches in this preset."
                    },
                    "customMessages": {
                        "type": "object",
                        "properties": {
                            "numMessages": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 8,
                                "description": "Number of active custom messages defined in this bank."
                            },
                            "messages": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/$defs/messageItem"
                                },
                                "maxItems": 8,
                                "description": "Array of MIDI messages, each triggered by a specific CC input."
                            }
                        },
                        "required": [
                            "numMessages",
                            "messages"
                        ],
                        "additionalProperties": false,
                        "description": "Container for MIDI messages triggered by incoming CC control changes on this bank's presets."
                    },
                    "presetMessages": {
                        "type": "object",
                        "properties": {
                            "numMessages": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 8,
                                "description": "Number of active preset-load messages defined in this bank."
                            },
                            "messages": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/$defs/messageItem"
                                },
                                "maxItems": 8,
                                "description": "Array of MIDI messages, each sent when the corresponding preset is selected."
                            }
                        },
                        "required": [
                            "numMessages",
                            "messages"
                        ],
                        "additionalProperties": false,
                        "description": "Container for MIDI messages sent automatically when a preset in this bank is loaded."
                    },
                    "midiValueDisplayOverride": {
                        "type": "boolean",
                        "description": "Enables this preset to override the global MIDI value display settings with custom configuration."
                    },
                    "midiValueDisplay": {
                        "type": "string",
                        "enum": [
                            "none",
                            "bar",
                            "barPercent",
                            "barValue",
                            "percentOnly",
                            "valueOnly"
                        ],
                        "description": "Selects how the MIDI value is displayed on screen, choosing between bar graph variants, percentage, numeric value, or no display."
                    },
                    "midiValueDisplayCC": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 127,
                        "description": "Specifies the MIDI control change number to monitor and display for this preset."
                    }
                },
                "required": [
                    "bankId",
                    "bankName",
                    "secondaryText",
                    "colourOverride",
                    "colour",
                    "textColourOverride",
                    "textColour",
                    "bpm",
                    "switches",
                    "customMessages",
                    "presetMessages",
                    "midiValueDisplayOverride",
                    "midiValueDisplay",
                    "midiValueDisplayCC"
                ],
                "additionalProperties": false
            },
            "maxItems": 128,
            "description": "Array of per-preset configurations including display text, colors, and tempo settings."
        }
    },
    "required": [
        "deviceSettings",
        "globalSettings",
        "bankSettings"
    ],
    "$defs": {
        "midiOutputs": {
            "type": "object",
            "properties": {
                "usb": {
                    "type": "boolean",
                    "description": "Routes the message to the USB MIDI port."
                },
                "ble": {
                    "type": "boolean",
                    "description": "Routes the message to the BLE MIDI port."
                },
                "midi1": {
                    "type": "boolean",
                    "description": "Routes the message to the TRS MIDI port."
                }
            },
            "required": [
                "usb",
                "ble",
                "midi1"
            ],
            "additionalProperties": false,
            "description": "Specifies which physical ports receive the MIDI message."
        },
        "messageItem": {
            "oneOf": [
                {
                    "type": "object",
                    "description": "Standard MIDI message with output routing",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The MIDI status byte indicating message type and channel."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "The first data byte of the MIDI message."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "The second data byte of the MIDI message."
                        },
                        "outputs": {
                            "$ref": "#/$defs/midiOutputs"
                        }
                    },
                    "required": [
                        "statusByte",
                        "dataByte1",
                        "dataByte2",
                        "outputs"
                    ]
                },
                {
                    "type": "object",
                    "description": "Smart/internal message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "description": "Reserved for smart message type identification."
                        },
                        "smartType": {
                            "type": "string",
                            "enum": [
                                "blockingDelay",
                                "sendCurrentPreset"
                            ],
                            "description": "Selects a device control operation such as inserting delays or sending the current preset."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The first parameter for the smart command."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The second parameter for the smart command."
                        }
                    },
                    "required": [
                        "statusByte",
                        "smartType",
                        "dataByte1",
                        "dataByte2"
                    ]
                }
            ],
            "description": "Defines either a standard MIDI message or a device control command."
        }
    }
}
```

## Templates

Starter templates for this device and firmware version. Load into the editor or transfer manually to your device using the `DTXR` command as described in the [Protocol Overview](../../../../Device-API/index.md).

{{ render_templates() }}
