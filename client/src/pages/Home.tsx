import { Link } from "wouter";
import {
  Landmark,
  Stethoscope,
  Search,
  ArrowRight,
  Mic,
  Eye,
  Globe,
  Share2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { type Service } from "@shared/schema";

// --- COMPONENT: PROJECT HIGHLIGHTS ---
function ProjectHighlights() {
  const { lang, t } = useLanguage();

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      titleEn: "Voice Guidance",
      titleUr: "آواز کی رہنمائی",
      descEn: "Listen to steps in Urdu & English",
      descUr: "اردو اور انگریزی میں مراحل سنیں",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      titleEn: "Elderly Mode",
      titleUr: "بزرگوں کے لیے خاص موڈ",
      descEn: "Extra large text & simple UI",
      descUr: "بڑی لکھائی اور سادہ ڈیزائن",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleEn: "Bilingual Support",
      titleUr: "دو لسانی مدد",
      descEn: "Full support for Urdu Nastaliq",
      descUr: "اردو نستعلیق کی مکمل سپورٹ",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      titleEn: "Error Prevention",
      titleUr: "غلطیوں سے بچاؤ",
      descEn: "Smart alerts for common mistakes",
      descUr: "عام غلطیوں کے بارے میں الرٹس",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      titleEn: "Instant Share",
      titleUr: "فوری شیئرنگ",
      descEn: "Send checklists via WhatsApp",
      descUr: "واٹس ایپ پر لسٹ بھیجیں",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titleEn: "2026 Ready",
      titleUr: "جدید ٹیکنالوجی",
      descEn: "AI-powered real-time assistance",
      descUr: "اے آئی کے ذریعے فوری مدد",
    },
  ];

  const stats = [
    { num: "12+", en: "Services", ur: "سروسز" },
    { num: "0", en: "Fee (Free)", ur: "فیس (مفت)" },
    { num: "2", en: "Languages", ur: "زبانیں" },
    { num: "24/7", en: "AI Support", ur: "اے آئی مدد" },
  ];

  return (
    <section className="py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass p-8 rounded-[2.5rem] border-emerald-500/10 dark:border-emerald-500/20 group bg-white/50 dark:bg-emerald-950/30 backdrop-blur-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-xl">
                {f.icon}
              </div>
              <h3
                className={`text-2xl font-bold mb-3 text-emerald-900 dark:text-emerald-50 ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
              >
                {t(f.titleEn, f.titleUr)}
              </h3>
              <p
                className={`text-emerald-800/70 dark:text-emerald-100/60 leading-relaxed ${lang === "ur" ? "font-urdu text-xl" : ""}`}
              >
                {t(f.descEn, f.descUr)}
              </p>
            </div>
          ))}
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] border-emerald-500/10 bg-gradient-to-r from-emerald-900/10 via-transparent to-transparent dark:from-emerald-500/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center border-r border-emerald-900/10 dark:border-emerald-500/10 last:border-0"
              >
                <div className="text-4xl md:text-5xl font-black text-emerald-700 dark:text-emerald-400 mb-2">
                  {s.num}
                </div>
                <div
                  className={`text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-900/60 dark:text-emerald-100/40 ${lang === "ur" ? "font-urdu text-lg tracking-normal" : ""}`}
                >
                  {lang === "ur" ? s.ur : s.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const filteredServices = searchQuery.trim()
    ? services?.filter((s) => {
        const query = searchQuery.toLowerCase();
        return (
          s.titleEn.toLowerCase().includes(query) ||
          s.titleUr.includes(searchQuery)
        );
      })
    : [];

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center p-6 md:p-12 relative overflow-hidden bg-white dark:bg-[#001a0f]">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-12"
        >
          {/* 1. HERO TITLE - Brighter Metallic Effect for Dark Mode */}
          <h1
            className={`
              text-center font-black tracking-tighter uppercase 
              /* Responsive font sizes */
              text-[40px] xs:text-[55px] md:text-[90px] 
              /* Fix: Increase line height and padding for Urdu */
              ${lang === "ur" ? "leading-[1.8] py-10" : "leading-[0.9]"} 
              mt-12 bg-clip-text text-transparent 
              bg-gradient-to-b from-emerald-900 via-emerald-600 to-emerald-950 
              dark:from-white dark:via-emerald-50 dark:to-emerald-400 
              drop-shadow-xl
            `}
          >
            {t(
              "What do you need help with?",
              "آپ کو کس چیز میں مدد کی ضرورت ہے؟",
            )}
          </h1>

          {/* 2. SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative z-40">
            <div className="absolute inset-y-0 left-5 flex items-center">
              <Search className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search for a service...", "خدمت تلاش کریں...")}
              className="h-16 pl-14 pr-6 text-xl rounded-full glass border-emerald-500/30 focus:ring-emerald-500/40 shadow-xl bg-white/60 dark:bg-emerald-950/40 dark:text-white"
            />
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-4 glass rounded-[2rem] border-emerald-500/30 shadow-2xl overflow-hidden p-4 z-50 bg-white dark:bg-[#002b1a]"
                >
                  {filteredServices.map((service) => (
                    <Link key={service.id} href={`/guidance/${service.id}`}>
                      <div className="p-4 hover:bg-emerald-50 rounded-xl cursor-pointer flex justify-between items-center text-left dark:hover:bg-emerald-900/40">
                        <span className="font-bold text-lg text-emerald-900 dark:text-emerald-50">
                          {t(service.titleEn, service.titleUr)}
                        </span>
                        <ArrowRight className="h-5 w-5 text-emerald-600" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. MISSION DESCRIPTION - Styled Green Font */}
          <div className="max-w-4xl mx-auto">
            <div className="glass p-10 md:p-14 rounded-[3rem] border-emerald-500/20 shadow-2xl relative overflow-hidden bg-white/40 dark:bg-emerald-950/40">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <p
                className={`
                text-center leading-relaxed font-bold
                ${lang === "ur" ? "font-urdu text-2xl md:text-4xl leading-[1.8] text-emerald-950 dark:text-emerald-50" : "text-xl md:text-2xl tracking-tight text-emerald-800 dark:text-emerald-100"}
              `}
              >
                {t(
                  "E-Sarkari Rehnuma is your digital companion for navigating public services. We simplify government and hospital procedures with clear, step-by-step instructions.",
                  "ای-سرکاری رہنما عوامی خدمات حاصل کرنے کے لیے آپ کا ڈیجیٹل ساتھی ہے۔ ہم واضح اور مرحلہ وار ہدایات فراہم کر کے سرکاری دستاویزات اور ہسپتال کے طریقہ کار کی پیچیدگیوں کو آسان بناتے ہیں۔",
                )}
              </p>
            </div>
          </div>

          {/* 4. MAIN CATEGORY CARDS - Restored Borders and Green Logic */}
          <div className="grid md:grid-cols-2 gap-10">
            <Link href="/services/hospital">
              <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-emerald-500/20 cursor-pointer rounded-[2.5rem] bg-white/50 dark:bg-emerald-950/40">
                <CardContent className="flex flex-col items-center gap-6 p-10">
                  <div className="p-8 rounded-[2rem] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-500">
                    <Stethoscope className="w-16 h-16 md:w-20 md:h-20" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white">
                    {t("Hospital Services", "ہسپتال کی خدمات")}
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services/government">
              <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-emerald-500/20 cursor-pointer rounded-[2.5rem] bg-white/50 dark:bg-emerald-950/40">
                <CardContent className="flex flex-col items-center gap-6 p-10">
                  <div className="p-8 rounded-[2rem] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-500">
                    <Landmark className="w-16 h-16 md:w-20 md:h-20" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white">
                    {t("Government Services", "حکومتی خدمات")}
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
          {/* --- RESTORED: WHY E-REHNUMA SECTION --- */}
          <div className="pt-24 pb-12 text-center relative">
            {/* Small floating label */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block"
            >
              {t("The Digital Revolution", "ڈیجیٹل انقلاب")}
            </motion.span>

            {/* Main Section Heading - Using your Metallic Palette */}
            <h2
              className={`
              font-black tracking-tighter uppercase 
              text-[45px] md:text-[80px] leading-none
              text-emerald-950 dark:text-white
              ${lang === "ur" ? "font-urdu py-6" : ""}
            `}
            >
              {t("Why E-Rehnuma?", "ای-رہنما کیوں؟")}
            </h2>

            {/* Decorative Underline - Matches the Karachi Green vibe */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="h-2 w-20 bg-emerald-600 rounded-full shadow-[0_0_20px_rgba(5,150,105,0.4)]" />
              <div className="h-2 w-4 bg-emerald-600/40 rounded-full" />
              <div className="h-2 w-2 bg-emerald-600/20 rounded-full" />
            </div>
          </div>

          {/* This calls the ProjectHighlights component which should be at the top of your file */}
          <ProjectHighlights />
        </motion.div>
      </div>
    </PageLayout>
  );
}
