import {
  Phone,
  Shield,
  Ambulance,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export function GlobalEmergencyBar() {
  const { t, lang, isElderly } = useLanguage();

  const contacts = [
    {
      num: "1122",
      label: "Rescue",
      ur: "ریسکیو",
      color: "bg-red-600",
      shadow: "shadow-red-900/40",
      icon: <Ambulance className={isElderly ? "w-6 h-6" : "w-4 h-4"} />,
    },
    {
      num: "15",
      label: "Police",
      ur: "پولیس",
      color: "bg-blue-600",
      shadow: "shadow-blue-900/40",
      icon: <Shield className={isElderly ? "w-6 h-6" : "w-4 h-4"} />,
    },
    {
      num: "115",
      label: "Edhi",
      ur: "ایدھی",
      color: "bg-green-600",
      shadow: "shadow-green-900/40",
      icon: <Phone className={isElderly ? "w-6 h-6" : "w-4 h-4"} />,
    },
  ];

  return (
    // Find the motion.div at the bottom of GlobalEmergencyBar.tsx and replace it with this:
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className={`
        fixed bottom-0 left-0 right-0 z-[40] 
        bg-[#001a0f]/80 backdrop-blur-md border-t border-emerald-500/20 
        ${isElderly ? "p-3 md:p-5" : "p-2 md:p-3"} 
        shadow-[0_-20px_50px_rgba(0,0,0,0.4)]
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Verification & Label (Hidden on small mobile to save space) */}
        <div className="hidden sm:flex flex-col items-start gap-1 px-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
              {t("Emergency Helplines", "ہنگامی ہیلپ لائنز")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
            <span className="text-[8px] font-bold text-green-500 uppercase tracking-tighter">
              {t("Verified 2026", "تصدیق شدہ 2026")}
            </span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="flex flex-1 md:flex-none justify-around md:justify-end gap-2 md:gap-4 w-full">
          {contacts.map((c) => (
            <motion.a
              key={c.num}
              href={`tel:${c.num}`}
              whileTap={{ scale: 0.9 }}
              className={`
                flex-1 md:flex-none flex items-center justify-center gap-2 
                ${isElderly ? "py-4 px-6 md:px-10" : "py-2.5 px-4"} 
                ${c.color} ${c.shadow} rounded-2xl md:rounded-full 
                text-white transition-all shadow-lg border border-white/10
              `}
            >
              {c.icon}
              <span
                className={`
                font-black uppercase tracking-widest 
                ${isElderly ? "text-base md:text-xl" : "text-xs"} 
                ${lang === "ur" ? "font-urdu tracking-normal" : ""}
              `}
              >
                {lang === "ur" ? c.ur : c.label}: {c.num}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
