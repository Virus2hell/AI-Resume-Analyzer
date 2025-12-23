// src/pages/AuthPage.tsx
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const action = mode === "login" ? signIn : signUp;
    const { error } = await action(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    navigate(from, { replace: true });
  };

  const title = mode === "login" ? "Welcome back" : "Create your KeyWorded account";
  const subtitle =
    mode === "login"
      ? "Log in to access your saved analyses and dashboard."
      : "Sign up to unlock resume analysis and personalized tools.";

  const emailHint =
    mode === "signup"
      ? "You will receive a verification email after signing up."
      : "Use the email you verified during sign up.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md card-base space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error === "Email not confirmed"
              ? "Please confirm your email using the link sent to your inbox before logging in."
              : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="input-base w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <p className="text-[11px] text-muted-foreground">{emailHint}</p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="input-base w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
            <p className="text-[11px] text-muted-foreground">
              Use at least 6 characters. For better security, include letters, numbers, and symbols.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <div className="border-t border-border pt-4 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setMode("login")}
                >
                  Log in
                </button>
              </>
            )}
          </p>

          {mode === "signup" && (
            <p className="text-[11px] text-muted-foreground">
              By creating an account, you agree to receive transactional emails such as verification and security alerts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
