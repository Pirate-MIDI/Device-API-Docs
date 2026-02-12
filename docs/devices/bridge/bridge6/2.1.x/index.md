# Bridge6 - Firmware 2.1.x

## Device Properties

Device properties define the capabilities of the hardware device for key hardware features and firmware according to this version.
An examples of hardware properties are the number of MIDI interfaces (made up of USB, standard MIDI IO, and Flexiports where applicable).
Most keys relate to firmware structure such as the maximum size of message stacks, the maximum size of names etc...

```json
{
    "model": "bridge6",
    "product": "bridge",
    "firmwareVersion": "2.1.7",
    "globalSettings": {
        "bootMessageLimit": 16,
        "deviceNameLen": 12,
        "expGlobalMessageLimit": 16,
        "globalLadderMessageLimit": 32,
        "numCustomLedColours": 12,
        "numExpPedals": 4,
        "numFlexiports": 2,
        "numMidiClocks": 2,
        "numMidiInterfaces": 4,
        "numSetItems": 32,
        "numSetLists": 8,
        "numStandardMidiInputInterfaces": 1,
        "numUsbInterfaces": 1,
        "setNameLimit": 16,
        "useDisplay": true,
        "useExtendedInterfaceIndexing": false
    },
    "numBanks": 100,
    "bankSettings": {
        "bankLadderMessageLimit": 32,
        "bankMessageLimit": 8,
        "bankNameLimit": 16,
        "doublePressMessageLimit": 8,
        "expBankMessageLimit": 8,
        "holdMessageLimit": 8,
        "holdReleaseMessageLimit": 8,
        "numExpPedals": 4,
        "numFlexiports": 2,
        "numMidiClocks": 2,
        "numMidiTriggerSwitches": 6,
        "numSwitchesPerGroup": 12,
        "numSwitchColours": 2,
        "numSwitchGroups": 8,
        "pressMessageLimit": 8,
        "releaseMessageLimit": 8,
        "secondaryOffMessageLimit": 8,
        "secondaryOnMessageLimit": 8,
        "switchNameLimit": 8,
        "toggleOffMessageLimit": 16,
        "toggleOnMessageLimit": 16,
        "useBankExpMessages": true,
        "useBankMessages": true,
        "useBankNames": true,
        "useExtendedInterfaceIndexing": false,
        "useMidiTriggerSwitches": true,
        "useSecondaryLeds": true,
        "useSecondarySwitches": true,
        "useSequentialLabels": true,
        "useSwitchNames": true
    }
}
```

## Device Schema

The device schema defines the complete structure of `globalSettings` and `bankSettings` for this firmware version, including all available configuration keys, value types, constraints, and enumerated options.

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "piratemidi:bridge:v2.1.7:bridge6",
    "title": "Pirate MIDI Bridge6 Device API (v2.1.7)",
    "type": "object",
    "properties": {
        "deviceSettings": {
            "type": "object",
            "properties": {
                "deviceModel": {
                    "type": "string",
                    "description": "The hardware model identifier of the Pirate MIDI device (e.g., Bridge4, Bridge6, Aero)."
                },
                "firmwareVersion": {
                    "type": "string",
                    "description": "The firmware version number currently installed on the device."
                },
                "hardwareVersion": {
                    "type": "string",
                    "description": "The hardware revision number of the physical device."
                },
                "deviceName": {
                    "type": "string",
                    "description": "The user-assigned name of the device for identification purposes."
                },
                "uId": {
                    "type": "integer",
                    "description": "A unique identifier assigned to this specific device instance."
                },
                "profileId": {
                    "type": "integer",
                    "description": "The identifier of the currently active configuration profile stored on the device."
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
            "description": "Container for physical device identification and version metadata."
        },
        "globalSettings": {
            "type": "object",
            "properties": {
                "currentBank": {
                    "type": "integer",
                    "minimum": 0,
                    "description": "The currently active bank index."
                },
                "midiChannel": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 15,
                    "description": "The MIDI channel on which the device receives messages. 0-15 maps all 16 channels, with some devices or software using 1-16 indexing instead."
                },
                "ledBrightness": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100,
                    "description": "The brightness level of the device's indicator LEDs as a percentage."
                },
                "preserveToggleStates": {
                    "type": "boolean",
                    "description": "Enabling this retains toggle switch states when switching between banks."
                },
                "preserveScrollingStates": {
                    "type": "boolean",
                    "description": "Enabling this retains scrolling switch states when switching between banks."
                },
                "preserveSequentialStates": {
                    "type": "boolean",
                    "description": "Enabling this retains sequential switch states when switching between banks."
                },
                "sendStates": {
                    "type": "boolean",
                    "description": "Enabling this transmits current switch states to the on power up or bank changes."
                },
                "holdTime": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 10000,
                    "multipleOf": 10,
                    "description": "The duration in milliseconds that a footswitch must be pressed to trigger a hold action."
                },
                "bootDelay": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 255,
                    "description": "The delay in milliseconds before the device initializes after power-on."
                },
                "profileId": {
                    "type": "integer",
                    "description": "An identifier linking this device configuration to a specific profile or preset scheme."
                },
                "deviceName": {
                    "type": "string",
                    "maxLength": 12,
                    "description": "The user-defined name displayed for this device in host applications."
                },
                "bankUpTrigger": {
                    "type": "string",
                    "enum": [
                        "fs1",
                        "fs2",
                        "fs3",
                        "fs4",
                        "fs5",
                        "fs6",
                        "fs1Fs2",
                        "fs2Fs3",
                        "fs2Fs5",
                        "fs4Fs5",
                        "fs5Fs6",
                        "none"
                    ],
                    "description": "The footswitch or hold gesture that navigates to the next bank."
                },
                "bankDownTrigger": {
                    "type": "string",
                    "enum": [
                        "fs1",
                        "fs2",
                        "fs3",
                        "fs4",
                        "fs5",
                        "fs6",
                        "fs1Fs2",
                        "fs2Fs3",
                        "fs2Fs5",
                        "fs4Fs5",
                        "fs5Fs6",
                        "none"
                    ],
                    "description": "The footswitch or hold gesture that navigates to the previous bank."
                },
                "uiMode": {
                    "type": "string",
                    "enum": [
                        "extended",
                        "simple"
                    ],
                    "description": "The user interface complexity level for the device's display and interaction paradigm."
                },
                "zeroIndexBanks": {
                    "type": "boolean",
                    "description": "Enabling this displays bank numbers starting from zero instead of one in the user interface."
                },
                "flexiports": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "mode": {
                                "type": "string",
                                "enum": [
                                    "unassigned",
                                    "midiOutA",
                                    "midiOutB",
                                    "midiOutTip",
                                    "midiOutRing",
                                    "deviceLink",
                                    "expDual",
                                    "expSingle",
                                    "switchIn",
                                    "switchOut",
                                    "relayOut",
                                    "tapTempo",
                                    "pulseOut",
                                    "favSwitch"
                                ],
                                "description": "Determines how the flexiport functions, such as MIDI output, expression pedal input, external switch input, or auxiliary output."
                            },
                            "clock": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "type": "null"
                                    }
                                ],
                                "description": "MIDI clock division setting for clock-based modes, controlling the timing resolution of clock messages sent through the port."
                            },
                            "auxSensitivity": {
                                "type": "integer",
                                "minimum": 1,
                                "maximum": 3,
                                "description": "Sensitivity level for auxiliary output signals, affecting the signal strength or responsiveness of the output."
                            },
                            "auxHoldTime": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 10000,
                                "multipleOf": 10,
                                "description": "Duration in milliseconds that an auxiliary output signal remains active after being triggered."
                            }
                        },
                        "required": [
                            "mode",
                            "clock",
                            "auxSensitivity",
                            "auxHoldTime"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 2,
                    "description": "Array of flexiport configurations, each defining the operating mode and settings for a configurable TRS jack."
                },
                "bankPcMidiOutputs": {
                    "type": "object",
                    "properties": {
                        "midi0": {
                            "type": "integer",
                            "description": "MIDI channel on MIDI0 interface for bank program change output."
                        },
                        "flexi1": {
                            "type": "integer",
                            "description": "MIDI channel on Flexi1 interface for bank program change output."
                        },
                        "flexi2": {
                            "type": "integer",
                            "description": "MIDI channel on Flexi2 interface for bank program change output."
                        },
                        "usb": {
                            "type": "integer",
                            "description": "MIDI channel on USB interface for bank program change output."
                        }
                    },
                    "required": [
                        "midi0",
                        "flexi1",
                        "flexi2",
                        "usb"
                    ],
                    "additionalProperties": false,
                    "description": "Specifies the MIDI channel to transmit program change messages when switching banks."
                },
                "customLedColors": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    },
                    "maxItems": 12,
                    "description": "An array of custom LED color definitions applied to the device's indicators. Color format is RGB888"
                },
                "midiClocks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "outputs": {
                                "type": "object",
                                "properties": {
                                    "midi0": {
                                        "type": "boolean",
                                        "description": "Enable MIDI clock output on the MIDI0 interface."
                                    },
                                    "flexi1": {
                                        "type": "boolean",
                                        "description": "Enable MIDI clock output on the Flexi1 interface."
                                    },
                                    "flexi2": {
                                        "type": "boolean",
                                        "description": "Enable MIDI clock output on the Flexi2 interface."
                                    },
                                    "usb": {
                                        "type": "boolean",
                                        "description": "Enable MIDI clock output on the USB interface."
                                    }
                                },
                                "required": [
                                    "midi0",
                                    "flexi1",
                                    "flexi2",
                                    "usb"
                                ],
                                "additionalProperties": false,
                                "description": "Destination interfaces that receive MIDI clock messages."
                            }
                        },
                        "required": [
                            "outputs"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 2,
                    "description": "Configuration for MIDI clock output routing to connected interfaces."
                },
                "midi0ThruHandles": {
                    "type": "object",
                    "properties": {
                        "midi0": {
                            "type": "boolean",
                            "description": "Forward MIDI0 input MIDI data to the MIDI0 output."
                        },
                        "flexi1": {
                            "type": "boolean",
                            "description": "Forward MIDI0 input MIDI data to the Flexi1 output."
                        },
                        "flexi2": {
                            "type": "boolean",
                            "description": "Forward MIDI0 input MIDI data to the Flexi2 output."
                        },
                        "usb": {
                            "type": "boolean",
                            "description": "Forward MIDI0 input MIDI data to the USB interface."
                        }
                    },
                    "required": [
                        "midi0",
                        "flexi1",
                        "flexi2",
                        "usb"
                    ],
                    "additionalProperties": false,
                    "description": "Controls which interfaces receive MIDI data passed through from the MIDI0 input."
                },
                "flexi1ThruHandles": {
                    "type": "object",
                    "properties": {
                        "midi0": {
                            "type": "boolean",
                            "description": "Forward Flexi1 input MIDI data to the MIDI0 output."
                        },
                        "flexi1": {
                            "type": "boolean",
                            "description": "Forward Flexi1 input MIDI data to the Flexi1 output."
                        },
                        "flexi2": {
                            "type": "boolean",
                            "description": "Forward Flexi1 input MIDI data to the Flexi2 output."
                        },
                        "usb": {
                            "type": "boolean",
                            "description": "Forward Flexi1 input MIDI data to the USB interface."
                        }
                    },
                    "required": [
                        "midi0",
                        "flexi1",
                        "flexi2",
                        "usb"
                    ],
                    "additionalProperties": false,
                    "description": "Controls which interfaces receive MIDI data passed through from the Flexi1 input."
                },
                "flexi2ThruHandles": {
                    "type": "object",
                    "properties": {
                        "midi0": {
                            "type": "boolean",
                            "description": "Forward Flexi2 input MIDI data to the MIDI0 output."
                        },
                        "flexi1": {
                            "type": "boolean",
                            "description": "Forward Flexi2 input MIDI data to the Flexi1 output."
                        },
                        "flexi2": {
                            "type": "boolean",
                            "description": "Forward Flexi2 input MIDI data to the Flexi2 output."
                        },
                        "usb": {
                            "type": "boolean",
                            "description": "Forward Flexi2 input MIDI data to the USB interface."
                        }
                    },
                    "required": [
                        "midi0",
                        "flexi1",
                        "flexi2",
                        "usb"
                    ],
                    "additionalProperties": false,
                    "description": "Controls which interfaces receive MIDI data passed through from the Flexi2 input."
                },
                "usbThruHandles": {
                    "type": "object",
                    "properties": {
                        "midi0": {
                            "type": "boolean",
                            "description": "Forward USB input MIDI data to the MIDI0 output."
                        },
                        "flexi1": {
                            "type": "boolean",
                            "description": "Forward USB input MIDI data to the Flexi1 output."
                        },
                        "flexi2": {
                            "type": "boolean",
                            "description": "Forward USB input MIDI data to the Flexi2 output."
                        },
                        "usb": {
                            "type": "boolean",
                            "description": "Forward USB input MIDI data to the USB output."
                        }
                    },
                    "required": [
                        "midi0",
                        "flexi1",
                        "flexi2",
                        "usb"
                    ],
                    "additionalProperties": false,
                    "description": "Controls which interfaces receive MIDI data passed through from the USB input."
                },
                "expMessages": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "numMessages": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 16,
                                "description": "Count of MIDI messages assigned to this expression pedal slot."
                            },
                            "messages": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/$defs/expMessageItem"
                                },
                                "maxItems": 16,
                                "description": "MIDI messages whose parameters are modulated by this expression pedal's position."
                            }
                        },
                        "required": [
                            "numMessages",
                            "messages"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 4,
                    "description": "Array of MIDI message sets for the four expression pedal slots, each swept by pedal position."
                },
                "expLadderMessages": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "numMessages": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 32,
                                "description": "Count of MIDI messages assigned to this expression ladder slot."
                            },
                            "messages": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/$defs/expLadderMessageItem"
                                },
                                "maxItems": 32,
                                "description": "MIDI messages sent when the expression ladder reaches specific pedal positions."
                            }
                        },
                        "required": [
                            "numMessages",
                            "messages"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 2,
                    "description": "Array of MIDI message sets for the two expression ladder modes, triggered at discrete pedal positions."
                },
                "bootMessages": {
                    "type": "object",
                    "properties": {
                        "numMessages": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 16,
                            "description": "Count of boot messages to send."
                        },
                        "messages": {
                            "type": "array",
                            "items": {
                                "$ref": "#/$defs/messageItem"
                            },
                            "maxItems": 16,
                            "description": "Array of MIDI messages transmitted during device startup."
                        }
                    },
                    "required": [
                        "numMessages",
                        "messages"
                    ],
                    "additionalProperties": false,
                    "description": "Configures MIDI messages automatically sent when the device powers on."
                },
                "deviceLink": {
                    "type": "object",
                    "properties": {
                        "role": {
                            "type": "string",
                            "enum": [
                                "main",
                                "satellite"
                            ],
                            "description": "Sets whether this device operates as the main controller or a satellite that mirrors the main device's state."
                        },
                        "bankNav": {
                            "type": "boolean",
                            "description": "Enables synchronization of bank navigation commands across linked devices."
                        },
                        "bankName": {
                            "type": "boolean",
                            "description": "Enables synchronization of bank names across linked devices."
                        },
                        "midiStream": {
                            "type": "boolean",
                            "description": "Enables synchronization of MIDI data streams across linked devices."
                        },
                        "switchGroups": {
                            "type": "boolean",
                            "description": "Enables synchronization of switch group configurations across linked devices."
                        }
                    },
                    "required": [
                        "role",
                        "bankNav",
                        "bankName",
                        "midiStream",
                        "switchGroups"
                    ],
                    "additionalProperties": false,
                    "description": "Configures multi-device synchronization settings for connected Pirate MIDI devices."
                },
                "auxMessages": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "tip": {
                                "type": "object",
                                "properties": {
                                    "pressMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip press."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip press."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the tip contact is pressed."
                                    },
                                    "holdMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip hold."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip hold."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the tip contact is held."
                                    },
                                    "toggleOnMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip toggle on."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip toggle on."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the tip contact toggles on."
                                    },
                                    "toggleOffMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip toggle off."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip toggle off."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the tip contact toggles off."
                                    }
                                },
                                "required": [
                                    "pressMessages",
                                    "holdMessages",
                                    "toggleOnMessages",
                                    "toggleOffMessages"
                                ],
                                "additionalProperties": false,
                                "description": "MIDI message settings for the tip contact of an auxiliary input."
                            },
                            "ring": {
                                "type": "object",
                                "properties": {
                                    "pressMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on ring press."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on ring press."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the ring contact is pressed."
                                    },
                                    "holdMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on ring hold."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on ring hold."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the ring contact is held."
                                    },
                                    "toggleOnMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on ring toggle on."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on ring toggle on."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the ring contact toggles on."
                                    },
                                    "toggleOffMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on ring toggle off."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on ring toggle off."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when the ring contact toggles off."
                                    }
                                },
                                "required": [
                                    "pressMessages",
                                    "holdMessages",
                                    "toggleOnMessages",
                                    "toggleOffMessages"
                                ],
                                "additionalProperties": false,
                                "description": "MIDI message settings for the ring contact of an auxiliary input."
                            },
                            "tipRing": {
                                "type": "object",
                                "properties": {
                                    "pressMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip+ring press."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip+ring press."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when both tip and ring contacts are pressed together."
                                    },
                                    "holdMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip+ring hold."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip+ring hold."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when both tip and ring contacts are held together."
                                    },
                                    "toggleOnMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip+ring toggle on."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip+ring toggle on."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when both tip and ring contacts toggle on together."
                                    },
                                    "toggleOffMessages": {
                                        "type": "object",
                                        "properties": {
                                            "numMessages": {
                                                "type": "integer",
                                                "minimum": 0,
                                                "maximum": 1,
                                                "description": "Count of MIDI messages to send on tip+ring toggle off."
                                            },
                                            "messages": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/$defs/messageItem"
                                                },
                                                "maxItems": 1,
                                                "description": "Array containing the MIDI message(s) sent on tip+ring toggle off."
                                            }
                                        },
                                        "required": [
                                            "numMessages",
                                            "messages"
                                        ],
                                        "additionalProperties": false,
                                        "description": "MIDI messages triggered when both tip and ring contacts toggle off together."
                                    }
                                },
                                "required": [
                                    "pressMessages",
                                    "holdMessages",
                                    "toggleOnMessages",
                                    "toggleOffMessages"
                                ],
                                "additionalProperties": false,
                                "description": "MIDI message settings for simultaneous tip and ring contact on an auxiliary input."
                            }
                        },
                        "required": [
                            "tip",
                            "ring",
                            "tipRing"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 2,
                    "description": "Configuration for MIDI messages sent by each auxiliary input (flexiport in switch mode), supporting up to two aux inputs."
                },
                "setLists": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "size": {
                                "type": "integer",
                                "minimum": 0,
                                "description": "Number of banks currently assigned to this set list."
                            },
                            "name": {
                                "type": "string",
                                "maxLength": 16,
                                "description": "User-defined name for the set list, displayed during performance."
                            },
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "integer",
                                    "minimum": 0
                                },
                                "maxItems": 32,
                                "description": "Ordered sequence of up to 32 banks included in this set list."
                            },
                            "wrapNav": {
                                "type": "boolean",
                                "description": "Enables navigation to wrap around from the last bank to the first bank when using next/previous controls."
                            }
                        },
                        "required": [
                            "size",
                            "name",
                            "items",
                            "wrapNav"
                        ],
                        "additionalProperties": false
                    },
                    "maxItems": 8,
                    "description": "Collection of up to 8 set lists that organize banks into custom sequences for live performance."
                }
            },
            "required": [
                "currentBank",
                "midiChannel",
                "ledBrightness",
                "preserveToggleStates",
                "preserveScrollingStates",
                "preserveSequentialStates",
                "sendStates",
                "holdTime",
                "bootDelay",
                "profileId",
                "deviceName",
                "bankUpTrigger",
                "bankDownTrigger",
                "uiMode",
                "zeroIndexBanks",
                "flexiports",
                "bankPcMidiOutputs",
                "customLedColors",
                "midiClocks",
                "midi0ThruHandles",
                "flexi1ThruHandles",
                "flexi2ThruHandles",
                "usbThruHandles",
                "expMessages",
                "expLadderMessages",
                "bootMessages",
                "deviceLink",
                "auxMessages",
                "setLists"
            ],
            "additionalProperties": false,
            "description": "Device-wide settings that persist across all banks, controlling MIDI behavior, LED presentation, banking navigation, and state preservation."
        },
        "bankSettings": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "bankName": {
                        "type": "string",
                        "maxLength": 16,
                        "description": "User-defined name for the bank displayed on the device."
                    },
                    "bankId": {
                        "type": "integer",
                        "description": "Unique identifier for the bank used internally by the device."
                    },
                    "midiClocks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "tempo": {
                                    "type": "number",
                                    "minimum": 0,
                                    "description": "Tempo in beats per minute for MIDI clock output."
                                }
                            },
                            "required": [
                                "tempo"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 2,
                        "description": "MIDI clock configuration for synchronizing the device tempo with external equipment."
                    },
                    "bankMessages": {
                        "type": "object",
                        "properties": {
                            "numMessages": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 8,
                                "description": "Count of MIDI messages configured to send on bank activation."
                            },
                            "messages": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/$defs/messageItem"
                                },
                                "maxItems": 8,
                                "description": "Array of MIDI messages transmitted when entering this bank."
                            }
                        },
                        "required": [
                            "numMessages",
                            "messages"
                        ],
                        "additionalProperties": false,
                        "description": "MIDI messages sent when the bank is activated."
                    },
                    "expMessages": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "numMessages": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "maximum": 8,
                                    "description": "Number of MIDI messages to send when the expression pedal is moved."
                                },
                                "messages": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/$defs/expMessageItem"
                                    },
                                    "maxItems": 8,
                                    "description": "MIDI messages transmitted in response to expression pedal movement."
                                }
                            },
                            "required": [
                                "numMessages",
                                "messages"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 4,
                        "description": "Expression pedal messages sent when the pedal is moved, overriding global settings for this bank."
                    },
                    "expLadderMessages": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "numMessages": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "maximum": 32,
                                    "description": "Number of MIDI messages to send when the expression pedal reaches a ladder position."
                                },
                                "messages": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/$defs/expLadderMessageItem"
                                    },
                                    "maxItems": 32,
                                    "description": "MIDI messages transmitted when the expression pedal reaches a configured ladder position."
                                }
                            },
                            "required": [
                                "numMessages",
                                "messages"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 2,
                        "description": "Expression pedal ladder messages that trigger at specific pedal positions, overriding global settings for this bank."
                    },
                    "switchGroups": {
                        "type": "array",
                        "items": {
                            "type": "array",
                            "items": {
                                "$ref": "#/$defs/switchGroupMember"
                            },
                            "maxItems": 12
                        },
                        "maxItems": 8,
                        "description": "Up to 8 groups of physical switches, each defining a set of footswitches and their MIDI actions."
                    },
                    "auxMessages": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "tip": {
                                    "type": "object",
                                    "properties": {
                                        "pressMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on tip press."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the tip contact is pressed."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the tip contact is pressed."
                                        },
                                        "holdMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on tip hold."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the tip contact is held."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the tip contact is held."
                                        },
                                        "toggleOnMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on tip toggle on."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the tip contact engages a toggle state."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the tip contact engages a toggle state."
                                        },
                                        "toggleOffMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on tip toggle off."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the tip contact disengages a toggle state."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the tip contact disengages a toggle state."
                                        }
                                    },
                                    "required": [
                                        "pressMessages",
                                        "holdMessages",
                                        "toggleOnMessages",
                                        "toggleOffMessages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "MIDI message configuration for the tip contact of an auxiliary input."
                                },
                                "ring": {
                                    "type": "object",
                                    "properties": {
                                        "pressMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on ring press."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the ring contact is pressed."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the ring contact is pressed."
                                        },
                                        "holdMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on ring hold."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the ring contact is held."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the ring contact is held."
                                        },
                                        "toggleOnMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on ring toggle on."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the ring contact engages a toggle state."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the ring contact engages a toggle state."
                                        },
                                        "toggleOffMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on ring toggle off."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when the ring contact disengages a toggle state."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when the ring contact disengages a toggle state."
                                        }
                                    },
                                    "required": [
                                        "pressMessages",
                                        "holdMessages",
                                        "toggleOnMessages",
                                        "toggleOffMessages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "MIDI message configuration for the ring contact of an auxiliary input."
                                },
                                "tipRing": {
                                    "type": "object",
                                    "properties": {
                                        "pressMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on simultaneous tip and ring press."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when tip and ring contacts are pressed together."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when tip and ring contacts are pressed together."
                                        },
                                        "holdMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on simultaneous tip and ring hold."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when tip and ring contacts are held together."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when tip and ring contacts are held together."
                                        },
                                        "toggleOnMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on simultaneous tip and ring toggle on."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when tip and ring contacts engage a toggle state together."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when tip and ring contacts engage a toggle state together."
                                        },
                                        "toggleOffMessages": {
                                            "type": "object",
                                            "properties": {
                                                "numMessages": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 1,
                                                    "description": "Count of MIDI messages to send on simultaneous tip and ring toggle off."
                                                },
                                                "messages": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/$defs/messageItem"
                                                    },
                                                    "maxItems": 1,
                                                    "description": "MIDI message(s) sent when tip and ring contacts disengage a toggle state together."
                                                }
                                            },
                                            "required": [
                                                "numMessages",
                                                "messages"
                                            ],
                                            "additionalProperties": false,
                                            "description": "MIDI messages triggered when tip and ring contacts disengage a toggle state together."
                                        }
                                    },
                                    "required": [
                                        "pressMessages",
                                        "holdMessages",
                                        "toggleOnMessages",
                                        "toggleOffMessages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "MIDI message configuration for simultaneous tip and ring contact engagement on an auxiliary input."
                                }
                            },
                            "required": [
                                "tip",
                                "ring",
                                "tipRing"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 2,
                        "description": "MIDI messages sent by the two auxiliary inputs (aux 1 and aux 2) when their contacts change state within this bank."
                    },
                    "footswitches": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "maxLength": 8,
                                    "description": "Display name for the footswitch."
                                },
                                "primaryState": {
                                    "type": "boolean",
                                    "description": "Current on/off state of the footswitch in primary mode."
                                },
                                "primaryMode": {
                                    "type": "string",
                                    "enum": [
                                        "toggle",
                                        "momentary",
                                        "tapTempo",
                                        "sequential",
                                        "sequentialLinked",
                                        "scrolling",
                                        "scrollingLinked",
                                        "doublePressToggle",
                                        "holdToggle",
                                        "doublePressMomentary",
                                        "holdMomentary"
                                    ],
                                    "description": "Operating mode that determines how the footswitch responds to presses (toggle, momentary, sequential, etc.)."
                                },
                                "primaryLedMode": {
                                    "type": "string",
                                    "enum": [
                                        "onOff",
                                        "dim"
                                    ],
                                    "description": "LED behavior in primary mode: solid on/off or dimmed."
                                },
                                "primaryColor": {
                                    "type": "integer",
                                    "description": "LED color index for primary mode."
                                },
                                "midiClock": {
                                    "oneOf": [
                                        {
                                            "type": "integer",
                                            "minimum": 0
                                        },
                                        {
                                            "type": "null"
                                        }
                                    ],
                                    "description": "MIDI clock divisions per beat for tap tempo mode, or null if not applicable."
                                },
                                "secondaryState": {
                                    "type": "boolean",
                                    "description": "Current on/off state of the footswitch in secondary mode."
                                },
                                "secondaryMode": {
                                    "type": "string",
                                    "enum": [
                                        "toggle",
                                        "momentary",
                                        "tapTempo",
                                        "sequential",
                                        "sequentialLinked",
                                        "scrolling",
                                        "scrollingLinked",
                                        "doublePressToggle",
                                        "holdToggle",
                                        "doublePressMomentary",
                                        "holdMomentary"
                                    ],
                                    "description": "Operating mode for secondary function (long press or alternate behavior)."
                                },
                                "secondaryLedMode": {
                                    "type": "string",
                                    "enum": [
                                        "onOff",
                                        "dim"
                                    ],
                                    "description": "LED behavior in secondary mode: solid on/off or dimmed."
                                },
                                "secondaryColor": {
                                    "type": "integer",
                                    "description": "LED color index for secondary mode."
                                },
                                "sequentialPattern": {
                                    "type": "string",
                                    "enum": [
                                        "forward",
                                        "reverse",
                                        "pendulum",
                                        "random"
                                    ],
                                    "description": "Determines the order in which the footswitch cycles through sequential steps."
                                },
                                "sequentialRepeat": {
                                    "type": "string",
                                    "enum": [
                                        "all",
                                        "last2",
                                        "last3"
                                    ],
                                    "description": "Specifies which steps repeat when the sequence reaches its end."
                                },
                                "sequentialSendMode": {
                                    "type": "string",
                                    "enum": [
                                        "always",
                                        "secondary",
                                        "primary"
                                    ],
                                    "description": "Controls when MIDI messages are sent during sequential stepping."
                                },
                                "linkedSwitch": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "description": "Index of another footswitch to link with in sequential or scrolling linked modes."
                                },
                                "currentStep": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "description": "Current position in sequential or scrolling mode."
                                },
                                "lfo": {
                                    "type": "object",
                                    "properties": {
                                        "state": {
                                            "oneOf": [
                                                {
                                                    "type": "boolean"
                                                },
                                                {
                                                    "type": "null"
                                                }
                                            ],
                                            "description": "Enables or disables the LFO modulation."
                                        },
                                        "frequency": {
                                            "oneOf": [
                                                {
                                                    "type": "number",
                                                    "minimum": 0.1,
                                                    "maximum": 25.5
                                                },
                                                {
                                                    "type": "string",
                                                    "enum": [
                                                        "1/4",
                                                        "1/4T",
                                                        "1/4.",
                                                        "1/8",
                                                        "1/8T",
                                                        "1/8.",
                                                        "1/16",
                                                        "1/16T",
                                                        "1/16."
                                                    ]
                                                }
                                            ],
                                            "description": "Sets the LFO frequency as either a free-running Hz value or a MIDI clock division ratio."
                                        },
                                        "minLimit": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 127,
                                            "description": "Specifies the minimum value in the modulation range."
                                        },
                                        "maxLimit": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 127,
                                            "description": "Specifies the maximum value in the modulation range."
                                        },
                                        "trigger": {
                                            "type": "string",
                                            "enum": [
                                                "primary",
                                                "secondary"
                                            ],
                                            "description": "Determines whether the LFO responds to the primary or secondary footswitch trigger."
                                        },
                                        "messages": {
                                            "type": "string",
                                            "enum": [
                                                "toggleOn",
                                                "toggleOff",
                                                "press",
                                                "release",
                                                "doublePress",
                                                "hold",
                                                "holdRelease",
                                                "secondaryToggleOn",
                                                "secondaryToggleOff"
                                            ],
                                            "description": "Selects which footswitch action (press, release, hold, etc.) starts the LFO modulation."
                                        },
                                        "waveform": {
                                            "type": "string",
                                            "enum": [
                                                "sine",
                                                "triangle",
                                                "saw",
                                                "ramp",
                                                "square",
                                                "random"
                                            ],
                                            "description": "Selects the oscillation shape (sine, triangle, sawtooth, etc.) that modulates the target message stack."
                                        },
                                        "resolution": {
                                            "type": "integer",
                                            "minimum": 1,
                                            "maximum": 127,
                                            "description": "Sets the number of discrete steps the LFO uses to modulate values across the min/max range."
                                        },
                                        "resetOnStop": {
                                            "type": "boolean",
                                            "description": "Resets the LFO waveform position to the start when modulation stops."
                                        },
                                        "clock": {
                                            "oneOf": [
                                                {
                                                    "type": "integer",
                                                    "minimum": 0
                                                },
                                                {
                                                    "type": "null"
                                                }
                                            ],
                                            "description": "Specifies the MIDI clock source or offset when using clock division frequencies."
                                        }
                                    },
                                    "required": [
                                        "state",
                                        "frequency",
                                        "minLimit",
                                        "maxLimit",
                                        "trigger",
                                        "waveform",
                                        "resolution",
                                        "resetOnStop",
                                        "clock"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Low Frequency Oscillator settings that modulate a message stack with configurable waveform, frequency, and value range."
                                },
                                "toggleOnMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 16,
                                            "description": "Number of MIDI messages to send when the footswitch toggles on."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 16,
                                            "description": "MIDI messages sent when the footswitch toggles on."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch toggles on."
                                },
                                "toggleOffMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 16,
                                            "description": "Number of MIDI messages to send when the footswitch toggles off."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 16,
                                            "description": "MIDI messages sent when the footswitch toggles off."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch toggles off."
                                },
                                "pressMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch is pressed."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch is pressed."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch is pressed."
                                },
                                "releaseMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch is released."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch is released."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch is released."
                                },
                                "doublePressMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch is double-pressed."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch is double-pressed."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch is double-pressed."
                                },
                                "holdMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch is held."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch is held."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch is held."
                                },
                                "holdReleaseMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch hold is released."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch hold is released."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch hold is released."
                                },
                                "secondaryToggleOnMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch secondary toggle turns on."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch secondary toggle turns on."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch secondary toggle turns on."
                                },
                                "secondaryToggleOffMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 8,
                                            "description": "Number of MIDI messages to send when the footswitch secondary toggle turns off."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 8,
                                            "description": "MIDI messages sent when the footswitch secondary toggle turns off."
                                        }
                                    },
                                    "required": [
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Container for MIDI messages sent when the footswitch secondary toggle turns off."
                                },
                                "sequentialMessages": {
                                    "type": "object",
                                    "properties": {
                                        "numSteps": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "description": "The total number of steps defined in this sequential pattern."
                                        },
                                        "steps": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "numMessages": {
                                                        "type": "integer",
                                                        "minimum": 0,
                                                        "description": "The number of MIDI messages assigned to this step."
                                                    },
                                                    "messages": {
                                                        "type": "array",
                                                        "items": {
                                                            "$ref": "#/$defs/messageItem"
                                                        },
                                                        "description": "MIDI messages that send when this step activates."
                                                    },
                                                    "color": {
                                                        "type": "integer",
                                                        "description": "The LED color displayed when this step is active."
                                                    },
                                                    "label": {
                                                        "type": "string",
                                                        "description": "A text label identifying this step on the device display."
                                                    }
                                                },
                                                "required": [
                                                    "numMessages",
                                                    "messages",
                                                    "color",
                                                    "label"
                                                ],
                                                "additionalProperties": false
                                            },
                                            "maxItems": 16,
                                            "description": "Array of individual steps, each with its own messages and LED display properties."
                                        }
                                    },
                                    "required": [
                                        "numSteps",
                                        "steps"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Contains the steps and messages that execute as the footswitch cycles through the sequence."
                                },
                                "scrollingMessages": {
                                    "type": "object",
                                    "properties": {
                                        "stepInterval": {
                                            "type": "integer",
                                            "minimum": 1,
                                            "maximum": 127,
                                            "description": "The increment amount to advance through the message sequence on each footswitch activation."
                                        },
                                        "minScrollLimit": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 127,
                                            "description": "The starting message index for the scrolling range."
                                        },
                                        "maxScrollLimit": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "maximum": 127,
                                            "description": "The ending message index for the scrolling range."
                                        },
                                        "numMessages": {
                                            "type": "integer",
                                            "minimum": 0,
                                            "description": "The count of MIDI messages in the scrolling sequence."
                                        },
                                        "messages": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/$defs/messageItem"
                                            },
                                            "maxItems": 16,
                                            "description": "Array of MIDI messages transmitted sequentially as the footswitch cycles through the scroll range."
                                        }
                                    },
                                    "required": [
                                        "stepInterval",
                                        "minScrollLimit",
                                        "maxScrollLimit",
                                        "numMessages",
                                        "messages"
                                    ],
                                    "additionalProperties": false,
                                    "description": "Configures continuous scrolling through a sequence of MIDI messages, cycling through the range on each footswitch press."
                                }
                            },
                            "required": [
                                "name",
                                "primaryState",
                                "primaryMode",
                                "primaryLedMode",
                                "primaryColor",
                                "midiClock",
                                "secondaryState",
                                "secondaryMode",
                                "secondaryLedMode",
                                "secondaryColor",
                                "sequentialPattern",
                                "sequentialRepeat",
                                "sequentialSendMode",
                                "linkedSwitch",
                                "currentStep",
                                "lfo",
                                "toggleOnMessages",
                                "toggleOffMessages",
                                "pressMessages",
                                "releaseMessages",
                                "doublePressMessages",
                                "holdMessages",
                                "holdReleaseMessages",
                                "secondaryToggleOnMessages",
                                "secondaryToggleOffMessages",
                                "sequentialMessages",
                                "scrollingMessages"
                            ],
                            "additionalProperties": false
                        },
                        "maxItems": 6,
                        "description": "Array of footswitch configurations for this bank, one per physical switch."
                    }
                },
                "required": [
                    "bankName",
                    "bankId",
                    "midiClocks",
                    "bankMessages",
                    "expMessages",
                    "expLadderMessages",
                    "switchGroups",
                    "auxMessages",
                    "footswitches"
                ],
                "additionalProperties": false
            },
            "maxItems": 100,
            "description": "Collection of up to 128 banks, each containing a unique set of MIDI controls, messages, and switch configurations."
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
                "midi0": {
                    "type": "boolean",
                    "description": "Send the message to MIDI port 0."
                },
                "flexi1": {
                    "type": "boolean",
                    "description": "Send the message to the Flexi 1 port."
                },
                "flexi2": {
                    "type": "boolean",
                    "description": "Send the message to the Flexi 2 port."
                },
                "usb": {
                    "type": "boolean",
                    "description": "Send the message to the USB host port."
                }
            },
            "required": [
                "midi0",
                "flexi1",
                "flexi2",
                "usb"
            ],
            "additionalProperties": false,
            "description": "Routes a MIDI message to one or more physical output ports on the device."
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
                            "description": "The standard MIDI status byte indicating message type and channel (e.g., Note On, Control Change)."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "The first data byte of a standard MIDI message (typically note number or control number)."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "The second data byte of a standard MIDI message (typically velocity or control value)."
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
                            "description": "The status byte for smart/internal messages sent to the device."
                        },
                        "smartType": {
                            "type": "string",
                            "enum": [
                                "switchOn",
                                "switchOff",
                                "switchToggle",
                                "sequentialResetStep",
                                "sequentialIncrementStep",
                                "sequentialDecrementStep",
                                "sequentialGoToStep",
                                "sequentialQueueNextStep",
                                "sequentialQueueStep",
                                "scrollingResetStep",
                                "scrollingIncrementStep",
                                "scrollingDecrementStep",
                                "scrollingGoToStep",
                                "scrollingQueueNextStep",
                                "scrollingQueueStep",
                                "bankUp",
                                "bankDown",
                                "goToBank",
                                "jumpToLastBank",
                                "incrementExpStep",
                                "decrementExpStep",
                                "goToExpStep",
                                "trsSwitchOut",
                                "trsPulseOut",
                                "uiMode"
                            ],
                            "description": "Specifies the type of device control action to perform, such as toggling a switch or stepping through a sequence."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The first data byte for smart/internal message parameters."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The second data byte for smart/internal message parameters."
                        }
                    },
                    "required": [
                        "statusByte",
                        "smartType",
                        "dataByte1",
                        "dataByte2"
                    ]
                },
                {
                    "type": "object",
                    "description": "USB keyboard keystroke message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "description": "The status byte for USB keyboard messages."
                        },
                        "key1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The first USB keyboard key code to emit."
                        },
                        "key2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The second USB keyboard key code to emit."
                        },
                        "key3": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "The third USB keyboard key code to emit."
                        }
                    },
                    "required": [
                        "statusByte",
                        "key1",
                        "key2",
                        "key3"
                    ]
                }
            ],
            "description": "A MIDI message in one of three formats: standard MIDI with routing, smart/internal device control, or USB keyboard keystroke."
        },
        "expMessageItem": {
            "oneOf": [
                {
                    "type": "object",
                    "description": "Expression MIDI message with sweep curve",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "MIDI status byte that defines the message type and channel."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "First MIDI data byte, typically the controller number or note value."
                        },
                        "outputs": {
                            "$ref": "#/$defs/midiOutputs"
                        },
                        "minLimit": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Minimum expression pedal position that triggers the start of the message sweep."
                        },
                        "maxLimit": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Maximum expression pedal position that triggers the end of the message sweep."
                        },
                        "sweep": {
                            "type": "string",
                            "enum": [
                                "linear",
                                "log",
                                "reverseLog",
                                "invLinear",
                                "invLog",
                                "invReverseLog"
                            ],
                            "description": "Curve shape applied to the expression pedal sweep, mapping physical position to MIDI value nonlinearly."
                        }
                    },
                    "required": [
                        "statusByte",
                        "dataByte1",
                        "outputs",
                        "minLimit",
                        "maxLimit",
                        "sweep"
                    ]
                },
                {
                    "type": "object",
                    "description": "Expression smart message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "description": "MIDI status byte for smart control messages."
                        },
                        "smartType": {
                            "type": "string",
                            "enum": [
                                "switchOn",
                                "switchOff",
                                "switchToggle",
                                "sequentialResetStep",
                                "sequentialIncrementStep",
                                "sequentialDecrementStep",
                                "sequentialGoToStep",
                                "sequentialQueueNextStep",
                                "sequentialQueueStep",
                                "scrollingResetStep",
                                "scrollingIncrementStep",
                                "scrollingDecrementStep",
                                "scrollingGoToStep",
                                "scrollingQueueNextStep",
                                "scrollingQueueStep",
                                "bankUp",
                                "bankDown",
                                "goToBank",
                                "jumpToLastBank",
                                "incrementExpStep",
                                "decrementExpStep",
                                "goToExpStep",
                                "trsSwitchOut",
                                "trsPulseOut",
                                "uiMode"
                            ],
                            "description": "Smart control action type that determines the device behavior triggered by expression pedal movement."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "Additional data parameter for the smart control action."
                        },
                        "minLimit": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Minimum expression pedal position that activates the smart control action."
                        },
                        "maxLimit": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Maximum expression pedal position that completes the smart control action."
                        },
                        "sweep": {
                            "type": "string",
                            "enum": [
                                "linear",
                                "log",
                                "reverseLog",
                                "invLinear",
                                "invLog",
                                "invReverseLog"
                            ],
                            "description": "Curve shape applied to the smart control sweep mapping."
                        }
                    },
                    "required": [
                        "statusByte",
                        "smartType",
                        "dataByte1",
                        "minLimit",
                        "maxLimit",
                        "sweep"
                    ]
                }
            ],
            "description": "Expression pedal message definition with continuous sweep curve control for expression pedal sweep behavior."
        },
        "expLadderMessageItem": {
            "oneOf": [
                {
                    "type": "object",
                    "description": "Expression ladder MIDI message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "MIDI status byte for standard ladder trigger message."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "First MIDI data byte sent when the ladder trigger threshold is reached."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Second MIDI data byte sent when the ladder trigger threshold is reached."
                        },
                        "outputs": {
                            "$ref": "#/$defs/midiOutputs"
                        },
                        "triggerValue": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Expression pedal position threshold that activates this ladder message."
                        }
                    },
                    "required": [
                        "statusByte",
                        "dataByte1",
                        "dataByte2",
                        "outputs",
                        "triggerValue"
                    ]
                },
                {
                    "type": "object",
                    "description": "Expression ladder smart message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "description": "MIDI status byte for smart control ladder trigger message."
                        },
                        "smartType": {
                            "type": "string",
                            "enum": [
                                "switchOn",
                                "switchOff",
                                "switchToggle",
                                "sequentialResetStep",
                                "sequentialIncrementStep",
                                "sequentialDecrementStep",
                                "sequentialGoToStep",
                                "sequentialQueueNextStep",
                                "sequentialQueueStep",
                                "scrollingResetStep",
                                "scrollingIncrementStep",
                                "scrollingDecrementStep",
                                "scrollingGoToStep",
                                "scrollingQueueNextStep",
                                "scrollingQueueStep",
                                "bankUp",
                                "bankDown",
                                "goToBank",
                                "jumpToLastBank",
                                "incrementExpStep",
                                "decrementExpStep",
                                "goToExpStep",
                                "trsSwitchOut",
                                "trsPulseOut",
                                "uiMode"
                            ],
                            "description": "Smart control action type triggered when the expression ladder threshold is crossed."
                        },
                        "dataByte1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "First additional data parameter for the smart control ladder action."
                        },
                        "dataByte2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "Second additional data parameter for the smart control ladder action."
                        },
                        "triggerValue": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Expression pedal position threshold that activates this smart control ladder action."
                        }
                    },
                    "required": [
                        "statusByte",
                        "smartType",
                        "dataByte1",
                        "dataByte2",
                        "triggerValue"
                    ]
                },
                {
                    "type": "object",
                    "description": "Expression ladder keyboard message",
                    "properties": {
                        "statusByte": {
                            "type": "integer",
                            "description": "MIDI status byte for sysex ladder trigger message."
                        },
                        "key1": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "First byte of sysex data payload sent when the ladder trigger threshold is reached."
                        },
                        "key2": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "Second byte of sysex data payload sent when the ladder trigger threshold is reached."
                        },
                        "key3": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 255,
                            "description": "Third byte of sysex data payload sent when the ladder trigger threshold is reached."
                        },
                        "triggerValue": {
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 127,
                            "description": "Expression pedal position threshold that activates this sysex ladder message."
                        }
                    },
                    "required": [
                        "statusByte",
                        "key1",
                        "key2",
                        "key3",
                        "triggerValue"
                    ]
                }
            ],
            "description": "Expression ladder message definition that triggers at discrete expression pedal threshold positions."
        },
        "switchGroupMember": {
            "type": "object",
            "properties": {
                "switch": {
                    "type": "integer",
                    "minimum": 0,
                    "description": "The index of the footswitch assigned to this group member."
                },
                "isPrimary": {
                    "type": "boolean",
                    "description": "Designates this switch as the primary member of the group, which may control broadcast direction or group behavior."
                },
                "broadcastMode": {
                    "type": "string",
                    "enum": [
                        "txRx",
                        "tx",
                        "rx",
                        "none"
                    ],
                    "description": "Configures how this switch communicates within the group: transmitting state changes, receiving them, both, or neither."
                },
                "respondTo": {
                    "type": "string",
                    "enum": [
                        "onOff",
                        "on",
                        "off"
                    ],
                    "description": "Specifies which state changes trigger this switch to respond: all on/off changes, only on, or only off."
                },
                "responseType": {
                    "type": "string",
                    "enum": [
                        "or",
                        "and",
                        "toggle",
                        "on",
                        "off"
                    ],
                    "description": "Determines how this switch responds to group triggers: logical OR/AND combination with other members, toggle, force on, or force off."
                }
            },
            "required": [
                "switch",
                "isPrimary",
                "broadcastMode",
                "respondTo",
                "responseType"
            ],
            "additionalProperties": false,
            "description": "Defines a footswitch member within a switch group, specifying its communication mode, response triggers, and behavior when other group members are activated."
        }
    }
}
```

## Templates

Starter templates for this device and firmware version. Load into the editor or transfer manually to your device using the `DTXR` command as described in the [Protocol Overview](../../../../Device-API/index.md).

{{ render_templates() }}
