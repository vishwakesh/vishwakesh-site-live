import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.id}`} className="card block overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
      {post.cover && (
        <div className="relative h-40 w-full">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs text-white">{post.category}</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-inksoft">{post.description}</p>
        <div className="mt-3 flex gap-3 text-xs text-inksoft">
          <span>{post.date}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
