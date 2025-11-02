export type BlogCategory =
  | "Destinations"
  | "World's Table"
  | "Culture & Experiences"
  | "Adventures"
  | "Tips & Planning";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: BlogCategory;
  tags: string[];
  heroImage: string;
  thumbnail: string;
  readTime: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "stunning-canadian-island-you-cant-visit",
    title: "The stunning Canadian island you can't visit",
    excerpt:
      "Hidden deep in the Rockies and only visible by boat, Spirit Island is one of Canada's most iconic places – and a sacred site protected by local communities.",
    content:
      "Spirit Island, located on Maligne Lake in Jasper National Park, is accessible only by boat. Its cultural significance and fragile ecosystem have kept mass tourism at bay, preserving one of Canada's most photogenic vistas.",
    author: "TMPL Editorial",
    publishedAt: "2025-10-10",
    category: "Destinations",
    tags: ["Canada", "Rockies", "Islands"],
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    readTime: 6,
    featured: true,
  },
  {
    id: "post-2",
    slug: "hidden-museum-in-the-clouds-dolomites",
    title: "Italy's hidden mountain museums in the clouds",
    excerpt:
      "In the Dolomites, mountaineering legend Reinhold Messner has turned his life story into a collection of high-altitude museums.",
    content:
      "Perched on dramatic ridgelines, the Messner Mountain Museums celebrate alpinism through architecture and storytelling, blending art with the raw majesty of the Dolomites.",
    author: "TMPL Editorial",
    publishedAt: "2025-10-10",
    category: "Culture & Experiences",
    tags: ["Italy", "Museums", "Dolomites"],
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    readTime: 5,
  },
  {
    id: "post-3",
    slug: "traditional-way-see-upstate-ny-autumn-foliage",
    title: "A traditional way to see upstate NY's autumn foliage",
    excerpt:
      "Vast, wild and wooded, the Adirondacks offer one of the US's most dramatic autumn displays – best experienced by canoe.",
    content:
      "The Adirondacks' thousands of lakes and waterways transform into a mirror of fiery colors each fall. Paddling offers tranquility and access to hidden coves.",
    author: "TMPL Editorial",
    publishedAt: "2025-09-12",
    category: "Adventures",
    tags: ["USA", "Autumn", "Canoe"],
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    readTime: 4,
  },
  {
    id: "post-4",
    slug: "best-street-food-in-asia",
    title: "Five street foods to try across Asia",
    excerpt:
      "From smoky satay to savory momos, here's a curated list of crowd-favorite street bites across Asia.",
    content:
      "Street food remains the beating heart of many Asian cities. This guide highlights iconic flavors and where to find them safely.",
    author: "TMPL Editorial",
    publishedAt: "2025-09-05",
    category: "World's Table",
    tags: ["Food", "Asia", "Street Food"],
    heroImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    readTime: 7,
  },
  {
    id: "post-5",
    slug: "packing-tips-for-long-haul-trips",
    title: "10 packing tips for long-haul adventures",
    excerpt:
      "Lightweight, layered, and smart: a practical checklist to keep your luggage under control and your mind at ease.",
    content:
      "From compression cubes to universal adapters, these tips streamline packing for multi-climate itineraries.",
    author: "TMPL Editorial",
    publishedAt: "2025-08-16",
    category: "Tips & Planning",
    tags: ["Packing", "Checklist"],
    heroImage:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    readTime: 3,
  },
  {
    id: "post-6",
    slug: "where-to-find-real-middle-earth",
    title: "Where to find the real-life Middle‑earth",
    excerpt:
      "New Zealand’s otherworldly landscapes bring Tolkien’s realms to life – here’s where to go.",
    content:
      "From Fiordland to Tongariro, these filming locations remain timeless gateways to Middle‑earth.",
    author: "TMPL Editorial",
    publishedAt: "2025-09-17",
    category: "Destinations",
    tags: ["New Zealand", "Films"],
    heroImage:
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=800&q=80",
    readTime: 6,
  },
];
