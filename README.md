# Earth Observation Data Infrastructure (EODI) Standard

This repository contains a fully static implementation of the Earth Observation Data Infrastructure (EODI) standard site that powers [https://eodatainfrastructure.com](https://eodatainfrastructure.com). The React/Vite build chain and all framework-specific dependencies have been removed, leaving a lightweight HTML, CSS, and JavaScript experience that can be hosted on any static file server.

## Project Structure

```
index.html   # Main standard overview page
blog.html    # Supporting blog article
styles.css             # Shared styling for both pages
script.js              # Small enhancements (smooth scrolling, cards, scroll-to-top)
favicon.svg            # Vector favicon served from the site root
apple-touch-icon.svg   # Vector icon for iOS/Chrome mobile home-screen shortcuts
icon-192.svg           # Manifest icon (maskable) for install surfaces
icon-512.svg           # Manifest icon (maskable) for high-resolution install surfaces
safari-pinned-tab.svg  # Mask icon for Safari pinned tabs
site.webmanifest       # PWA manifest pointing at the local icon set
robots.txt             # Basic crawler directives
```

## Icon assets

To satisfy the "no binary files" restriction in some downstream tooling, all icons are delivered as SVG. The files are hand-crafted to preserve the same orbital motif across every surface while keeping the markup lightweight.

Update the `?v=svg1` cache-busting query parameter in `index.html`, `blog.html`, and `site.webmanifest` whenever you change the artwork so browsers fetch the new SVGs immediately.

## Viewing the Site Locally

There are two easy ways to explore the static site:

1. **Open the HTML file directly**  
   Locate `index.html` in this repository and double-click it (or right-click → "Open With") to launch it in your default browser.  
   This is the quickest option if you only need to view the content.

2. **Serve the files from a lightweight web server**  
   Running a local server mimics how the site will behave once deployed and ensures relative links (like `blog.html` or the favicon) resolve correctly.

   ```sh
   # From the repository root
   python -m http.server 8000
   ```

   Then open [http://localhost:8000](http://localhost:8000) in your browser. Use `Ctrl+C` (or `Cmd+C` on macOS) in the terminal when you are done to stop the server.

## Deployment

Because the site is now fully static, you can deploy it to any static hosting platform (S3, Netlify, GitHub Pages, etc.) by uploading the files in this repository.
