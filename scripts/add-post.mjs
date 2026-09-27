// Publish (or update) a blog post from a local Markdown file into Firestore.
//
// Usage (from Termux or any machine with Node + your service account key):
//   node scripts/add-post.mjs drafts/my-new-post.md
//
// The Markdown file needs frontmatter — see BLOGGING.md for the full field list.
// This talks to Firebase directly; you do NOT need to `git push` for a post to go live.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import admin from "firebase-admin";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/add-post.mjs path/to/post.md");
  process.exit(1);
}

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "./firebase-service-account.json";
if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account key not found at ${serviceAccountPath}.`);
  console.error("Download it from Firebase Console > Project Settings > Service Accounts.");
  process.exit(1);
}
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`
});
const db = admin.firestore();
const bucket = admin.storage().bucket();

const raw = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(raw);

const required = ["title", "description", "date", "category"];
for (const field of required) {
  if (!data[field]) {
    console.error(`Missing required frontmatter field: ${field}`);
    process.exit(1);
  }
}

const slug = data.slug || path.basename(filePath, path.extname(filePath));

// If `cover` points at a local file (not already a URL), upload it to Firebase Storage.
let coverUrl = data.cover || null;
if (coverUrl && !coverUrl.startsWith("http")) {
  const localImagePath = path.join(path.dirname(filePath), coverUrl);
  if (fs.existsSync(localImagePath)) {
    const dest = `blog-covers/${slug}${path.extname(localImagePath)}`;
    await bucket.upload(localImagePath, { destination: dest, public: true });
    coverUrl = `https://storage.googleapis.com/${bucket.name}/${dest}`;
  } else {
    console.warn(`Cover image "${coverUrl}" not found next to the Markdown file — skipping upload.`);
    coverUrl = null;
  }
}

const stats = readingTime(content);

const post = {
  title: data.title,
  description: data.description,
  date: data.date,
  category: data.category,
  tags: data.tags || [],
  cover: coverUrl,
  readingTime: Math.max(1, Math.round(stats.minutes)),
  published: data.published !== false,
  author: data.author || "Vishwakesh",
  featured: !!data.featured,
  content,
  updatedAt: new Date().toISOString()
};

await db.collection("posts").doc(slug).set(post, { merge: true });

console.log(`Published "${post.title}" as /blog/${slug} (published: ${post.published})`);
