import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-9 md:h-11 w-9 md:w-11 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-600 dark:border-emerald-400 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 md:h-5 md:w-5 text-emerald-700" />
      ) : (
        <Sun className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
      )}
    </Button>
  );
}
