import type { User, Session } from "@supabase/supabase-js";

export interface AppContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}