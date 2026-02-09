import { useState } from "react";
import { MapPin, Navigation, Info } from "lucide-react";
import { karachiDistricts } from "@/lib/karachiData";
import { useLanguage } from "@/lib/LanguageContext";

export function DistrictFinder() {
  const { t, lang } = useLanguage();
  const [selectedArea, setSelectedArea] = useState("");

  const foundDistrict = karachiDistricts.find((d) =>
    d.areas.some((area) => area.toLowerCase() === selectedArea.toLowerCase()),
  );

  return (
    <div className="glass p-6 rounded-[2.5rem] border-primary/20 space-y-6">
      <div className="space-y-2">
        <h3
          className={`text-xl font-black ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
        >
          {t("Find Your DC Office", "اپنا ڈی سی آفس تلاش کریں")}
        </h3>
        <p className="text-emerald-950 dark:text-emerald-100">
          {t(
            "Select or type your neighborhood in Karachi",
            "کراچی میں اپنا علاقہ منتخب کریں",
          )}
        </p>
      </div>

      <select
        onChange={(e) => setSelectedArea(e.target.value)}
        className="w-full h-14 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl px-4 text-emerald-950 dark:text-emerald-50 outline-none focus:border-primary transition-all"
      >
        <option value="">
          {t("-- Select Area --", "-- علاقہ منتخب کریں --")}
        </option>
        {karachiDistricts
          .flatMap((d) => d.areas)
          .sort()
          .map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
      </select>

      {foundDistrict && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                {t("Assigned District", "مختص شدہ ضلع")}
              </p>
              <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">{foundDistrict.name}</h4>
              <p className="text-sm text-emerald-800/70 dark:text-emerald-100/70">{foundDistrict.office}</p>
              <p className="text-xs text-emerald-800/40 dark:text-emerald-100/40 italic">
                {foundDistrict.address}
              </p>
            </div>
          </div>

          <a
            href={foundDistrict.maps}
            target="_blank"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-black font-black py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Navigation className="w-4 h-4 fill-current" />
            {t("Open in Google Maps", "گوگل میپس پر دیکھیں")}
          </a>
        </div>
      )}
    </div>
  );
}
