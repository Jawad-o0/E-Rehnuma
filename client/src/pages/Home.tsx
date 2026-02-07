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

// --- COMPONENT: PROJECT HIGHLIGHTS (Restored with Stats) ---
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
              className="glass p-8 rounded-[2.5rem] border-white/5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-xl">
                {f.icon}
              </div>
              <h3
                className={`text-2xl font-bold mb-3 ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
              >
                {t(f.titleEn, f.titleUr)}
              </h3>
              <p
                className={`text-white/60 leading-relaxed ${lang === "ur" ? "font-urdu text-xl opacity-80" : ""}`}
              >
                {t(f.descEn, f.descUr)}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Counter Bar restored */}
        <div className="glass p-8 md:p-12 rounded-[3rem] border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center border-r border-white/5 last:border-0"
              >
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {s.num}
                </div>
                <div
                  className={`text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 ${lang === "ur" ? "font-urdu text-lg tracking-normal opacity-70" : ""}`}
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
      <div className="min-h-screen flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-12"
        >
          {/* 1. HERO TITLE */}
          <h2 className="text-center font-black tracking-tighter uppercase text-[60px] xs:text-[75px] md:text-[110px] leading-[0.85] md:leading-[0.9] mt-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-400 to-slate-600 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-pulse">
            {t(
              "What do you need help with?",
              "آپ کو کس چیز میں مدد کی ضرورت ہے؟",
            )}
          </h2>

          {/* 2. SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative z-50">
            <div className="absolute inset-y-0 left-5 flex items-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search for a service...", "خدمت تلاش کریں...")}
              className="h-16 pl-14 pr-6 text-xl rounded-full glass border-primary/20 focus:ring-primary/40 shadow-xl"
            />
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-4 glass rounded-[2rem] border-primary/20 shadow-2xl overflow-hidden p-4"
                >
                  {filteredServices.map((service) => (
                    <Link key={service.id} href={`/guidance/${service.id}`}>
                      <div className="p-4 hover:bg-primary/10 rounded-xl cursor-pointer flex justify-between items-center text-left">
                        <span className="font-bold text-lg">
                          {t(service.titleEn, service.titleUr)}
                        </span>
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. MISSION DESCRIPTION (Fixed Font/Alignment) */}
          <div className="max-w-4xl mx-auto">
            <div className="glass p-10 md:p-14 rounded-[3rem] border-primary/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <p
                className={`
                text-center leading-relaxed font-bold italic
                ${lang === "ur" ? "font-urdu text-2xl md:text-4xl leading-[1.8]" : "text-xl md:text-3xl tracking-tight text-[#c1d6cd]"}
              `}
              >
                {t(
                  "E-Sarkari Rehnuma is your digital companion for navigating public services. We simplify government and hospital procedures with clear, step-by-step instructions. Our mission is to empower every citizen with knowledge.",
                  "ای-سرکاری رہنما عوامی خدمات حاصل کرنے کے لیے آپ کا ڈیجیٹل ساتھی ہے۔ ہم واضح اور مرحلہ وار ہدایات فراہم کر کے سرکاری دستاویزات اور ہسپتال کے طریقہ کار کی پیچیدگیوں کو آسان بناتے ہیں۔",
                )}
              </p>
            </div>
          </div>

          {/* 4. MAIN CATEGORY CARDS */}
          <div className="grid md:grid-cols-2 gap-10">
            <Link href="/services/hospital">
              <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-primary/20 cursor-pointer rounded-[2.5rem]">
                <CardContent className="flex flex-col items-center gap-10 p-10">
                  <div className="p-8 rounded-[2rem] bg-primary/20 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                    <Stethoscope className="w-20 h-20 md:w-24 md:h-24" />
                  </div>
                  <span className="text-4xl md:text-5xl font-black">
                    {t("Hospital Services", "ہسپتال کی خدمات")}
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services/government">
              <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-primary/20 cursor-pointer rounded-[2.5rem]">
                <CardContent className="flex flex-col items-center gap-10 p-10">
                  <div className="p-8 rounded-[2rem] bg-primary/20 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                    <Landmark className="w-20 h-20 md:w-24 md:h-24" />
                  </div>
                  <span className="text-4xl md:text-5xl font-black">
                    {t("Government Services", "حکومتی خدمات")}
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
          {/* WHY E-REHNUMA HEADING */}
          <div className="pt-16 pb-8 text-center relative">
            {/* Small floating label */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block"
            >
              {t("The Digital Revolution", "ڈیجیٹل انقلاب")}
            </motion.span>

            {/* Main Section Heading */}
            <h2
              className={`
              font-black tracking-tighter uppercase 
              text-[40px] md:text-[70px] leading-none
              bg-clip-text text-transparent 
              bg-gradient-to-b from-white to-white/30
              ${lang === "ur" ? "font-urdu py-4" : ""}
            `}
            >
              {t("Why E-Rehnuma?", "ای-رہنما کیوں؟")}
            </h2>

            {/* Decorative Underline */}
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="h-1.5 w-12 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="h-1.5 w-3 bg-primary/40 rounded-full" />
              <div className="h-1.5 w-1.5 bg-primary/20 rounded-full" />
            </div>
          </div>

          {/* 5. PROJECT HIGHLIGHTS */}
          <ProjectHighlights />
        </motion.div>
      </div>
    </PageLayout>
  );
}
