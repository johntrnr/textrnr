# textrnr

live at https://txtrnr.github.io/textrnr/

ultra-light site for my apps. plain html + one stylesheet, no framework, no dependencies. hosted on github pages.

pages: **projects** (index + one page per project) · **gallery** · **posts**

## publish an app

put it in `apps/`, as `apps/<name>/index.html` or `apps/<name>.html`, and commit to `main`.
the `publish` action rebuilds everything and deploys in about a minute. works from the github app (add file → upload files).

## edit a project page

everything is in `projects.json`, one entry per project:

| field | what it does |
| --- | --- |
| `slug` | url (`projects/<slug>/`) and the name of its app in `apps/` |
| `name` | title |
| `kind` | web, ios, macos, mod… |
| `desc` | one line on the index |
| `intro` | the paragraph on the project page |
| `features` | the feature list on the project page |
| `url` | optional: link the "open" button somewhere else (app store, netlify…) |

each project's image is `covers/<slug>.jpg` (4:5, e.g. 960×1200), with a small copy in `covers/thumbs/<slug>.jpg` (160×200) for the list. replace them with real screenshots any time; if there's no thumb, the list uses the full image.

## gallery

drop images into `gallery/`. newest first by file name, so use dates: `2026-10-27-night-drive.jpg` → caption "night drive".

## posts

paste links to your x photo posts into `posts.json`. on the next publish, github downloads
their photos into `posts/img/` (saved in this repo, so the site never loads anything from x)
and the posts page shows them, newest first, with the date and the post's text.

```json
{
  "handle": "textrnr",
  "posts": [
    "https://x.com/textrnr/status/2114711724347793480"
  ]
}
```

remove a link to hide that post. `fetch-posts.mjs` does the downloading.

## files

| file | what it is |
| --- | --- |
| `style.css` | the whole design |
| `build.mjs` | writes `index.html`, `projects/`, `gallery/index.html`, `posts/index.html` |
| `fetch-posts.mjs` | downloads photos from the x posts in `posts.json` |
| `thumbs.py` | makes small copies of images for phones |
| `.github/workflows/pages.yml` | fetches post photos, builds and deploys on every push to `main` |

`thumbs.py` makes phone-sized copies of post and gallery photos (and list thumbnails for covers); the publish action runs it.

generated pages are overwritten on every build, so edit the json files, not the html. run `node build.mjs` to preview locally.

