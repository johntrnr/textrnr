# textrnr

Ultra-light index of my apps. Plain HTML, no framework, no dependencies, ~5 KB. Hosted on GitHub Pages.

## Publish an app

1. Put it in `apps/`, either as `apps/<name>/index.html` or `apps/<name>.html`. You can do this from the GitHub app or website (Add file → Upload files).
2. Commit to `main`. The `publish` action rebuilds the index and deploys it in about a minute.

## Edit the list

`projects.json` holds the order, names, short descriptions and type of each project.

- `slug` matches the app's folder or file name in `apps/`
- `url` (optional) links somewhere else instead, e.g. an App Store or Netlify link
- projects with no app and no `url` show as "soon"

## Files

| file | what it is |
| --- | --- |
| `template.html` | the page design (all the CSS is in here) |
| `build.mjs` | writes `index.html` from `template.html` + `projects.json` + `apps/` |
| `index.html` | generated, don't edit by hand |
| `.github/workflows/pages.yml` | builds and deploys on every push to `main` |

Run `node build.mjs` locally to preview.

©textrnr
