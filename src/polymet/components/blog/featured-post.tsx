import { Link } from "react-router-dom";
import { BlogPost } from "@/polymet/data/blog-data";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="relative">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 text-xs rounded-full mb-3">
              {post.category}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 max-w-3xl">
              {post.title}
            </h2>
            <p className="text-white/90 max-w-2xl">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </section>
  );
}
