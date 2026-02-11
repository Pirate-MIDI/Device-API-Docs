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

{{ render_templates() }}
