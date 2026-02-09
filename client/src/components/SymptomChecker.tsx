import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Volume2, Search, Phone, MapPin } from "lucide-react";

const SymptomChecker = ({ t }: { t: (en: string, ur: string) => string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<any>(null);

  const data = {
    "Dil mein dard (Chest Pain)": {
      dept: "Cardiology (دل کا شعبہ)",
      govt: "NICVD",
      govtPhone: "02199201271",
      govtMap: "https://www.google.com/maps/search/NICVD+Karachi",
      private: "Tabba Heart",
      privatePhone: "021111844844",
      privateMap:
        "https://www.google.com/maps/search/Tabba+Heart+Institute+Karachi",
    },
    "Hadi ya Jor ka masla (Bone/Joint)": {
      dept: "Orthopedics (ہڈیوں کا شعبہ)",
      govt: "JPMC (Jinnah Hospital)",
      govtPhone: "02199201300",
      govtMap: "https://www.google.com/maps/search/JPMC+Karachi",
      private: "Liaquat National",
      privatePhone: "02134412526",
      privateMap:
        "https://www.google.com/maps/search/Liaquat+National+Hospital+Karachi",
    },
    "Gurday ka masla (Kidney Issue)": {
      dept: "Nephrology (گردوں کا شعبہ)",
      govt: "SIUT",
      govtPhone: "021111000313",
      govtMap: "https://www.google.com/maps/search/SIUT+Karachi",
      private: "The Kidney Centre",
      privatePhone: "02135831082",
      privateMap:
        "https://www.google.com/maps/search/The+Kidney+Centre+Karachi",
    },
    "Danto ka dard / Masooray (Dental)": {
      dept: "Dentistry (دانتوں کا شعبہ)",
      govt: "Sindh Govt Dental",
      govtPhone: "02199215740",
      govtMap:
        "https://www.google.com/maps/search/Sindh+Government+Dental+Hospital+Karachi",
      private: "Fatima Jinnah Dental",
      privatePhone: "02135111963",
      privateMap:
        "https://www.google.com/maps/search/Fatima+Jinnah+Dental+College+Hospital",
    },
    "Aankhon ka masla (Eye Issue)": {
      dept: "Ophthalmology (آنکھوں کا شعبہ)",
      govt: "Civil Hospital Eye Ward",
      govtPhone: "02199215740",
      govtMap: "https://www.google.com/maps/search/Civil+Hospital+Karachi",
      private: "LRBT Eye Hospital",
      privatePhone: "02132432801",
      privateMap: "https://www.google.com/maps/search/LRBT+Korangi+Karachi",
    },
    "Gala, Naak, Kaan (ENT)": {
      dept: "ENT Department (ناک، کان، گلے کا شعبہ)",
      govt: "Jinnah (JPMC) ENT",
      govtPhone: "02199201300",
      govtMap: "https://www.google.com/maps/search/JPMC+Karachi+ENT+Ward",
      private: "Dow University Hospital",
      privatePhone: "021111362111",
      privateMap:
        "https://www.google.com/maps/search/Dow+University+Hospital+Karachi",
    },
    "Sugar ka masla (Diabetes)": {
      dept: "Endocrinology (شوگر کا شعبہ)",
      govt: "Baqai Institute (NIDE)",
      govtPhone: "02199261271",
      govtMap:
        "https://www.google.com/maps/search/Baqai+Institute+of+Diabetology+Karachi",
      private: "Aga Khan Hospital",
      privatePhone: "021111911911",
      privateMap:
        "https://www.google.com/maps/search/Aga+Khan+University+Hospital+Karachi",
    },
    "Jild ki kharish / Daane (Skin/Rash)": {
      dept: "Dermatology (جلد کا شعبہ)",
      govt: "Skin Ward - JPMC",
      govtPhone: "02199201300",
      govtMap: "https://www.google.com/maps/search/JPMC+Karachi+Skin+Ward",
      private: "Aga Khan Hospital",
      privatePhone: "021111911911",
      privateMap:
        "https://www.google.com/maps/search/Aga+Khan+Hospital+Karachi",
    },
    "Zehni dabao / Pareshani (Mental Health)": {
      dept: "Psychiatry (نفسیات کا شعبہ)",
      govt: "JPMC Psychiatry",
      govtPhone: "02199201300",
      govtMap: "https://www.google.com/maps/search/JPMC+Psychiatry+Ward",
      private: "Karwan-e-Hayat",
      privatePhone: "021111534111",
      privateMap: "https://www.google.com/maps/search/Karwan-e-Hayat+Karachi",
    },
    "Hadsati chot / Trauma (Emergency)": {
      dept: "Emergency / ER (ایمرجنسی)",
      govt: "Civil Trauma Centre",
      govtPhone: "02199215740",
      govtMap: "https://www.google.com/maps/search/SMBB+Trauma+Centre+Karachi",
      private: "Indus Hospital",
      privatePhone: "02135112709",
      privateMap:
        "https://www.google.com/maps/search/Indus+Hospital+Korangi+Karachi",
    },
    "Jal jana (Burn Injury)": {
      dept: "Burn Centre (جھلسنے کا شعبہ)",
      govt: "Civil Burn Centre",
      govtPhone: "02199215740",
      govtMap:
        "https://www.google.com/maps/search/Civil+Hospital+Burn+Centre+Karachi",
      private: "Patel Hospital",
      privatePhone: "021111174111",
      privateMap: "https://www.google.com/maps/search/Patel+Hospital+Karachi",
    },
    "Puranay zakham / Operation (Surgery)": {
      dept: "General Surgery (جنرل سرجری)",
      govt: "JPMC Surgery Ward",
      govtPhone: "02199201300",
      govtMap: "https://www.google.com/maps/search/JPMC+Surgery+Ward",
      private: "South City Hospital",
      privatePhone: "02135862301",
      privateMap:
        "https://www.google.com/maps/search/South+City+Hospital+Karachi",
    },
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ur-PK";
    window.speechSynthesis.speak(utterance);
  };

  const filteredSymptoms = Object.keys(data).filter((sym) =>
    sym.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto glass p-8 rounded-[2.5rem] border-primary/20 shadow-2xl mt-12 mb-12"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-lg">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">
          {t("Symptom Checker", "علامات کا معائنہ")}
        </h3>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-emerald-600/50" />
        </div>
        <input
          type="text"
          placeholder={t("Type your symptom...", "اپنی علامت لکھیں...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-12 pr-4 rounded-xl glass border-emerald-500/20 focus:ring-emerald-500/40 focus:border-emerald-500 bg-emerald-500/5 text-emerald-950 dark:text-emerald-50 text-lg shadow-inner"
        />
      </div>

      <select
        size={filteredSymptoms.length > 0 ? 5 : 1}
        onChange={(e) => {
          const selectedData = data[e.target.value];
          setResult(selectedData);
          if (selectedData)
            handleSpeak(`Aap ko ${selectedData.dept} mein jana chahiye`);
        }}
        className="w-full rounded-2xl glass border-emerald-500/20 focus:ring-emerald-500/40 focus:border-emerald-500 bg-emerald-500/5 text-emerald-950 dark:text-emerald-50 cursor-pointer overflow-hidden p-2"
      >
        <option value="" className="p-4 bg-white dark:bg-[#001a0f] text-emerald-600/50">
          -- {t("Select from matches", "نتائج میں سے منتخب کریں")} --
        </option>
        {filteredSymptoms.map((sym) => (
          <option
            key={sym}
            value={sym}
            className="p-4 bg-white dark:bg-[#001a0f] text-emerald-950 dark:text-emerald-50 hover:bg-emerald-500/10 transition-colors"
          >
            {sym}
          </option>
        ))}
      </select>

      {result && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-8 p-6 glass border-primary/30 rounded-3xl shadow-2xl space-y-6 bg-gradient-to-br from-primary/5 to-transparent"
        >
          <div className="text-left border-b border-emerald-500/10 pb-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">
                Recommended Dept
              </p>
              <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50">{result.dept}</p>
            </div>
            <button
              onClick={() =>
                handleSpeak(
                  `Aap ko ${result.dept} ke liye ${result.govt} ya ${result.private} jana chahiye`,
                )
              }
              className="p-4 bg-primary/20 hover:bg-primary/30 rounded-full text-primary transition-all active:scale-90"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Govt Option */}
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl shadow-sm">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-3 tracking-wider">
                Government (Free/Low Cost)
              </p>
              <p className="text-xl font-bold mb-4 text-emerald-950 dark:text-emerald-50">{result.govt}</p>
              <div className="flex gap-3">
                <a
                  href={`tel:${result.govtPhone}`}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 transition-all font-bold"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={result.govtMap}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl text-emerald-950 dark:text-emerald-50 transition-all font-bold"
                >
                  <MapPin className="w-4 h-4" /> Map
                </a>
              </div>
            </div>

            {/* Private Option */}
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl shadow-sm">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-3 tracking-wider">
                Private (Best Quality)
              </p>
              <p className="text-xl font-bold mb-4 text-emerald-950 dark:text-emerald-50">{result.private}</p>
              <div className="flex gap-3">
                <a
                  href={`tel:${result.privatePhone}`}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 transition-all font-bold"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={result.privateMap}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl text-emerald-950 dark:text-emerald-50 transition-all font-bold"
                >
                  <MapPin className="w-4 h-4" /> Map
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymptomChecker;
