import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { Clock, Calendar, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineItem {
  labelEn: string;
  labelUr: string;
  icon: any;
  timeEn?: string;
  timeUr?: string;
}

interface ServiceTimelineProps {
  type: string;
  serviceId?: string;
}

export function ServiceTimeline({ type, serviceId }: ServiceTimelineProps) {
  const { t, lang } = useLanguage();

  const isHospital = type === "hospital";
  
  const hospitalFlow: TimelineItem[] = [
    { labelEn: "Entry Gate", labelUr: "داخلی راستہ", icon: Info },
    { labelEn: "Token Counter", labelUr: "ٹوکن کاؤنٹر", icon: Clock, timeEn: "Closes 11:30 AM", timeUr: "11:30 بجے بند" },
    { labelEn: "Vitals Check", labelUr: "معائنہ", icon: CheckCircle2 },
    { labelEn: "OPD Waiting", labelUr: "انتظار گاہ", icon: Clock, timeEn: "30-60 mins", timeUr: "30-60 منٹ" },
    { labelEn: "Pharmacy", labelUr: "فارمیسی", icon: CheckCircle2 },
  ];

  const legalFlow: TimelineItem[] = [
    { labelEn: "Preparation", labelUr: "تیاری", icon: Info },
    { labelEn: "Bank Challan", labelUr: "بینک چالان", icon: Calendar, timeEn: "1 Day", timeUr: "1 دن" },
    { labelEn: "Biometrics", labelUr: "بایومیٹرک", icon: Info },
    { labelEn: "Verification", labelUr: "تصدیق", icon: Calendar, timeEn: "15-20 Days", timeUr: "15-20 دن" },
  ];

  const flow = isHospital ? hospitalFlow : legalFlow;

  return (
    <Card className="glass border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {isHospital ? (
            <>
              <Clock className="w-6 h-6 text-primary" />
              {t("Patient Visit Flow", "مریض کی آمد کا طریقہ کار")}
            </>
          ) : (
            <>
              <Calendar className="w-6 h-6 text-primary" />
              {t("Process Tracker", "مراحل کی تفصیل")}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col gap-6">
          {/* Vertical Line */}
          <div className="absolute left-[1.65rem] top-2 bottom-2 w-0.5 bg-primary/20" />
          
          {flow.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <div className="z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-background border-2 border-primary/30 text-primary shadow-sm shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="pt-2 flex-1">
                <p className="text-lg font-bold leading-none">
                  {t(item.labelEn, item.labelUr)}
                </p>
                {item.timeEn && item.timeUr && (
                  <p className="text-sm text-primary font-semibold mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t(item.timeEn, item.timeUr)}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isHospital && (
          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-bold text-orange-500 uppercase tracking-wider block mb-1">
                  {t("Pro Tip: Token Closing", "ضروری مشورہ: ٹوکن کا وقت")}
                </span>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {t(
                    "Govt OPD tokens strictly close at 11:00 AM. Arrive by 7:30 AM to stand in line. You MUST have your original CNIC to get a token.",
                    "سرکاری او پی ڈی ٹوکن صبح 11:00 بجے سختی سے بند ہو جاتے ہیں۔ صبح 7:30 بجے تک پہنچیں۔ ٹوکن کے لیے اصل شناختی کارڈ لازمی ہے۔"
                  )}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-bold text-blue-500 uppercase tracking-wider block mb-1">
                  {t("Emergency (ER) Specifics", "ایمرجنسی (ER) کی تفصیلات")}
                </span>
                <div className="space-y-2 text-muted-foreground font-medium text-xs md:text-sm">
                  <p>
                    <strong>JPMC (Jinnah):</strong> {t("For Heart Attack, go directly to NICVD building, not main ER.", "دل کے دورے کی صورت میں براہ راست NICVD بلڈنگ جائیں۔")}
                  </p>
                  <p>
                    <strong>Civil Hospital:</strong> {t("For burn injuries, go straight to the Burns Centre separate entrance.", "جھلسنے کی صورت میں براہ راست برنز سینٹر کے الگ داخلے پر جائیں۔")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
