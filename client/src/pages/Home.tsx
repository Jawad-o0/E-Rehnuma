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
    <section className="py-12 w-full relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={i}
              className="glass p-8 rounded-[2.5rem] border-emerald-500/20 dark:border-emerald-500/30 group bg-white/40 dark:bg-emerald-950/40 backdrop-blur-xl shadow-xl hover:shadow-emerald-500/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-inner">
                {f.icon}
              </div>
              <h3
                className={`text-2xl font-bold mb-3 text-emerald-950 dark:text-emerald-50 ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
              >
                {t(f.titleEn, f.titleUr)}
              </h3>
              <p
                className={`text-emerald-800/80 dark:text-emerald-100/70 leading-relaxed ${lang === "ur" ? "font-urdu text-xl" : ""}`}
              >
                {t(f.descEn, f.descUr)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] border-emerald-500/10 bg-gradient-to-r from-emerald-900/20 via-transparent to-transparent backdrop-blur-md">
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
      <div className="min-h-screen flex flex-col items-center p-6 md:p-12 relative overflow-hidden bg-emerald-50 dark:bg-[#001a0f]">
        
        {/* --- EYE-CATCHING BACKGROUND ELEMENTS --- */}
        {/* 1. Subtle Architectural Image Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1590674852885-ce1495b9830b?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* 2. Animated Mesh Gradients (Floating Glows) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[100px]" />
        
        {/* 3. Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full text-center space-y-12 relative z-10"
        >
          {/* 1. HERO TITLE */}
          <h1
            className={`
              text-center font-black tracking-tighter uppercase 
              text-[42px] xs:text-[60px] md:text-[95px] 
              ${lang === "ur" ? "leading-[1.8] py-10 drop-shadow-2xl" : "leading-[0.85]"} 
              mt-12 bg-clip-text text-transparent 
              bg-gradient-to-b from-emerald-950 via-emerald-700 to-emerald-900 
              dark:from-white dark:via-emerald-100 dark:to-emerald-500 
              filter drop-shadow-sm
            `}
          >
            {t(
              "What do you need help with?",
              "آپ کو کس چیز میں مدد کی ضرورت ہے؟",
            )}
          </h1>

          {/* 2. SEARCH BAR with Shadow Glow */}
          <div className="max-w-2xl mx-auto relative z-40">
            <div className="absolute inset-y-0 left-6 flex items-center">
              <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search for a service...", "خدمت تلاش کریں...")}
              className="h-16 pl-16 pr-8 text-xl rounded-2xl border-none shadow-2xl bg-white/80 dark:bg-emerald-900/50 dark:text-white backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all"
            />
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full left-0 right-0 mt-4 glass rounded-[2rem] border-emerald-500/30 shadow-2xl overflow-hidden p-4 z-50 bg-white/90 dark:bg-[#002b1a]/95 backdrop-blur-2xl"
                >
                  {filteredServices.map((service) => (
                    <Link key={service.id} href={`/guidance/${service.id}`}>
                      <div className="p-4 hover:bg-emerald-500/10 rounded-2xl cursor-pointer flex justify-between items-center text-left transition-colors">
                        <span className="font-bold text-lg text-emerald-950 dark:text-emerald-50">
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

          {/* 3. MISSION DESCRIPTION */}
          <div className="max-w-4xl mx-auto">
            <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/20 dark:border-emerald-500/20 shadow-2xl relative overflow-hidden bg-white/30 dark:bg-emerald-950/20 backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
              <p
                className={`
                text-center leading-relaxed font-bold
                ${lang === "ur" ? "font-urdu text-2xl md:text-4xl leading-[1.8] text-emerald-950 dark:text-emerald-50" : "text-xl md:text-2xl tracking-tight text-emerald-900 dark:text-emerald-100"}
              `}
              >
                {t(
                  "E-Sarkari Rehnuma is your digital companion for navigating public services. We simplify government and hospital procedures with clear, step-by-step instructions.",
                  "ای-سرکاری رہنما عوامی خدمات حاصل کرنے کے لیے آپ کا ڈیجیٹل ساتھی ہے۔ ہم واضح اور مرحلہ وار ہدایات فراہم کر کے سرکاری دستاویزات اور ہسپتال کے طریقہ کار کی پیچیدگیوں کو آسان بناتے ہیں۔",
                )}
              </p>
            </div>
          </div>

          {/* 4. MAIN CATEGORY CARDS with Hover Glow */}
          <div className="grid md:grid-cols-2 gap-10">
            <Link href="/services/hospital">
              <motion.div whileHover={{ scale: 1.02, rotate: 1 }}>
                <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-white/20 dark:border-emerald-500/20 cursor-pointer rounded-[3rem] bg-white/40 dark:bg-emerald-900/20 backdrop-blur-xl shadow-2xl transition-all">
                  <CardContent className="flex flex-col items-center gap-6 p-10">
                    <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-xl">
                      <Stethoscope className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <span className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white">
                      {t("Hospital Services", "ہسپتال کی خدمات")}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link href="/services/government">
              <motion.div whileHover={{ scale: 1.02, rotate: -1 }}>
                <Card className="glass h-80 md:h-96 flex items-center justify-center relative overflow-hidden group border-white/20 dark:border-emerald-500/20 cursor-pointer rounded-[3rem] bg-white/40 dark:bg-emerald-900/20 backdrop-blur-xl shadow-2xl transition-all">
                  <CardContent className="flex flex-col items-center gap-6 p-10">
                    <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-xl">
                      <Landmark className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <span className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white">
                      {t("Government Services", "حکومتی خدمات")}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </div>

          {/* 5. WHY E-REHNUMA SECTION Heading */}
          <div className="pt-24 pb-12 text-center relative">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-emerald-600 dark:text-emerald-400 text-sm font-black uppercase tracking-[0.4em] mb-4 block"
            >
              {t("The Digital Revolution", "ڈیجیٹل انقلاب")}
            </motion.span>

            <h2
              className={`
              font-black tracking-tighter uppercase 
              text-[50px] md:text-[85px] leading-none
              text-emerald-950 dark:text-white drop-shadow-sm
              ${lang === "ur" ? "font-urdu py-6" : ""}
            `}
            >
              {t("Why E-Rehnuma?", "ای-رہنما کیوں؟")}
            </h2>

            <div className="flex justify-center gap-2 mt-6">
              <div className="h-3 w-24 bg-emerald-600 rounded-full shadow-[0_0_30px_rgba(5,150,105,0.6)]" />
              <div className="h-3 w-6 bg-emerald-600/40 rounded-full" />
              <div className="h-3 w-3 bg-emerald-600/20 rounded-full" />
            </div>
          </div>

          <ProjectHighlights />
        </motion.div>
      </div>
    </PageLayout>
  );
}
