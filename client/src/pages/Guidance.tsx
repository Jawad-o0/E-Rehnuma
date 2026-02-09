import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Volume2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { useState, useEffect } from "react";
import { Chatbot } from "@/components/Chatbot";
import { SiWhatsapp } from "react-icons/si";
import { DistrictFinder } from "@/components/DistrictFinder";
import { ServiceTimeline } from "@/components/ServiceTimeline";

export default function Guidance() {
  const [match, params] = useRoute("/guidance/:id");
  const id = params?.id;
  const { t, lang, isElderly } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Reset checked items when service changes
    setCheckedItems({});
  }, [id]);

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await fetch(`/api/services/${id}`);
      if (!res.ok) throw new Error("Failed to fetch service details");
      return res.json();
    },
    enabled: !!id,
  });

  const handleUrduSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    const runSpeech = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ur-PK";
      const voices = synth.getVoices();
      const urduVoice = voices.find((v) => v.lang.includes("ur")) || voices[0];
      utterance.voice = urduVoice;
      synth.cancel();
      synth.speak(utterance);
    };

    if (synth.onvoiceschanged !== undefined && synth.getVoices().length === 0) {
      synth.onvoiceschanged = () => {
        runSpeech();
        synth.onvoiceschanged = null;
      };
    } else {
      runSpeech();
    }
  };

  const shareOnWhatsapp = () => {
    if (!service) return;
    const title = t(service.titleEn, service.titleUr);
    const stepsText = service.steps
      .map((s: any) => `${s.stepNumber}. ${t(s.titleEn, s.titleUr)}`)
      .join("\n");
    const message = `*${title} - E-Sarkari Rehnuma*\n\n${stepsText}\n\n${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const speakStep = (step: any) => {
    if (!step) return;
    const text = `${t(step.titleEn, step.titleUr)}. ${t(step.descriptionEn, step.descriptionUr)}`;
    if (lang === "ur") {
      handleUrduSpeech(text);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakAllSteps = () => {
    if (!service?.steps) return;
    const allText = service.steps
      .map(
        (step: any) =>
          `${t(step.titleEn, step.titleUr)}. ${t(step.descriptionEn, step.descriptionUr)}`,
      )
      .join(". ... ");
    if (lang === "ur") {
      handleUrduSpeech(allText);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(allText);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) return <div>Service not found</div>;

  const steps = service.steps || [];
  const currentStep = steps[currentStepIndex];
  const checklist = lang === "en" ? service.checklistEn : service.checklistUr;

  return (
    <PageLayout>
      <div className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <Link href={`/services/${service.type}`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 glass rounded-2xl flex-shrink-0"
                >
                  <ArrowLeft
                    className={`h-8 w-8 ${lang === "ur" ? "rotate-180" : ""}`}
                  />
                </Button>
              </Link>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight flex-1 text-slate-900 dark:text-white">
                {t(service.titleEn, service.titleUr)}
              </h1>
            </div>
            <div className="w-full md:w-auto flex justify-center">
              <Button
                size="lg"
                variant="outline"
                className="glass rounded-full px-8 h-14 text-green-600 border-green-600/20 hover:bg-green-600/10 shadow-lg"
                onClick={shareOnWhatsapp}
              >
                <SiWhatsapp className="w-6 h-6 mr-2" />
                {t("Share on WhatsApp", "واٹس ایپ پر شیئر کریں")}
              </Button>
            </div>
          </div>

          {(id === "10" || service.titleEn.toLowerCase().includes("domicile")) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <DistrictFinder />
            </motion.div>
          )}

          {checklist && checklist.length > 0 && !isElderly && (
            <div className="space-y-6">
              <Card className="glass border-primary/20 bg-primary/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  <ClipboardList className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl font-bold">
                    {t("Required Documents", "ضروری دستاویزات")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {checklist.map((item: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => toggleCheck(i)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                          checkedItems[i] 
                            ? "bg-primary/20 border-primary shadow-inner" 
                            : "bg-background/40 border-primary/10 hover:border-primary/30"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          checkedItems[i] ? "bg-primary border-primary" : "border-primary/30"
                        }`}>
                          {checkedItems[i] && <CheckCircle2 className="w-5 h-5 text-primary-foreground" />}
                        </div>
                        <span className={`text-lg font-medium ${checkedItems[i] ? "line-through opacity-70" : ""}`}>
                          {item.replace(/\*\*/g, "")}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="glass rounded-full px-8 h-14 shadow-lg"
                  onClick={speakAllSteps}
                >
                  <Volume2 className="w-6 h-6 mr-2" />
                  {t("Listen All Steps", "تمام مراحل سنیں")}
                </Button>
              </div>
            </div>
          )}

          <div className="relative">
            {isElderly ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  className="space-y-8"
                >
                  <Card className="glass p-12 shadow-2xl min-h-[400px] flex flex-col justify-center border-primary/30">
                    <CardContent className="space-y-10 text-center">
                      <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-primary text-primary-foreground mx-auto font-black text-5xl">
                        {currentStepIndex + 1}
                      </div>
                      <div className="space-y-6">
                        {currentStep.imagePath && (
                          <div className="mx-auto w-full max-w-md aspect-video rounded-3xl overflow-hidden border-4 border-primary/20 bg-muted mb-8">
                            <img
                              src={currentStep.imagePath}
                              alt={currentStep.titleEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                          {t(currentStep.titleEn, currentStep.titleUr)}
                        </h3>
                        <p className="text-3xl text-slate-600 dark:text-muted-foreground leading-relaxed font-semibold">
                          {t(
                            currentStep.descriptionEn,
                            currentStep.descriptionUr,
                          )}
                        </p>
                        <div className="pt-6">
                          <Button
                            size="lg"
                            variant="outline"
                            className="glass rounded-full px-8 h-16 text-2xl mx-auto"
                            onClick={() => speakStep(currentStep)}
                          >
                            <Volume2 className="w-8 h-8 mr-3" />
                            {t("Listen Step", "مرحلہ سنیں")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between gap-6">
                    <Button
                      disabled={currentStepIndex === 0}
                      onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                      size="lg"
                      className="flex-1 h-24 text-3xl rounded-3xl glass shadow-lg"
                    >
                      <ChevronLeft
                        className={`w-10 h-10 mr-4 ${lang === "ur" ? "rotate-180" : ""}`}
                      />
                      {t("Previous", "پیچھے")}
                    </Button>
                    {currentStepIndex < steps.length - 1 ? (
                      <Button
                        onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                        size="lg"
                        className="flex-1 h-24 text-3xl rounded-3xl shadow-primary/20 shadow-lg"
                      >
                        {t("Next", "آگے")}
                        <ChevronRight
                          className={`w-10 h-10 ml-4 ${lang === "ur" ? "rotate-180" : ""}`}
                        />
                      </Button>
                    ) : (
                      <Link href="/" className="flex-1">
                        <Button
                          size="lg"
                          className="w-full h-24 text-3xl rounded-3xl bg-green-600 hover:bg-green-700 shadow-lg"
                        >
                          {t("Finish", "ختم کریں")}
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {steps.map((step: any, index: number) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass relative overflow-hidden group border-primary/10 shadow-lg">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
                        <CardContent className="p-10 flex flex-col md:flex-row gap-8">
                          {step.imagePath && (
                            <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden border-2 border-primary/10 bg-muted flex-shrink-0">
                              <img
                                src={step.imagePath}
                                alt={step.titleEn}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex gap-8 flex-1">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary border border-primary/30 font-black text-2xl">
                                {step.stepNumber}
                              </div>
                            </div>
                            <div className="space-y-3 pt-2">
                              <h3 className="text-2xl font-black text-slate-900 dark:text-foreground tracking-tight">
                                {t(step.titleEn, step.titleUr)}
                              </h3>
                              <p className="text-xl text-slate-600 dark:text-muted-foreground leading-relaxed font-medium">
                                {t(step.descriptionEn, step.descriptionUr)}
                              </p>
                              <div className="pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="glass rounded-full px-4"
                                  onClick={() => speakStep(step)}
                                >
                                  <Volume2 className="w-4 h-4 mr-2" />
                                  {t("Listen Step", "مرحلہ سنیں")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="lg:col-span-1 space-y-8">
                  <div className="sticky top-24 space-y-8">
                    <ServiceTimeline type={service.type} serviceId={id} />
                    <Chatbot />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- COMMON MISTAKES COMPONENT START --- */}
          <div className="mt-10 p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 glass relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full"></div>
            <h4 className="text-yellow-500 font-bold mb-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <span
                className={
                  lang === "ur"
                    ? "font-urdu text-2xl"
                    : "tracking-tight text-lg"
                }
              >
                {lang === "ur"
                  ? "عام غلطیاں جن سے بچنا ضروری ہے"
                  : "Common Mistakes to Avoid"}
              </span>
            </h4>

            <ul
              className={`space-y-4 text-sm relative z-10 ${lang === "ur" ? "font-urdu leading-[2.2] text-right" : "text-left"}`}
            >
              {(id === "1" ||
                id === "2" ||
                id === "3" ||
                id === "4" ||
                id === "5" ||
                id === "6") && (
                <>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "ٹیسٹ سے 8-12 گھنٹے پہلے کچھ نہ کھائیں (اگر روزہ ضروری ہو)"
                        : "Do not eat 8-12 hours before tests if fasting is required."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "اپنی تمام سابقہ میڈیکل رپورٹس اور ادویات کی لسٹ ساتھ لائیں"
                        : "Bring all previous medical reports and a list of current medications."}
                    </span>
                  </li>
                </>
              )}

              {(id === "7" || id === "8") && (
                <>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "تصویر کے لیے سفید یا بہت ہلکے رنگ کے کپڑے نہ پہنیں"
                        : "Avoid wearing white or very light-colored clothing for official photos."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "اصل زائد المیعاد شناختی کارڈ ساتھ رکھنا لازمی ہے"
                        : "It is mandatory to bring your original expired CNIC."}
                    </span>
                  </li>
                </>
              )}

              {(id === "9" || id === "10") && (
                <>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "گواہان کے شناختی کارڈ کی کاپیاں پہلے سے تیار رکھیں"
                        : "Keep copies of witnesses' CNICs ready beforehand."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "یونین کونسل کے ریکارڈ میں نام کے ہجے (Spellings) چیک کر لیں"
                        : "Verify name spellings in the Union Council records before final submission."}
                    </span>
                  </li>
                </>
              )}

              {(id === "11" || id === "12") && (
                <>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "بایومیٹرک کے لیے خریدار اور بیچنے والے دونوں کا ہونا ضروری ہے"
                        : "Both buyer and seller must be present for biometric verification."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 justify-end md:justify-start">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      {lang === "ur"
                        ? "ٹریفک چالان کی تمام پچھلی رسیدیں کلیئر ہونی چاہئیں"
                        : "Ensure all previous traffic fine receipts are cleared in the system."}
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* --- COMMON MISTAKES COMPONENT END --- */}
        </div>
      </div>
    </PageLayout>
  );
}
