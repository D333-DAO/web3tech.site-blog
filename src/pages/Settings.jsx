import React, { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DeleteAccountSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await base44.functions.invoke("deleteAccount", {});
      window.location.href = "/";
    } catch (err) {
      setError("Failed to delete account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h2 className="text-sm font-semibold text-foreground mb-1">Danger Zone</h2>
      <p className="text-xs text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-destructive border-destructive/40 hover:bg-destructive/10 hover:text-destructive select-none">
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone. All your data will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {error && <p className="text-destructive text-xs w-full text-left mb-2">{error}</p>}
            <AlertDialogCancel className="select-none">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90 select-none"
            >
              {loading ? "Deleting..." : "Yes, delete my account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function Settings() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-foreground">Settings</h1>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        {/* Account info */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Account</h2>
          <div className="bg-secondary/50 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <p className="text-sm text-foreground font-medium">
              {isAuthenticated && user?.email ? user.email : "Not signed in"}
            </p>
          </div>
        </div>

        {/* Logout */}
        {isAuthenticated && (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Session</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout(true)}
              className="select-none"
            >
              Log Out
            </Button>
          </div>
        )}

        {/* Delete account — only for authenticated users */}
        {isAuthenticated && <DeleteAccountSection />}
      </div>
    </div>
  );
}