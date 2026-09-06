import { useState, useEffect } from "react";
import { PageShell } from "@/components/individual/PageShell";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User, Mail, Shield, Zap, Key, Save, Loader2 } from "lucide-react";

export function SettingsPage() {
  const { profile, authUser, session } = useAppContext();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setUsername(profile.username || "");
    }
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          username: username.trim(),
          updatedAt: new Date().toISOString(),
        })
        .eq("id", authUser.id);

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred while saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = profile?.full_name || profile?.email || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <PageShell
      eyebrow="Account Settings"
      title="Settings & Preferences"
      subtitle="Manage your profile information, subscription status, and account credentials."
    >
      <div className="mx-auto max-w-4xl space-y-8 pb-12" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {/* Profile Card */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 md:p-8 shadow-lift space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border/40">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black border border-white/20 text-white text-xl font-bold shadow-soft">
              {avatarLetter}
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">{displayName}</h3>
              <p className="text-sm text-ink-soft">{profile?.email || authUser?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-accent" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-accent" />
                  <span>Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
            </div>

            {/* Email Address (Readonly) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={profile?.email || authUser?.email || ""}
                disabled
                className="w-full rounded-xl border border-border/40 bg-white/[0.02] px-4 py-2.5 text-sm text-ink-soft cursor-not-allowed"
              />
              <p className="text-[11px] text-ink-soft/70">
                Email address is linked to your account authentication and cannot be changed here.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-all shadow-soft cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Subscription & Plan Status */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 md:p-8 shadow-lift space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">Subscription Plan</h3>
                <p className="text-xs text-ink-soft">
                  {profile?.is_paid ? "Active Pro Membership" : "Free Plan Account"}
                </p>
              </div>
            </div>
            {!profile?.is_paid && (
              <a
                href="/pricing"
                className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/20 transition-all cursor-pointer"
              >
                Upgrade to Pro
              </a>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
