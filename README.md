# Earth Observation Data Infrastructure (EODI) Standard

This repository contains a fully static implementation of the Earth Observation Data Infrastructure (EODI) standard site that powers [https://eodatainfrastructure.com](https://eodatainfrastructure.com). The React/Vite build chain and all framework-specific dependencies have been removed, leaving a lightweight HTML, CSS, and JavaScript experience that can be hosted on any static file server.

## Project Structure

```
index.html   # Main standard overview page
styles.css   # Shared styling for the site
script.js    # Small enhancements (smooth scrolling, cards, scroll-to-top)
robots.txt   # Basic crawler directives
```

## Icon assets

To keep the repository free of binary assets, the site now uses a temporary blank favicon (`<link rel="icon" href="data:,">`). Browsers will show a neutral placeholder until a new branded icon is added.

## Viewing the Site Locally

There are two easy ways to explore the static site:

1. **Open the HTML file directly**  
   Locate `index.html` in this repository and double-click it (or right-click → "Open With") to launch it in your default browser.  
   This is the quickest option if you only need to view the content.

2. **Serve the files from a lightweight web server**
   Running a local server mimics how the site will behave once deployed and ensures relative links (like the favicon) resolve correctly.

   ```sh
   # From the repository root
   python -m http.server 8000
   ```

   Then open [http://localhost:8000](http://localhost:8000) in your browser. Use `Ctrl+C` (or `Cmd+C` on macOS) in the terminal when you are done to stop the server.


### Preview troubleshooting

If a preview pane shows `Not Found`, the static server is usually not running (or you are opening a non-existent path).

1. Start a server from the repository root:

   ```sh
   python -m http.server 8000
   ```

2. Open the explicit index route:

   - `http://localhost:8000/`
   - `http://localhost:8000/index.html`

For automated browser previews (including Codex screenshots), always point to `/index.html` to avoid path ambiguity.


## Deployment

Because the site is now fully static, you can deploy it to any static hosting platform (S3, Netlify, GitHub Pages, etc.) by uploading the files in this repository.
