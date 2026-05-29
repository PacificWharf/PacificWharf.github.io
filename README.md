# Pacific Wharf Website

Static website repository for Pacific Wharf.

Pacific Wharf is a technical creative workshop focused on local AI systems, workflow engineering, LoRA training, infrastructure experimentation, and generation pipeline development. This repository contains the public website and tech blog that support that work.

## Stack

- Plain HTML
- Plain CSS
- Plain JavaScript
- GitHub Pages deployment

No build step, framework, backend, or CMS.

## Structure

```text
/
|-- index.html
|-- style.css
|-- script.js
|-- tech-blog/
|   |-- index.html
|   `-- <entry>/index.html
|-- favicon.ico
|-- favicon-16x16.png
|-- favicon-32x32.png
`-- apple-touch-icon.png
```

## Pages

- Homepage: [`index.html`](./index.html)
- Tech blog index: [`tech-blog/index.html`](./tech-blog/index.html)
- Individual entries: one folder per post under [`tech-blog/`](./tech-blog/)

## Local Preview

Because this is a static site, you can preview it with any simple local web server.

Example:

```powershell
cd "F:\Pacific Wharf\website"
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Publishing

The site is intended to deploy directly with GitHub Pages.

- Publishing source: repository root
- Entry file: `index.html`
- Static output only
- `.nojekyll` is included so the site is served as plain static files

## License

This repository uses mixed licensing.

- Website source code: [`MIT`](./LICENSE)
- Experiment writeups, editorial content, and published media: Copyright (c) 2026 Pacific Wharf. All rights reserved.

See [`COPYRIGHT.md`](./COPYRIGHT.md) for the full code-versus-content split.

## Content Workflow

The homepage is the brand and services surface.

The tech blog is the publishing surface:

1. Add a new folder under `tech-blog/`
2. Create or duplicate an `index.html` entry page
3. Add the entry to `tech-blog/index.html`
4. Update homepage featured entries if needed

## Notes

- `AGENTS.md` is intentionally ignored in version control
- Keep the site lightweight and easy to edit by hand
- Prefer real workflow artifacts and technical notes over filler copy
