import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MessageSquare, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { getMyCommentIds, removeMyCommentId } from "@/components/blog/CommentSection";

export default function MyCommentsSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const ids = getMyCommentIds();
    if (ids.length === 0) { setLoading(false); return; }
    // Fetch all stored comments
    Promise.all(ids.map((id) => base44.entities.Comment.filter({ id }, "created_date", 1).then((r) => r[0]).catch(() => null)))
      .then((results) => {
        setComments(results.filter(Boolean));
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await base44.entities.Comment.delete(id);
    removeMyCommentId(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">My Comments</h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" /> Loading...
        </div>
      ) : comments.length === 0 ? (
        <p className="text-xs text-muted-foreground">No comments posted from this browser.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-secondary/50 rounded-lg p-3 border border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">{c.author_name}</span>
                    {" · "}
                    <a href={`/blog/${c.post_slug}`} className="hover:text-primary inline-flex items-center gap-0.5">
                      {c.post_slug} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    {" · "}
                    {format(new Date(c.created_date), "MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-foreground line-clamp-2">{c.content}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                  disabled={deletingId === c.id}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0 h-7 px-2"
                >
                  {deletingId === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}