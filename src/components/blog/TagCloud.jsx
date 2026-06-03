import React from "react";
import { BLOG_POSTS } from "@/lib/blogData";

export default function TagCloud({ activeTag, onTagClick }) {
  // Tally tag counts across all posts
  const tagCounts = {};
  BLOG_POSTS.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const maxCount = Math.max(...Object.values(tagCounts));
  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  // Scale font size between 0.7rem and 1.1rem based on frequency
  const getSize = (count) => {
    const ratio = count / maxCount;
    return 0.7 + ratio * 0.4;
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <h3 className="font-heading font-bold text-sm text-foreground mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {activeTag && (
          <button
            onClick={() => onTagClick(null)}
            className="text-xs px-2.5 py-1 rounded-full border border-primary/50 bg-primary/10 text-primary font-medium"
          >
            ✕ Clear
          </button>
        )}
        {tags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag === activeTag ? null : tag)}
            title={`${count} article${count > 1 ? "s" : ""}`}
            style={{ fontSize: `${getSize(count)}rem` }}
            className={`px-2.5 py-1 rounded-full border transition-all ${
              tag === activeTag
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}