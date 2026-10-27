# textrnr

ultra-light site for my apps. plain html + one stylesheet, no framework, no dependencies. hosted on github pages.

pages: **tools** (index + one page per tool) · **gallery** · **posts**

## publish an app

put it in `apps/`, as `apps/<name>/index.html` or `apps/<name>.html`, and commit to `main`.
the `publish` action rebuilds everything and deploys in about a minute. works from the github app (add file → upload files).

## edit a tool page

everything is in `projects.json`, one entry per tool:

| field | what it does |
| --- | --- |
| `slug` | url (`tools/<slug>/`) and the name of its app in `apps/` |
| `name` | title |
| `kind` | web, ios, macos, mod… |
| `desc` | one line on the index |
| `intro` | the paragraph on the tool page |
| `features` | the feature list on the tool page |
| `url` | optional: link the "open" button somewhere else (app store, netlify…) |

add a screenshot by dropping `covers/<slug>.jpg` (or png / webp).

## gallery

drop images into `gallery/`. newest first by file name, so use dates: `2026-10-27-night-drive.jpg` → caption "night drive".

## posts

add links to your x posts in `posts.json`:

```json
{
  "handle": "textrnr",
  "posts": [
    "https://x.com/textrnr/status/1234567890",
    "https://x.com/textrnr/status/1234567891"
  ]
}
```

with an empty list, the page shows your latest posts from x.com/textrnr instead.

## files

| file | what it is |
| --- | --- |
| `style.css` | the whole design |
| `build.mjs` | writes `index.html`, `tools/`, `gallery/index.html`, `posts/index.html` |
| `.github/workflows/pages.yml` | builds and deploys on every push to `main` |

generated pages are overwritten on every build, so edit the json files, not the html. run `node build.mjs` to preview locally.

©textrnr
