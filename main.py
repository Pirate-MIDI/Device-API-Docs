import os


def define_env(env):
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
