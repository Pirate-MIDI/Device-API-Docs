# Pirate MIDI Device API Documentation

Official documentation for the Device API protocol for interacting with Pirate MIDI hardware.

**Live Documentation:** [developer.piratemidi.com](https://developer.piratemidi.com)

## Quick Start

### Prerequisites
- Python 3.11 or higher
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pirate-MIDI/Device-API-Docs.git
   cd Device-API-Docs
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start development server**
   ```bash
   mkdocs serve
   ```

5. **Open in browser**
   - Navigate to http://127.0.0.1:8000

## Development

### Local Preview
```bash
mkdocs serve
```
Changes to markdown files will automatically reload in your browser.

### Building
```bash
mkdocs build
```
Outputs the static site to the `site/` directory.

### Project Structure
```
Device-API-Docs/
├── docs/                 # Documentation content
│   ├── index.md         # Homepage
│   ├── assets/          # CSS, images, logos
│   └── CNAME            # Custom domain config
├── mkdocs.yml           # MkDocs configuration
├── requirements.txt     # Python dependencies
└── .github/workflows/   # CI/CD automation
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The workflow:
1. Builds the site with `mkdocs build --strict`
2. Deploys to GitHub Pages
3. Publishes to https://developer.piratemidi.com

## Contributing

1. Create a feature branch
2. Make your changes to markdown files in `docs/`
3. Preview locally with `mkdocs serve`
4. Commit and push your changes
5. Create a pull request

## Links

- **Live Site:** https://developer.piratemidi.com
- **GitHub Repository:** https://github.com/Pirate-MIDI/Device-API-Docs
- **Pirate MIDI:** https://piratemidi.com
- **Support:** https://piratemidi.com/support

## License

Documentation is provided for developer reference and integration purposes.
