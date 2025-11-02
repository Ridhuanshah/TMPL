import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { blogPosts, BlogCategory } from "@/polymet/data/blog-data";
import { BlogCard } from "@/polymet/components/blog/blog-card";
import { FeaturedPost } from "@/polymet/components/blog/featured-post";

const categories: ("All" | BlogCategory)[] = [
  "All",
  "Destinations",
  "World's Table",
  "Culture & Experiences",
  "Adventures",
  "Tips & Planning",
];

export function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | BlogCategory>("All");

  const featured = useMemo(() => blogPosts.find((p) => p.featured), []);

  const posts = useMemo(() => {
    const withoutFeatured = blogPosts.filter((p) => (featured ? p.id !== featured.id : true));
    return withoutFeatured
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) =>
        (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
  }, [activeCategory, query, featured]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 md:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1920&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog & Travel Tips</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Latest stories, destination inspiration, and expert tips to help you travel better
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="container mx-auto px-6 -mt-16 md:-mt-20">
          <FeaturedPost post={featured} />
        </section>
      )}

      {/* Filters */}
      <section className="container mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  activeCategory === cat
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80">
            <Input
              placeholder="Search articles, tips, destinations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts found for your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
