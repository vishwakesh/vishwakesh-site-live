"use client";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { getAllPostsAdmin, getPostBySlugAdmin, savePost, deletePost } from "@/lib/posts";

const empty = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Tech",
  tags: "",
  content: "",
  published: true
};

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminEditor({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(empty);
  const [coverFile, setCoverFile] = useState(null);
  const [existingCover, setExistingCover] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function refresh() {
    const all = await getAllPostsAdmin();
    setPosts(all);
  }

  useEffect(() => {
    refresh();
  }, []);

  function startNew() {
    setForm(empty);
    setCoverFile(null);
    setExistingCover(null);
    setStatus("");
  }

  async function startEdit(slug) {
    const post = await getPostBySlugAdmin(slug);
    if (!post) return;
    setForm({
      slug: post.id,
      title: post.title || "",
      description: post.description || "",
      date: post.date || empty.date,
      category: post.category || "Tech",
      tags: (post.tags || []).join(", "),
      content: post.content || "",
      published: post.published !== false
    });
    setExistingCover(post.cover || null);
    setCoverFile(null);
    setStatus("");
  }

  async function handleDelete(slug) {
    if (!confirm(`Delete "${slug}" permanently?`)) return;
    await deletePost(slug);
    await refresh();
    if (form.slug === slug) startNew();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("Saving…");
    try {
      const slug = form.slug ? slugify(form.slug) : slugify(form.title);
      if (!slug) throw new Error("Title or slug required.");

      let cover = existingCover;
      if (coverFile) {
        const path = `blog-covers/${slug}-${Date.now()}-${coverFile.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, coverFile);
        cover = await getDownloadURL(storageRef);
      }

      const words = form.content.trim().split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.round(words / 200));

      await savePost(slug, {
        title: form.title,
        description: form.description,
        date: form.date,
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        content: form.content,
        published: form.published,
        cover: cover || null,
        readingTime,
        author: "Vishwakesh",
        updatedAt: new Date().toISOString()
      });

      setStatus(`Saved as /blog/${slug}`);
      await refresh();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl">Blog Admin</h1>
        <button onClick={onLogout} className="text-sm text-inksoft underline">Log out</button>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_260px]">
        <form onSubmit={handleSubmit} className="card space-y-3 rounded-2xl p-5">
          <button type="button" onClick={startNew} className="mb-1 text-sm font-semibold text-indigo">+ New post</button>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo"
          />
          <input
            placeholder="Slug (optional — auto from title)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none"
          />
          <textarea
            placeholder="Short description (for the blog list and SEO)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            required
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none"
            />
          </div>
          <input
            placeholder="Tags, comma separated"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none"
          />
          <div>
            <label className="mb-1 block text-xs text-inksoft">Cover image {existingCover && "(existing image kept unless you choose a new one)"}</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} className="text-sm" />
          </div>
          <textarea
            placeholder="Content (Markdown)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            required
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 font-mono text-sm outline-none"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published (live on the site)
          </label>

          <button type="submit" disabled={saving} className="w-full rounded-lg bg-indigo px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving…" : "Save post"}
          </button>
          {status && <p className="text-sm text-inksoft">{status}</p>}
        </form>

        <div>
          <h2 className="mb-3 text-sm font-semibold">All posts</h2>
          <div className="space-y-2">
            {posts.map((p) => (
              <div key={p.id} className="card rounded-xl p-3">
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-inksoft">{p.id} · {p.published ? "published" : "draft"}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => startEdit(p.id)} className="font-semibold text-indigo">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="font-semibold text-red-500">Delete</button>
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-sm text-inksoft">No posts yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
