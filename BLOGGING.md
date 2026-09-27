# Blogging

Posts live in **Firestore**, not in git. Publishing a post pushes it straight
to the live database — the site reads from Firestore on every page load, so
there's nothing to rebuild or redeploy. You still write posts as Markdown
files locally; `scripts/add-post.mjs` is what uploads them.

## 0. The easiest way: the Admin panel

If typing Markdown and running Termux commands has been painful, use this instead — it needs nothing but your phone's browser.

1. Go to `https://your-site.vercel.app/admin`
2. Log in with the admin email/password you created in Firebase (see `SETUP.md` step 8)
3. Fill in the form (title, description, category, tags, cover image, content, published toggle) and hit **Save post**
4. It's live immediately — no git, no Termux, no tokens

The same "All posts" list on that page lets you **edit** (click Edit, change fields, Save again) or **delete** any post. Everything below in this file describes the Termux/Markdown alternative, which still works too — use whichever is easier in the moment.

## 1. Write a draft

```bash
nano drafts/my-new-post.md
```

```markdown
---
title: "My New Post"
description: "One or two sentences for the blog list and SEO."
date: "2026-09-27"
category: "Tech"
tags:
  - AI
  - Web
cover: "my-new-post-cover.jpg"
published: true
---

# My New Post

Write the article here in Markdown.
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `description` | yes | shown in the blog list and used for SEO |
| `date` | yes | `YYYY-MM-DD` |
| `category` | yes | e.g. Tech, Startup, AI, Productivity, Life, Tutorials, Gaming, Other |
| `tags` | no | list of strings |
| `cover` | no | filename of an image sitting next to the `.md` file, or a full URL |
| `published` | no | defaults to `true`; set `false` to keep it a draft |
| `author` | no | defaults to "Vishwakesh" |
| `featured` | no | `true`/`false` |
| `slug` | no | defaults to the filename without `.md` |

## 2. Add a cover image

Put the image file in the same folder as the Markdown draft:

```bash
cp ~/storage/downloads/my-cover.webp drafts/my-new-post-cover.webp
```

Reference it in frontmatter as just the filename: `cover: "my-new-post-cover.webp"`.
The publish script uploads it to Firebase Storage for you. Use WebP or AVIF,
compressed, and no larger than ~1600px wide — don't commit huge images.

## 3. Publish

```bash
node scripts/add-post.mjs drafts/my-new-post.md
```

This reads the file, uploads the cover image if there is one, and writes the
post into Firestore. It's live immediately — refresh `/blog` to see it.

## 4. Edit an existing post

Edit the same Markdown file and run the same command again — it overwrites
the existing post (matched by slug).

## 5. Unpublish a post

Set `published: false` in the frontmatter and re-run the publish command.
The post stays in Firestore but stops showing up on the site.

## 6. Delete a post

Delete it from the Firebase Console → Firestore → `posts` collection → the
document with that slug → Delete document. (Deleting the local `.md` file
alone does nothing — Firestore is the source of truth.)

## 7. Adding a new category

Categories aren't a fixed list — just use a new `category` value in a post's
frontmatter and it will appear automatically in the blog page's filter bar.

## 8. Code blocks and links

Standard Markdown: triple backticks for fenced code blocks, `` `backticks` ``
for inline code, `[text](url)` for links, `> ` for blockquotes.

## 9. Committing your drafts (optional)

`drafts/` is a normal folder in the repo, so you can `git add drafts/my-new-post.md`
and push it if you want a backup — but pushing to GitHub does **not** publish
the post. Only running `scripts/add-post.mjs` does.

## 10. Troubleshooting

- **"Service account key not found"** — you haven't downloaded
  `firebase-service-account.json` yet; see `SETUP.md` step 3.
- **Post doesn't show up** — check `published: true` is set, and that you
  actually ran the publish command after your last edit.
- **Cover image missing** — the image file must sit in the same folder as the
  Markdown file, and the `cover:` filename must match exactly.
- **Build fails on Vercel** — Firestore reads happen at request time, not
  build time, so a missing post won't break the build. A real build error is
  almost always a JavaScript syntax issue — run `npm run build` locally first
  to catch it before pushing.
