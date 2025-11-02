import { Link } from "react-router-dom";
import { BlogPost } from "@/polymet/data/blog-data";

export interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {post.category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
