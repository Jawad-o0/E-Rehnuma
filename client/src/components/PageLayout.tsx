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

// Import your new components here
import { Chatbot } from "@/components/Chatbot";
import { GlobalEmergencyBar } from "@/components/GlobalEmergencyBar";

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
        <div className="max-w-7xl mx-auto glass rounded-full p-2 md:p-3 flex items-center justify-between border-primary/20 bg-background/60 backdrop-blur-xl shadow-2xl">
          {/* Brand Logo */}
          <Link href="/">
            <div className="flex items-center gap-1.5 md:gap-2 pl-1 cursor-pointer group shrink-0">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shrink-0">
                <span className="text-white font-bold text-[10px]">ER</span>
              </div>
              <span className="text-[12px] xs:text-[14px] md:text-xl font-black tracking-tighter uppercase whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
                E-Sarkari Rehnuma
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1 md:gap-3">
            <Button
              variant={isElderly ? "default" : "outline"}
              size="sm"
              onClick={() => setIsElderly(!isElderly)}
              className={`h-9 md:h-11 px-3 md:px-4 rounded-full border-primary/30 transition-all ${
                isElderly ? "animate-pulse" : "bg-white/5"
              }`}
            >
              <Accessibility
                className={`w-4 h-4 md:w-5 md:h-5 ${isElderly ? "mr-0" : "md:mr-2"}`}
              />
              <span className="hidden md:inline text-xs font-bold uppercase">
                {t("Elderly", "بزرگ")}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfusedOpen(true)}
              className="h-9 md:h-11 px-3 md:px-4 rounded-full border-amber-500/30 text-amber-500 bg-white/5 hover:bg-amber-500/10"
            >
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden lg:inline ml-2 text-xs font-bold uppercase">
                {t("Help", "مدد")}
              </span>
            </Button>

            <div className="flex bg-slate-900/60 border border-white/10 p-1 rounded-full shadow-inner ml-1">
              <button
                onClick={() => setLang("en")}
                className={`px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  lang === "en"
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ur")}
                className={`px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  lang === "ur"
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={isConfusedOpen} onOpenChange={setIsConfusedOpen}>
        <DialogContent className="glass border-primary/20 max-w-lg rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-black text-center">
              {t("Need a fresh start?", "دوبارہ شروع کرنا چاہتے ہیں؟")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-2">
            <p className="text-lg text-center text-muted-foreground">
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
                {t("Yes, start over", "جی ہاں، دوبارہ شروع کریں")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 rounded-2xl text-lg font-bold"
                onClick={() => setIsConfusedOpen(false)}
              >
                <X className="w-5 h-5 mr-3" />
                {t("No, keep going", "نہیں، جاری رکھیں")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-24">
      <Navbar />

      {/* Main content of whatever page the user is on */}
      <main>{children}</main>

      {/* Global Utilities - Fixed on screen */}
      <GlobalEmergencyBar />
      <Chatbot />
    </div>
  );
}
