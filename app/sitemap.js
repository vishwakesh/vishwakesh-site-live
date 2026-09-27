import { getAllPosts } from "@/lib/posts";

export default async function sitemap() {
  const base = "https://vishwakesh.space";
  const staticRoutes = ["", "/projects", "/blog", "/goals", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));

  let postRoutes = [];
  try {
    const posts = await getAllPosts();
    postRoutes = posts.map((p) => ({ url: `${base}/blog/${p.id}`, lastModified: p.updatedAt || p.date }));
  } catch (e) {
    // Firestore not reachable at build time — static routes still get returned.
  }

  return [...staticRoutes, ...postRoutes];
}
