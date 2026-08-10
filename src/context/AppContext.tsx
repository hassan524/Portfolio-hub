import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import {
  createClient,
  type User,
  type Session,
  type AuthChangeEvent,
} from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PREFERRED_PROVIDER_KEY = "preferredAuthProvider";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatarUrl: string | null;
  email: string;
  is_paid: boolean;
  createdPortfolios: number;
  publishedPortfolios: number;
  draftPortfolios: number;
  createdAt: string;
  updatedAt: string;
}

interface AppContextValue {
  authUser: User | null;
  profile: UserProfile | null;
  session: Session | null;

  loading: boolean;
  error: string | null;

  /** "google" | "facebook" | null — last non-password provider the user signed in with, on this device */
  preferredProvider: string | null;

  clearError: () => void;

  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<boolean>;

  signIn: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signInWithGoogle: () => Promise<void>;

  signInWithFacebook: () => Promise<void>;

  forgotPassword: (
    email: string
  ) => Promise<boolean>;

  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                                APP PROVIDER                                */
/* -------------------------------------------------------------------------- */

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [preferredProvider, setPreferredProvider] = useState<string | null>(
    () => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(PREFERRED_PROVIDER_KEY);
    }
  );

  const clearError = useCallback(() => setError(null), []);

  /* ---------------------------------------------------------------------- */
  /*                      LOAD PROFILE FROM DATABASE                         */
  /* ---------------------------------------------------------------------- */

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(error);
      setProfile(null);
      return;
    }

    setProfile(data);
  }, []);

  /* ---------------------------------------------------------------------- */
  /*                               SESSION                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      setAuthUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile(session.user.id);
      }

      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (
        _event: AuthChangeEvent,
        session: Session | null
      ) => {
        setSession(session);

        setAuthUser(session?.user ?? null);

        if (session?.user) {
          await loadProfile(session.user.id);

          // Remember which OAuth provider they used, so the login page
          // can personalize itself ("Welcome back, continue with Google")
          // next time they land there. We deliberately ignore "email" —
          // password login doesn't need this treatment.
          const provider = session.user.app_metadata?.provider;
          if (provider && provider !== "email") {
            localStorage.setItem(PREFERRED_PROVIDER_KEY, provider);
            setPreferredProvider(provider);
          }
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  /* ---------------------------------------------------------------------- */
  /*                                SIGN UP                                 */
  /* ---------------------------------------------------------------------- */

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName?: string
    ) => {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      console.log('error signup', error)

      setLoading(false);

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    },
    []
  );

  /* ---------------------------------------------------------------------- */
  /*                                SIGN IN                                 */
  /* ---------------------------------------------------------------------- */

  const signIn = useCallback(
    async (
      email: string,
      password: string
    ) => {
      setLoading(true);
      setError(null);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      setLoading(false);

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    },
    []
  );

  /* ---------------------------------------------------------------------- */

  const signInWithGoogle = useCallback(async () => {
    setError(null);

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });

    if (error) setError(error.message);
  }, []);

  /* ---------------------------------------------------------------------- */

  const signInWithFacebook = useCallback(async () => {
    setError(null);

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });

    if (error) setError(error.message);
  }, []);

  /* ---------------------------------------------------------------------- */

  const forgotPassword = useCallback(
    async (email: string) => {
      setLoading(true);
      setError(null);

      const { error } =
        await supabase.auth.resetPasswordForEmail(email);

      setLoading(false);

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    },
    []
  );

  /* ---------------------------------------------------------------------- */

  const signOut = useCallback(async () => {
    setError(null);

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    }

    // NOTE: preferredProvider is intentionally kept after sign-out.
    // This is the same behavior GitHub/Notion/Linear use — it lets the
    // login screen still greet a signed-out user with "Welcome back,
    // continue with Google" instead of forgetting them entirely.
    // If this app will run on shared/public devices and that's a concern,
    // uncomment the two lines below:
    // localStorage.removeItem(PREFERRED_PROVIDER_KEY);
    // setPreferredProvider(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        authUser,
        profile,
        session,

        loading,
        error,

        preferredProvider,

        clearError,

        signUp,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        forgotPassword,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  HOOK                                      */
/* -------------------------------------------------------------------------- */

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside <AppProvider>"
    );
  }

  return context;
}