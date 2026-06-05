/**
 * MobileDrawerSelect — renders a Drawer bottom sheet on mobile, a plain list on desktop.
 * Props:
 *   open, onOpenChange — controlled open state
 *   title — drawer header title
 *   trigger — ReactNode shown as the trigger button
 *   children — list items, typically <MobileDrawerSelect.Item> elements
 */
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";

function MobileDrawerSelect({ open, onOpenChange, title, trigger, children }) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    // On desktop just render the trigger; callers handle desktop UI themselves
    return <>{trigger}</>;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {title && (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        )}
        <div className="px-4 pb-6 flex flex-col gap-1">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

MobileDrawerSelect.Item = function DrawerItem({ label, sublabel, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors select-none [-webkit-user-select:none] ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      {sublabel != null && <span className="text-xs opacity-60">{sublabel}</span>}
    </button>
  );
};

export default MobileDrawerSelect;