# apps/

Drop your apps here. Each one becomes a live page and appears on the index automatically.

Two ways to add an app:

- **a folder** — `apps/glyph/index.html` (plus any other files it needs) → served at `/apps/glyph/`
- **a single file** — `apps/scanline.html` → served at `/apps/scanline.html`

If the name matches a `slug` in `projects.json` (e.g. `glyph`, `iicsa`, `tone`), that row switches from "soon" to "open ↗".
If it doesn't match, it's added to the end of the list using the app's `<title>` and `<meta name="description">`.
