import os
import re


def define_env(env):
    @env.macro
    def latest_firmware(device_path):
        """Return a relative link to the latest firmware version for a device.

        Args:
            device_path: Path relative to docs/devices/, e.g. "bridge/aero"

        Returns:
            Relative path to the latest firmware version directory,
            or the device directory itself if no versions exist.
        """
        docs_dir = env.conf["docs_dir"]
        device_dir = os.path.join(docs_dir, "devices", device_path)

        if not os.path.isdir(device_dir):
            return f"{device_path}/"

        version_pattern = re.compile(r"^(\d+)\.(\d+)\.x$")
        versions = []
        for entry in os.listdir(device_dir):
            match = version_pattern.match(entry)
            if match and os.path.isdir(os.path.join(device_dir, entry)):
                versions.append((int(match.group(1)), int(match.group(2)), entry))

        if not versions:
            return f"{device_path}/"

        versions.sort(reverse=True)
        latest = versions[0][2]
        return f"{device_path}/{latest}/"

    @env.macro
    def render_templates():
        """Discover all .json files in the current page's directory and render
        them as collapsible template sections with download buttons."""
        page = env.page
        docs_dir = env.conf["docs_dir"]
        page_dir = os.path.dirname(os.path.join(docs_dir, page.file.src_path))

        json_files = sorted(f for f in os.listdir(page_dir) if f.endswith(".json"))

        if not json_files:
            return "*No templates available for this firmware version.*"

        sections = []
        for json_file in json_files:
            name = os.path.splitext(json_file)[0].replace("-", " ").replace("_", " ").title()
            filepath = os.path.join(page_dir, json_file)

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            lines = [
                f"### {name}\n",
                f'<a href="{json_file}" download class="md-button md-button--primary">Download Template</a>\n',
                '??? info "Configuration"',
                "    ```json",
            ]
            for line in content.rstrip().splitlines():
                lines.append(f"    {line}")
            lines.append("    ```")

            sections.append("\n".join(lines))

        return "\n\n".join(sections)
