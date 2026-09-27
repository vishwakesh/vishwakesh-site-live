# Setup

## 1. Termux basics

```bash
pkg update
pkg install git nodejs
```

## 2. Clone the repo

```bash
git clone YOUR_REPOSITORY_URL
cd vishwakesh-site
npm install
```

## 3. Create a Firebase project

1. Go to https://console.firebase.google.com → Add project.
2. Build → Firestore Database → Create database (production mode).
3. Build → Storage → Get started (default bucket is fine).
4. Project Settings → General → "Your apps" → Add app → Web. Copy the config
   object it gives you — those values go into `.env.local` (see `.env.example`).
5. Project Settings → Service Accounts → Generate new private key. Save the
   downloaded JSON as `firebase-service-account.json` in the project root.
   **Never commit this file** — it's already in `.gitignore`.
6. In Firestore, go to Rules and paste the contents of `firestore.rules` from
   this repo, then Publish. Do the same for Storage → Rules with `storage.rules`.

## 8. Create your Admin login (for the `/admin` panel)

1. Firebase Console → **Build → Authentication → Get started**
2. **Sign-in method** tab → enable **Email/Password**
3. **Users** tab → **Add user** → enter an email and password you'll remember
   (this does not need to be a real inbox — it's just your login, e.g.
   `admin@vishwakesh.space` with a strong password)
4. That's it — go to `/admin` on your deployed site and log in with those
   exact credentials.

You are the only person who can create admin users (via the Firebase Console),
so this stays private to you even though the `/admin` URL itself isn't secret.

## 4. Local environment

```bash
cp .env.example .env.local
nano .env.local     # fill in the six NEXT_PUBLIC_FIREBASE_* values from step 3.4
```

## 5. Run locally

```bash
npm run dev
```

Visit http://localhost:3000.

## 6. Safe day-to-day workflow

```bash
git pull
# ...edit files...
npm run build        # catches errors before you push
git status
git add .
git commit -m "..."
git push
```

## 7. Deploy to Vercel

1. Push the repo to GitHub.
2. https://vercel.com → Add New Project → Import the repo.
3. In Vercel's Environment Variables, add the same six `NEXT_PUBLIC_FIREBASE_*`
   values from `.env.local`.
4. Deploy. Vercel auto-builds on every push to `main`.

Never commit `.env.local` or `firebase-service-account.json` — both are
git-ignored already.
