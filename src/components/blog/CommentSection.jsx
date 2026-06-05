import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MessageSquare, Send, Reply, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

function CommentForm({ postSlug, parentId = null, onSubmit, onCancel, compact = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setLoading(true);
    await onSubmit({ author_name: name.trim(), author_email: email.trim(), content: content.trim(), post_slug: postSlug, parent_id: parentId || null });
    setName(""); setEmail(""); setContent("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Input
          placeholder="Your name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-secondary/50 border-border/50 text-sm"
        />
        <Input
          placeholder="Email (optional, not shown)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary/50 border-border/50 text-sm"
        />
      </div>
      <Textarea
        placeholder={compact ? "Write a reply..." : "Share your thoughts, questions, or feedback..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={compact ? 2 : 4}
        className="bg-secondary/50 border-border/50 text-sm resize-none"
      />
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="text-muted-foreground">
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" disabled={loading || !name.trim() || !content.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Send className="w-3 h-3" />
          {loading ? "Posting..." : compact ? "Reply" : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}

function CommentItem({ comment, replies, postSlug, onReplySubmit }) {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">
          {comment.author_name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-foreground">{comment.author_name}</span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(comment.created_date), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">{comment.content}</p>
          <button
            onClick={() => setShowReply(!showReply)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>

          {/* Reply form */}
          <AnimatePresence>
            {showReply && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <CommentForm
                  postSlug={postSlug}
                  parentId={comment.id}
                  compact
                  onSubmit={async (data) => {
                    await onReplySubmit(data);
                    setShowReply(false);
                  }}
                  onCancel={() => setShowReply(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested replies */}
          {replies.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="inline-flex items-center gap-1 text-xs text-primary mb-3"
              >
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </button>
              <AnimatePresence>
                {showReplies && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pl-4 border-l-2 border-border/50 space-y-4"
                  >
                    {replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground text-xs font-bold">
                          {reply.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-sm text-foreground">{reply.author_name}</span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(reply.created_date), "MMM d, yyyy 'at' h:mm a")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CommentSection({ postSlug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    const data = await base44.entities.Comment.filter({ post_slug: postSlug }, "created_date", 100);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const handleSubmit = async (data) => {
    // Optimistic update: add a temporary comment immediately
    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      ...data,
      id: tempId,
      created_date: new Date().toISOString(),
      approved: true,
    };
    setComments((prev) => [...prev, optimisticComment]);

    try {
      await base44.entities.Comment.create(data);
      // Replace with server data
      await fetchComments();
    } catch {
      // Rollback on failure
      setComments((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  const topLevel = comments.filter((c) => !c.parent_id);
  const getReplies = (id) => comments.filter((c) => c.parent_id === id);

  return (
    <section className="mt-16">
      <div className="border-t border-border/50 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Discussion
            {comments.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">({comments.length})</span>
            )}
          </h2>
        </div>

        {/* Comment form */}
        <div className="mb-10 p-5 rounded-xl bg-card/50 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-4">Leave a comment</p>
          <CommentForm postSlug={postSlug} onSubmit={handleSubmit} />
        </div>

        {/* Comments list */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-secondary" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-secondary rounded w-24" />
                  <div className="h-3 bg-secondary rounded w-full" />
                  <div className="h-3 bg-secondary rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : topLevel.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No comments yet. Be the first to start the discussion!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {topLevel.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={getReplies(comment.id)}
                postSlug={postSlug}
                onReplySubmit={handleSubmit}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}