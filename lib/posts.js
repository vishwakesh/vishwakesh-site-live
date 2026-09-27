import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";

const POSTS = "posts";

// Returns every published post, newest first.
export async function getAllPosts() {
  const q = query(
    collection(db, POSTS),
    where("published", "==", true),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Admin only (requires auth): returns every post, published or not.
export async function getAllPostsAdmin() {
  const q = query(collection(db, POSTS), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Returns a single published post by its slug, or null.
export async function getPostBySlug(slug) {
  const snap = await getDoc(doc(db, POSTS, slug));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (!data.published) return null;
  return { id: snap.id, ...data };
}

// Admin only: fetch a post regardless of published state, for editing.
export async function getPostBySlugAdmin(slug) {
  const snap = await getDoc(doc(db, POSTS, slug));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Admin only: create or overwrite a post.
export async function savePost(slug, data) {
  await setDoc(doc(db, POSTS, slug), data, { merge: true });
}

// Admin only: permanently remove a post.
export async function deletePost(slug) {
  await deleteDoc(doc(db, POSTS, slug));
}

// Derives the category list (with counts) straight from the posts already fetched.
export function getCategories(posts) {
  const counts = {};
  for (const p of posts) counts[p.category] = (counts[p.category] || 0) + 1;
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export function getPopularTags(posts, limit = 8) {
  const counts = {};
  for (const p of posts) for (const t of p.tags || []) counts[t] = (counts[t] || 0) + 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
