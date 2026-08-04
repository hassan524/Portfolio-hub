import { Link } from "react-router-dom";

interface AuthFooterProps {
  mode: "signup" | "login";
}

export function AuthFooter({ mode }: AuthFooterProps) {
  return (
    <>
      {/* Toggle mode */}
      <p className="mt-8 text-center text-sm text-ink-soft">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-ink hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-medium text-ink hover:underline underline-offset-4"
            >
              Create one — it's free
            </Link>
          </>
        )}
      </p>

      {/* Terms */}
      <p className="mt-6 text-center text-[11px] text-ink-soft/60 leading-relaxed">
        By continuing, you agree to our{" "}
        <Link
          to="/terms"
          className="underline underline-offset-2 hover:text-ink-soft"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="underline underline-offset-2 hover:text-ink-soft"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          to="/refunds"
          className="underline underline-offset-2 hover:text-ink-soft"
        >
          Refund Policy
        </Link>
        .
      </p>
    </>
  );
}
