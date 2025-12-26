// src/pages/AuthPage.tsx
// import { FormEvent, useState, useEffect } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// const AuthPage = () => {
//   const { signIn, signUp } = useAuth();
//   const [searchParams] = useSearchParams();
//   const [mode, setMode] = useState<"login" | "signup">("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

//   // Read mode from URL params on mount
//   useEffect(() => {
//     const urlMode = searchParams.get("mode");
//     if (urlMode === "signup") {
//       setMode("signup");
//     } else {
//       setMode("login");
//     }
//   }, [searchParams]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     const action = mode === "login" ? signIn : signUp;
//     const { error } = await action(email, password);

//     setLoading(false);

//     if (error) {
//       setError(error);
//       return;
//     }

//     navigate(from, { replace: true });
//   };

//   const title = mode === "login" ? "Welcome back" : "Create your KeyWorded account";
//   const subtitle =
//     mode === "login"
//       ? "Log in to access your saved analyses and dashboard."
//       : "Sign up to unlock resume analysis and personalized tools.";

//   const emailHint =
//     mode === "signup"
//       ? "You will receive a verification email after signing up."
//       : "Use the email you verified during sign up.";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
//       <div className="w-full max-w-md card-base space-y-6">
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl font-bold text-foreground">{title}</h1>
//           <p className="text-sm text-muted-foreground">{subtitle}</p>
//         </div>

//         {error && (
//           <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
//             {error === "Email not confirmed"
//               ? "Please confirm your email using the link sent to your inbox before logging in."
//               : error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               required
//               className="input-base w-full"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//             />
//             <p className="text-[11px] text-muted-foreground">{emailHint}</p>
//           </div>

//           <div className="space-y-1">
//             <label className="block text-sm font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 minLength={6}
//                 className="input-base w-full pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="At least 6 characters"
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-full transition-colors"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//             <p className="text-[11px] text-muted-foreground">
//               Use at least 6 characters. For better security, include letters, numbers, and symbols.
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading
//               ? "Please wait..."
//               : mode === "login"
//               ? "Log in"
//               : "Create account"}
//           </button>
//         </form>

//         <div className="border-t border-border pt-4 text-center space-y-1">
//           <p className="text-xs text-muted-foreground">
//             {mode === "login" ? (
//               <>
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   className="text-primary underline"
//                   onClick={() => setMode("signup")}
//                 >
//                   Sign up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   className="text-primary underline"
//                   onClick={() => setMode("login")}
//                 >
//                   Log in
//                 </button>
//               </>
//             )}
//           </p>

//           {mode === "signup" && (
//             <p className="text-[11px] text-muted-foreground">
//               By creating an account, you agree to receive transactional emails such as verification and security alerts.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

// src/pages/AuthPage.tsx
import { FormEvent, useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  // Read mode from URL params on mount
  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup") {
      setMode("signup");
    } else {
      setMode("login");
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const action = mode === "login" ? signIn : signUp;
    const { error } = await action(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    // Success handling
    if (mode === "signup") {
      // Signup success -> Switch to login + show success message
      setSuccessMessage("Account created successfully! Please log in.");
      setMode("login");
      setEmail(""); // Clear email for security
      setPassword("");
      return;
    }

    // Login success -> Navigate to dashboard
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

        {successMessage && (
          <div className="rounded-md bg-green-500/10 border border-green-500/30 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </div>
        )}

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                className="input-base w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-full transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
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
                Don't have an account?{" "}
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

