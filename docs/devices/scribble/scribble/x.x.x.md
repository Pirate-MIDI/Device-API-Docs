# Scribble - Firmware x.x.x

<!-- This is a template file. The firmware station dispatch workflow will generate -->
<!-- a copy of this structure for each firmware version (e.g., 1.0.0.md). -->

## Device Properties

The device properties object is returned by the `CHCK` command and contains identifying information about the device and its current firmware.

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

## Basic Templates

Starter templates for common configurations on this device and firmware version. Download and transfer to your device using the `DTXR` command as described in the [Protocol Overview](../../../device-api/index.md).

- [Global Settings Template](templates/x.x.x/globalSettings.json) - Default global settings
- [Bank Settings Template](templates/x.x.x/bankSettings.json) - Default bank/preset configuration
