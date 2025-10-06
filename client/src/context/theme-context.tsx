"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IAppearance, ThemeName } from "@/static";

interface ITheme {
  theme: ThemeName;
  appearance: IAppearance;
}

interface ThemeContextType {
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  const parseTheme = storedTheme
    ? JSON.parse(storedTheme)
    : { theme: "purple", appearance: "light" };

  const [theme, setTheme] = useState<ITheme>(parseTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme.theme);
    root.setAttribute("data-appearance", theme.appearance);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (theme.appearance === "auto") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const isDark = media.matches;
      document.documentElement.setAttribute(
        "data-appearance",
        isDark ? "dark" : "light"
      );
    }
  }, [theme.appearance]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
