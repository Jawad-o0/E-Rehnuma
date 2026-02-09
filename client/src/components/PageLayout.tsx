import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Globe, Accessibility, HelpCircle, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

// Keeping your original components
import { Chatbot } from "@/components/Chatbot";
import { GlobalEmergencyBar } from "@/components/GlobalEmergencyBar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { lang, setLang, isElderly, setIsElderly, t } = useLanguage();
  const [isConfusedOpen, setIsConfusedOpen] = useState(false);
  const [, setLocation] = useLocation();

  const resetFlow = () => {
    setLocation("/");
    setIsConfusedOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-2 md:p-4">
        {/* Fix: Changed bg to be dynamic so it doesn't look like a dark box in Light Mode */}
        <div className="max-w-7xl mx-auto glass rounded-full p-2 md:p-3 flex items-center justify-between border-emerald-500/20 bg-white/70 dark:bg-[#001a0f]/60 backdrop-blur-md shadow-2xl">
          {/* Brand Logo - Added smaller font sizes for mobile to prevent overlap */}
          <Link href="/">
            <div className="flex items-center gap-1.5 md:gap-2 pl-1 cursor-pointer group shrink-0">
              <span className="text-[11px] xs:text-[13px] sm:text-base md:text-xl font-black tracking-tighter uppercase whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-950 dark:from-primary dark:to-foreground">
                E-Sarkari Rehnuma
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1 md:gap-4">
            {/* Keeping your original ThemeToggle */}
            <ThemeToggle />

            <Button
              variant={isElderly ? "default" : "outline"}
              size="sm"
              onClick={() => setIsElderly(!isElderly)}
              className={`h-9 md:h-11 px-2.5 md:px-4 rounded-full border-primary/30 transition-all ${
                isElderly ? "animate-pulse" : "bg-white/5"
              }`}
            >
              <Accessibility
                className={`w-4 h-4 md:w-5 md:h-5 ${isElderly ? "mr-0" : "md:mr-2"}`}
              />
              <span
                className={`hidden md:inline text-xs font-bold uppercase ${lang === "ur" ? "font-urdu" : ""}`}
              >
                {t("Elderly", "بزرگ")}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfusedOpen(true)}
              className="h-9 md:h-11 px-2.5 md:px-4 rounded-full border-amber-500/30 text-amber-500 bg-white/5 hover:bg-amber-500/10"
            >
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span
                className={`hidden lg:inline ml-2 text-xs font-bold uppercase ${lang === "ur" ? "font-urdu" : ""}`}
              >
                {t("Help", "مدد")}
              </span>
            </Button>

            {/* Language Switcher */}
            <div className="flex bg-emerald-500/10 dark:bg-[#001a0f]/60 border border-emerald-500/20 p-1 rounded-full shadow-inner ml-1">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  lang === "en"
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-muted-foreground hover:text-emerald-600"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ur")}
                className={`px-2.5 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black transition-all font-urdu ${
                  lang === "ur"
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-muted-foreground hover:text-emerald-600"
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dialog remains the same */}
      <Dialog open={isConfusedOpen} onOpenChange={setIsConfusedOpen}>
        <DialogContent className="glass border-primary/20 max-w-lg rounded-[2.5rem] bg-white dark:bg-[#001a0f]">
          <DialogHeader>
            <DialogTitle
              className={`text-2xl md:text-3xl font-black text-center ${lang === "ur" ? "font-urdu py-2" : ""}`}
            >
              {t("Need a fresh start?", "دوبارہ شروع کرنا چاہتے ہیں؟")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-2">
            <p
              className={`text-center text-muted-foreground ${lang === "ur" ? "font-urdu text-xl" : "text-lg"}`}
            >
              {t(
                "Would you like to go back to the home screen?",
                "کیا آپ ہوم اسکرین پر واپس جانا چاہیں گے؟",
              )}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="h-16 rounded-2xl text-lg font-bold"
                onClick={resetFlow}
              >
                <RotateCcw className="w-5 h-5 mr-3" />
                <span className={lang === "ur" ? "font-urdu" : ""}>
                  {t("Yes, start over", "جی ہاں، دوبارہ شروع کریں")}
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 rounded-2xl text-lg font-bold"
                onClick={() => setIsConfusedOpen(false)}
              >
                <X className="w-5 h-5 mr-3" />
                <span className={lang === "ur" ? "font-urdu" : ""}>
                  {t("No, keep going", "نہیں، جاری رکھیں")}
                </span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PageLayout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-[#001a0f] pt-24 md:pt-32 pb-24 transition-colors duration-300">
      <Navbar />

      {/* Fix: Added leading-relaxed specifically for Urdu to stop text collision */}
      <main
        className={`${lang === "ur" ? "leading-[1.8] md:leading-[2.2]" : ""}`}
      >
        {children}
      </main>

      <GlobalEmergencyBar />
      <Chatbot />
    </div>
  );
}
