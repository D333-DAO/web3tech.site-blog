import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Info, Settings } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const BASE_TABS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "About", path: "/about", icon: Info },
];

// Keys for persisting scroll position per tab
const scrollKey = (path) => `tab_scroll_${path}`;

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const TABS = isAuthenticated
    ? [...BASE_TABS, { label: "Settings", path: "/settings", icon: Settings }]
    : BASE_TABS;

  const handleTabPress = useCallback((path) => {
    const current = location.pathname;

    // Determine which tab is currently "active" (may be a sub-page)
    const activeTab = TABS.find(
      (t) => t.path === current || (t.path !== "/" && current.startsWith(t.path + "/"))
    );

    // Save scroll position of the current tab's root before leaving
    if (activeTab) {
      sessionStorage.setItem(scrollKey(activeTab.path), String(window.scrollY));
    }

    const isOnTabRoot = current === path;
    const isOnTabSubPage = activeTab?.path === path && !isOnTabRoot;

    if (isOnTabRoot) {
      // Already at this tab's root → scroll to top (like native)
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isOnTabSubPage) {
      // On a sub-page of the active tab → pop back to tab root
      navigate(path, { replace: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Switching to a different tab → always navigate to that tab's root
    navigate(path);

    // Restore saved scroll position for the destination tab
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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50"
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