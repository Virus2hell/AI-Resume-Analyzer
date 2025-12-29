import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// ✅ HELPER: Safe system theme detection (NO TypeScript errors)
const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR safe
    if (typeof window === "undefined") return defaultTheme;
    
    // ✅ BULLETPROOF THEME APPLY - ZERO RED LINES!
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const systemTheme = getSystemTheme();
    const activeTheme = (stored as Theme) ?? 
                       (systemTheme === "dark" ? "dark" : "light") ?? 
                       defaultTheme;

    // Apply theme BEFORE first paint
    document.documentElement.setAttribute("data-theme", activeTheme);
    document.documentElement.style.visibility = "visible";

    return activeTheme;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    const systemTheme = getSystemTheme();
    let activeTheme: "light" | "dark" = theme === "system" ? systemTheme : theme;

    // Apply theme class + data-theme attribute
    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
    root.setAttribute("data-theme", activeTheme);

    // Persist to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // System preference change listener
  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      const root = document.documentElement;
      root.setAttribute("data-theme", newTheme);
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
