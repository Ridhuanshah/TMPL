import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "@/polymet/data/blog-data";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0 -z-10">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="container mx-auto px-6 text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs mb-3">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{post.title}</h1>
            <p className="text-white/90 mb-4 max-w-2xl">{post.excerpt}</p>
            <div className="text-sm text-white/80 flex gap-3">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <article className="prose prose-lg max-w-none">
            <p>{post.content}</p>
          </article>

          {/* Sidebar: Meta */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Related {post.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/blog/${r.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-44 overflow-hidden">
                  <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-teal-700 font-semibold mb-1">{r.category}</div>
                  <h3 className="font-semibold line-clamp-2">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
