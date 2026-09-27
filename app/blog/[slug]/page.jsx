import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug } from "@/lib/posts";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, images: post.cover ? [post.cover] : [] }
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const html = (await remark().use(remarkHtml).process(post.content || "")).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author || "Vishwakesh" }
  };

  return (
    <article className="px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm font-semibold text-indigo">← Back to blog</Link>
        <h1 className="mt-4 font-display text-4xl">{post.title}</h1>
        <div className="mt-3 flex gap-3 text-sm text-inksoft">
          <span>{post.date}</span>
          <span>{post.readingTime} min read</span>
          <span>{post.category}</span>
        </div>
        {post.cover && (
          <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-8 flex flex-wrap gap-2">
          {(post.tags || []).map((t) => (
            <span key={t} className="rounded-full bg-indigo/10 px-2.5 py-0.5 text-xs text-indigo">#{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
