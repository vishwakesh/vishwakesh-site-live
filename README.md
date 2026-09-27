# Vishwakesh — personal site

A personal website and blog for Vishwakesh: About, Projects, Blog, Goals, Contact.

## Stack

- **Next.js 14** (App Router, JavaScript)
- **Tailwind CSS** for styling
- **Firebase** — Firestore for blog posts, Firebase Storage for blog cover images
- Deployed on **Vercel**

## Folder structure

```
app/                  routes (About, /projects, /blog, /blog/[slug], /goals, /contact)
components/           Nav, Footer, PostCard, StoryTimeline
lib/                  firebase.js (client SDK), posts.js (Firestore reads),
                       projects.js / goals.js (static content you edit directly)
scripts/add-post.mjs  publishes a Markdown draft straight into Firestore
drafts/                your local Markdown drafts before they're published
public/                images, including /profile/profile.png
```

## Development

```bash
npm install
cp .env.example .env.local   # fill in your Firebase project's web config
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the six `NEXT_PUBLIC_FIREBASE_*` variables from `.env.example` as Vercel
   Environment Variables (Project Settings → Environment Variables).
4. Deploy. Every `git push` to `main` redeploys the site.

Publishing a new blog post does **not** require a redeploy — see `BLOGGING.md`.

## Full setup from scratch (Termux + Firebase)

See `SETUP.md`.

## How blogging works

See `BLOGGING.md`.
