import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import TagCloud from "@/components/blog/TagCloud";
import NewsletterWidget from "@/components/blog/NewsletterWidget";
import { BLOG_POSTS } from "@/lib/blogData";
import { motion } from "framer-motion";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const filteredPosts = useMemo(() => {
    let posts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (activeTag) {
      posts = posts.filter((p) => p.tags?.includes(activeTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return posts;
  }, [activeCategory, searchQuery, activeTag]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-foreground mb-2">Blog</h1>
        <p className="text-muted-foreground">
          All articles on Web3, blockchain, cybersecurity, Linux, and software tools.
        </p>
      </motion.div>

      {/* Search + Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={(cat) => { setActiveCategory(cat); setActiveTag(null); }} />
      </div>

      {/* Tag Cloud */}
      <div className="mb-10">
        <TagCloud activeTag={activeTag} onTagClick={setActiveTag} />
      </div>

      {/* Active tag indicator */}
      {activeTag && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing articles tagged <span className="text-primary font-medium">#{activeTag}</span>
        </p>
      )}

      {/* Main content + Sidebar */}
      <div className="flex gap-8 items-start">
        {/* Posts grid */}
        <div className="flex-1 min-w-0">
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} onTagClick={setActiveTag} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
          <NewsletterWidget />
        </aside>
      </div>
    </div>
  );
}