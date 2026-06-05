import React from "react";
import { Loader2, ArrowDown } from "lucide-react";

export default function PullToRefreshIndicator({ pulling, refreshing }) {
  if (!pulling && !refreshing) return null;
  return (
    <div className="flex justify-center py-3 text-primary text-sm gap-2 items-center md:hidden">
      {refreshing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <ArrowDown className="w-4 h-4 animate-bounce" />
      )}
      <span>{refreshing ? "Refreshing..." : "Release to refresh"}</span>
    </div>
  );
}