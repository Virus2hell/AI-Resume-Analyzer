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

  return (
    <div className="section-container py-12 flex justify-center">
      <div className="w-full max-w-md card-base space-y-4">
        <h1 className="text-2xl font-bold text-foreground text-center">
          {mode === "login" ? "Log in to KeyWorded" : "Create your account"}
        </h1>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="input-base w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="input-base w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
              : "Sign up"}
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
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
      </div>
    </div>
  );
};

export default AuthPage;
