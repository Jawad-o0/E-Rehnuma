import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { type Service } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Stethoscope,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import SymptomChecker from "@/components/SymptomChecker";

export default function ServiceList() {
  const [match, params] = useRoute("/services/:type");
  const type = params?.type;
  const { t, lang } = useLanguage();

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const filteredServices = services?.filter((s) => s.type === type) || [];

  // Dynamic Header Content
  const isHospital = type === "hospital";
  const Icon = isHospital ? Stethoscope : Landmark;
  const title = isHospital
    ? t("Hospital Services", "ہسپتال کی خدمات")
    : t("Government Services", "حکومتی خدمات");

  return (
    <PageLayout>
      <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-12">
        {/* Back Button & Title */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="glass rounded-2xl h-14 w-14"
            >
              <ArrowLeft
                className={`h-6 w-6 ${lang === "ur" ? "rotate-180" : ""}`}
              />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/20 text-primary">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>

        {/* --- SMART INJECTION: Symptom Checker only for Hospitals --- */}
        {isHospital && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-2">
              <SymptomChecker t={t} />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold opacity-50 uppercase tracking-widest">
                {t(
                  "Or Browse All Medical Guides",
                  "یا تمام طبی رہنمائی دیکھیں",
                )}
              </h3>
            </div>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/guidance/${service.id}`}>
                <Card className="glass group cursor-pointer border-white/5 hover:border-primary/40 transition-all duration-500 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="space-y-2">
                      <h3
                        className={`text-2xl font-bold group-hover:text-primary transition-colors text-slate-900 dark:text-white ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
                      >
                        {t(service.titleEn, service.titleUr)}
                      </h3>
                      <p
                        className={`text-slate-600 dark:text-muted-foreground line-clamp-2 ${lang === "ur" ? "font-urdu text-lg" : ""}`}
                      >
                        {t(service.descriptionEn, service.descriptionUr)}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      <ChevronRight
                        className={`w-6 h-6 ${lang === "ur" ? "rotate-180" : ""}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
