"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllPosts, getCategories, getPopularTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function BlogPage() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch((e) => setError(e.message));
  }, []);

  const categories = useMemo(() => (posts ? getCategories(posts) : []), [posts]);
  const tags = useMemo(() => (posts ? getPopularTags(posts) : []), [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    return posts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = (p.title + p.description).toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, search, category]);

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-4xl">Thoughts, Ideas, Builds &amp; Learnings.</h1>
        <p className="mt-2 max-w-lg text-inksoft">
          I write about tech, startups, AI, productivity, life and whatever keeps me up at night. Mostly unfiltered, mostly real.
        </p>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="card mt-5 w-full max-w-sm rounded-lg px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo"
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {["All", ...categories.map((c) => c.name)].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3.5 py-1.5 text-sm ${
                    category === c ? "bg-indigo text-white" : "card text-inksoft"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-sm text-inksoft">
                Couldn&apos;t load posts (Firebase not configured yet?). Check <code>.env.local</code> against{" "}
                <code>.env.example</code>.
              </p>
            )}
            {!posts && !error && <p className="text-sm text-inksoft">Loading posts…</p>}
            {posts && posts.length === 0 && <p className="text-sm text-inksoft">No posts published yet.</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card rounded-2xl p-4">
              <h2 className="mb-2 font-semibold">Categories</h2>
              <ul className="space-y-1.5 text-sm text-inksoft">
                {categories.map((c) => (
                  <li key={c.name} className="flex justify-between">
                    <span>{c.name}</span> <span>{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-2xl p-4">
              <h2 className="mb-2 font-semibold">Popular Tags</h2>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-indigo/10 px-2.5 py-0.5 text-xs text-indigo">#{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
