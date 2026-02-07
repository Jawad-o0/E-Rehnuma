import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Bot,
  Mic,
  MicOff,
  X,
  MessageCircle,
  ExternalLink,
  Info,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  content: string;
  actions?: { label: string; url: string; icon: any }[];
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function Chatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: t(
        "Hello! I am your E-Sarkari Assistant. I can provide deep details on NADRA, Passports, and Hospital SOPs. How can I guide you?",
        "سلام! میں آپ کا ای-سرکاری مددگار ہوں۔ میں نادرا، پاسپورٹ اور ہسپتال کے طریقہ کار پر تفصیلی معلومات دے سکتا ہوں۔ میں آپ کی کیا مدد کروں؟",
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(0.85);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. WAKE UP THE VOICE ENGINE (Fixes Robotic Voice)
  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 2. SPEECH RECOGNITION (ur-PK Fix)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setTimeout(() => handleSend(transcript), 600);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else if (recognitionRef.current) {
      recognitionRef.current.lang = lang === "ur" ? "ur-PK" : "en-US";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // 3. SMART VOICE ENGINE (Finds Natural Voices)
  const speak = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    let selectedVoice;
    if (lang === "ur") {
      selectedVoice =
        voices.find(
          (v) => v.lang.includes("ur") && v.name.includes("Google"),
        ) || voices.find((v) => v.lang.includes("ur"));
      utterance.pitch = 1.05;
    } else {
      selectedVoice =
        voices.find(
          (v) =>
            v.lang.includes("en") &&
            (v.name.includes("Natural") || v.name.includes("Google")),
        ) || voices.find((v) => v.lang.includes("en"));
      utterance.pitch = 1.0;
    }

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = lang === "ur" ? "ur-PK" : "en-US";
    utterance.rate = voiceSpeed;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    const lowerInput = messageText.toLowerCase();
    const day = new Date().getDay();
    let reply = "";
    let actions: Message["actions"] = [];

    // --- BRAIN LOGIC ---
    if (lowerInput.includes("domicile") || lowerInput.includes("ڈومیسائل")) {
      reply = t(
        "DOMICILE (Karachi): Managed by Sindh Govt. IMPORTANT: Karachi is district-based. Please use the 'District Finder' tool on the Domicile page to find your specific DC Office. You will need: Form P/D, 2 Karachi utility bills (K-Electric/SSGC), and Police verification.",
        "ڈومیسائل (کراچی): سندھ حکومت کے تحت ہے۔ اہم: کراچی اضلاع میں منقسم ہے۔ اپنے متعلقہ ڈی سی آفس کو تلاش کرنے کے لیے ڈومیسائل پیج پر 'District Finder' ٹول استعمال کریں۔ آپ کو فارم P/D، کراچی کے 2 بل (کے الیکٹرک/ایس ایس جی سی)، اور پولیس تصدیق کی ضرورت ہو گی۔"
      );
    } else if (
      lowerInput.includes("nadra") ||
      lowerInput.includes("cnic") ||
      lowerInput.includes("نادرا")
    ) {
      reply =
        lowerInput.includes("lost") || lowerInput.includes("گم")
          ? t(
              "LOST CNIC: No FIR needed. Visit NADRA with your old CNIC number for fingerprints.",
              "گمشدہ کارڈ: ایف آئی آر کی ضرورت نہیں۔ پرانا نمبر لے کر نادرا جائیں اور فنگر پرنٹس دیں۔",
            )
          : t(
              "NADRA: Bring original documents. Use 'Pak ID' app for renewals to avoid lines.",
              "نادرا: اصل دستاویزات لائیں۔ لائنوں سے بچنے کے لیے 'Pak ID' ایپ استعمال کریں۔",
            );
      actions = [
        {
          label: "Pak-ID",
          url: "https://id.nadra.gov.pk/",
          icon: ExternalLink,
        },
      ];
    } else if (
      lowerInput.includes("passport") ||
      lowerInput.includes("پاسپورٹ")
    ) {
      reply = t(
        "PASSPORT: Pay via 'Passport Fee Asaan' App first. Visit with CNIC at 8:00 AM.",
        "پاسپورٹ: پہلے ایپ سے فیس بھریں۔ صبح 8 بجے اصل شناختی کارڈ کے ساتھ دفتر پہنچیں۔",
      );
      actions = [
        { label: "Fee App", url: "https://onlinelpp.dgip.gov.pk/", icon: Info },
      ];
    } else if (lowerInput.includes("opd") || lowerInput.includes("ہسپتال")) {
      const time = day === 5 ? "8 AM - 1 PM" : "8 AM - 3 PM";
      reply = t(
        `HOSPITAL: OPD is open ${time}. For surgeries, use Sehat Card (SMS CNIC to 8500).`,
        `ہسپتال: او پی ڈی ${time} تک ہے۔ علاج کے لیے صحت کارڈ استعمال کریں (8500 پر ایس ایم ایس کریں)۔`,
      );
    }

    if (!reply)
      reply = t(
        "I can help with NADRA, Passports, and Hospital SOPs. What do you need?",
        "میں نادرا، پاسپورٹ اور ہسپتال کے بارے میں بتا سکتا ہوں۔ آپ کو کیا معلومات چاہیے؟",
      );

    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageText },
      { role: "bot", content: reply, actions },
    ]);
    setInput("");
    speak(reply);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Changed bottom-6 to bottom-24 to clear the Emergency Bar
        className="fixed bottom-24 right-6 h-14 w-14 md:h-16 md:w-16 bg-primary rounded-full shadow-2xl z-50 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 border-4 border-white/10"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            // Make sure this is bottom-36 (or slightly above the button)
            // so the window looks like it's floating perfectly above the bar.
            className="fixed bottom-36 right-4 left-4 md:left-auto md:right-6 md:w-[400px] h-[580px] md:h-[680px] z-50"
          >
            <Card className="glass border-primary/20 shadow-2xl h-full flex flex-col overflow-hidden rounded-[2.5rem]">
              {/* Header */}
              <div className="p-4 border-b border-primary/10 bg-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span className="font-black text-sm uppercase tracking-tighter">
                    {t("Rehnuma AI", "رہنما مددگار")}
                  </span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-primary"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Chat Content */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                <div className="mb-4 p-6 rounded-[2rem] bg-primary/5 border border-primary/10 text-center">
                  <h4
                    className={`text-xl font-black ${lang === "ur" ? "font-urdu text-3xl" : ""}`}
                  >
                    {t("Official Digital Guide", "سرکاری ڈیجیٹل رہنما")}
                  </h4>
                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40 mt-1">
                    {t("Verified 2026", "تصدیق شدہ 2026")}
                  </p>
                </div>

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-white rounded-tr-none shadow-lg" : "glass border-primary/10 rounded-tl-none"}`}
                    >
                      {msg.content}
                    </div>
                    {msg.actions && (
                      <div className="flex gap-2 mt-2">
                        {msg.actions.map((act, idx) => (
                          <a
                            key={idx}
                            href={act.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase text-primary hover:bg-primary hover:text-black transition-all"
                          >
                            <act.icon className="w-3 h-3" /> {act.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isListening && (
                  <div className="flex items-center gap-1.5 p-3 glass rounded-2xl w-fit">
                    {[1, 2, 3].map((b) => (
                      <motion.div
                        key={b}
                        animate={{ height: [6, 18, 6] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: b * 0.1,
                        }}
                        className="w-1 bg-primary rounded-full"
                      />
                    ))}
                    <span className="text-[10px] font-bold ml-2 text-primary uppercase">
                      {t("Listening...", "سن رہا ہے...")}
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Footer with Speed Slider */}
              <div className="p-4 bg-background/50 border-t border-primary/10 space-y-3">
                <div className="flex items-center justify-between px-3 py-1.5 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="text-[9px] font-black text-primary uppercase tracking-tighter">
                    {t("Voice Speed", "آواز کی رفتار")}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/30 italic">
                      {voiceSpeed.toFixed(1)}x
                    </span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={voiceSpeed}
                      onChange={(e) =>
                        setVoiceSpeed(parseFloat(e.target.value))
                      }
                      className="w-20 h-1 accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={toggleListening}
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full shrink-0"
                  >
                    {isListening ? <MicOff /> : <Mic />}
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder={t("Ask me anything...", "کچھ بھی پوچھیں...")}
                    className="h-12 rounded-full glass border-primary/20"
                  />
                  <Button
                    onClick={() => handleSend()}
                    size="icon"
                    className="h-12 w-12 rounded-full shrink-0"
                  >
                    <Send />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
