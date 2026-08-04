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

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface UserProfile {

  id: string;

  fullName: string;
  username: string;
  avatarUrl: string | null;

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
  }, []);

  return (
    <AppContext.Provider
      value={{
        authUser,
        profile,
        session,

        loading,
        error,

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