import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/blogData";
import BlogCard from "@/components/blog/BlogCard";
import CommentSection from "@/components/blog/CommentSection";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Hero image */}
        <div className="relative rounded-xl overflow-hidden mb-8 aspect-video">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 border text-xs">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {format(new Date(post.date), "MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-6">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
          prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-li:text-muted-foreground
          prose-table:border-border
          prose-th:text-foreground prose-th:font-heading prose-th:bg-secondary prose-th:px-4 prose-th:py-2
          prose-td:px-4 prose-td:py-2 prose-td:text-muted-foreground prose-td:border-border
          prose-blockquote:border-primary/50 prose-blockquote:text-muted-foreground
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Source attribution */}
        <div className="mt-12 p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Originally published on{" "}
            {post.source === "techderksinsights" ? (
              <a href="https://techderksinsights.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                TechDerks Insights
              </a>
            ) : (
              <a href="https://blog.theweb3tech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                The Web3 Tech
              </a>
            )}
          </p>
        </div>

        {/* Comment Section */}
        <CommentSection postSlug={post.slug} />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </article>
  );
}