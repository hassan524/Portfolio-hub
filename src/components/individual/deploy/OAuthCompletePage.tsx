import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

const DEPLOY_OAUTH_MESSAGE = "portfolio-hub:deploy-oauth-complete";

type DeployOAuthStatus = "success" | "error";
type DeployOAuthPlatform = "vercel" | "netlify";

export type DeployOAuthCompleteMessage = {
  type: typeof DEPLOY_OAUTH_MESSAGE;
  status: DeployOAuthStatus;
  platform: DeployOAuthPlatform;
  message?: string;
};

export { DEPLOY_OAUTH_MESSAGE };

export function OAuthCompletePage() {
  const [searchParams] = useSearchParams();

  const payload = useMemo<DeployOAuthCompleteMessage>(() => {
    const status = searchParams.get("deploy_status") === "success" ? "success" : "error";
    const platform = searchParams.get("platform") === "netlify" ? "netlify" : "vercel";
    const message = searchParams.get("message") || undefined;

    return {
      type: DEPLOY_OAUTH_MESSAGE,
      status,
      platform,
      message,
    };
  }, [searchParams]);

  useEffect(() => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, window.location.origin);
      window.setTimeout(() => window.close(), 500);
      return;
    }

    window.localStorage.setItem("deploy_oauth_complete", JSON.stringify(payload));
  }, [payload]);

  const isSuccess = payload.status === "success";
  const returnUrl = `/templates?deploy_status=${payload.status}&platform=${payload.platform}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-lift">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated text-foreground">
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <XCircle className="h-5 w-5 text-red-400" />
          )}
        </div>
        <h1 className="mt-4 text-base font-semibold text-foreground">
          {isSuccess ? "Connection complete" : "Connection failed"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {window.opener
            ? "Returning you to PortfolioHub..."
            : "You can return to PortfolioHub and continue deploying."}
        </p>
        {window.opener ? (
          <Loader2 className="mx-auto mt-5 h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <Link
            to={returnUrl}
            className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-foreground px-4 text-xs font-semibold text-background hover:opacity-90"
          >
            Back to PortfolioHub
          </Link>
        )}
      </div>
    </div>
  );
}
