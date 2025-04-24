
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Contrast = "normal" | "high";

interface ThemeContextType {
  theme: Theme;
  contrast: Contrast;
  toggleTheme: () => void;
  toggleContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  const [contrast, setContrast] = useState<Contrast>(() => {
    const saved = localStorage.getItem("contrast");
    return (saved as Contrast) || "normal";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (contrast === "high") {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    localStorage.setItem("contrast", contrast);
  }, [contrast]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleContrast = () => {
    setContrast(prev => prev === "normal" ? "high" : "normal");
  };

  return (
    <ThemeContext.Provider value={{ theme, contrast, toggleTheme, toggleContrast }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
