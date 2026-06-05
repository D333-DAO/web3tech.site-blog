import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Info } from "lucide-react";

const TABS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "About", path: "/about", icon: Info },
];

// Keys for persisting scroll position per tab
const scrollKey = (path) => `tab_scroll_${path}`;

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabPress = useCallback((path) => {
    const current = location.pathname;

    // Save scroll position of the current page before navigating away
    const currentTab = TABS.find((t) => t.path === current || (t.path === "/blog" && current.startsWith("/blog/")));
    if (currentTab) {
      sessionStorage.setItem(scrollKey(currentTab.path), String(window.scrollY));
    }

    // If already on this tab's root, scroll back to top
    if (current === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(path);

    // Restore saved scroll position after navigation paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const saved = sessionStorage.getItem(scrollKey(path));
        if (saved) {
          window.scrollTo({ top: parseInt(saved, 10), behavior: "instant" });
        }
      });
    });
  }, [location.pathname, navigate]);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch">
        {TABS.map(({ label, path, icon: Icon }) => {
          const active =
            location.pathname === path ||
            (path === "/blog" && location.pathname.startsWith("/blog"));
          return (
            <button
              key={path}
              onClick={() => handleTabPress(path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors select-none [-webkit-user-select:none] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}