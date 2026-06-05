import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Info } from "lucide-react";

const TABS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "About", path: "/about", icon: Info },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch">
        {TABS.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path || (path === "/blog" && location.pathname.startsWith("/blog"));
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors select-none ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}