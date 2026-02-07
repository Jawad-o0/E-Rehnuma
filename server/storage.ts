import { services, steps, type Service, type Step, type ServiceWithSteps, type InsertService, type InsertStep } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(type?: string): Promise<Service[]>;
  getService(id: number): Promise<ServiceWithSteps | undefined>;
  createService(service: InsertService): Promise<Service>;
  createStep(step: InsertStep): Promise<Step>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getServices(type?: string): Promise<Service[]> {
    if (type) {
      return await db.select().from(services).where(eq(services.type, type));
    }
    return await db.select().from(services);
  }

  async getService(id: number): Promise<ServiceWithSteps | undefined> {
    const serviceList = await db.select().from(services).where(eq(services.id, id));
    if (serviceList.length === 0) return undefined;

    const serviceSteps = await db.select().from(steps).where(eq(steps.serviceId, id)).orderBy(steps.stepNumber);

    return {
      ...serviceList[0],
      steps: serviceSteps,
    };
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async createStep(step: InsertStep): Promise<Step> {
    const [newStep] = await db.insert(steps).values(step).returning();
    return newStep;
  }

  async seed(): Promise<void> {
    const existing = await this.getServices();
    if (existing.length > 0) return;

    const addSvc = async (data: any, stepsData: { titleEn: string, titleUr: string, descEn: string, descUr: string, img?: string }[]) => {
      const svc = await this.createService(data as InsertService);
      for (let i = 0; i < stepsData.length; i++) {
        await this.createStep({
          serviceId: svc.id,
          stepNumber: i + 1,
          titleEn: stepsData[i].titleEn,
          titleUr: stepsData[i].titleUr,
          descriptionEn: stepsData[i].descEn,
          descriptionUr: stepsData[i].descUr,
          imagePath: stepsData[i].img || null,
        });
      }
    };

    // --- Hospital Services (Karachi Specific - JPMC/CHK/Indus) ---
    await addSvc({
      titleEn: "General OPD / Blood Test",
      titleUr: "جنرل او پی ڈی / خون کا ٹیسٹ",
      type: "hospital",
      icon: "Activity",
      descriptionEn: "Step-by-step guide for Karachi's major hospitals (JPMC, Civil Hospital, Indus).",
      descriptionUr: "کراچی کے بڑے ہسپتالوں (جناح، سول، انڈس) میں علاج کا طریقہ۔",
      checklistEn: ["**Original CNIC**", "**Doctor's Prescription**", "**Fasting (if required)**", "**Fee Receipt**"],
      checklistUr: ["**اصل شناختی کارڈ**", "**ڈاکٹر کی پرچی**", "**نہار منہ (اگر ضرورت ہو)**", "**فیس کی رسید**"],
      jurisdiction: "Health Department, Sindh",
      officeLocations: ["Jinnah Postgraduate Medical Centre (JPMC)", "Dr. Ruth K.M. Pfau Civil Hospital (CHK)", "The Indus Hospital (Korangi)"],
      estimatedDays: "Same Day",
      feeStructure: "Government Subsidy / Free for most services",
    }, [
      { 
        titleEn: "Step 1: Token & Registration", 
        titleUr: "پہلا قدم: ٹوکن اور رجسٹریشن", 
        descEn: "Visit the main registration desk at JPMC or Civil Hospital. Show your **original CNIC**. Govt OPD tokens strictly close at 11:00 AM. Arrive by 7:30 AM to stand in line.", 
        descUr: "جناح یا سول ہسپتال کے مین رجسٹریشن ڈیسک پر جائیں۔ اپنا **اصل شناختی کارڈ** دکھائیں۔ او پی ڈی ٹوکن صبح 11:00 بجے بند ہو جاتے ہیں۔ صبح 7:30 بجے تک پہنچیں۔",
        img: "/images/steps/hosp-opd.png"
      },
      { 
        titleEn: "Step 2: Vitals & Slip Stamping", 
        titleUr: "دوسرا قدم: وائٹلز اور اسٹیمپنگ", 
        descEn: "Get your BP and weight checked at the vitals desk. Do not skip this; the doctor will send you back if your slip is not stamped here.", 
        descUr: "وائٹلز ڈیسک پر بلڈ پریشر اور وزن چیک کروائیں۔ اسے مت چھوڑیں؛ اسٹیمپ کے بغیر ڈاکٹر معائنہ نہیں کرے گا۔",
        img: "/images/steps/hosp-slip.png"
      },
      { 
        titleEn: "Step 3: Pharmacy Window", 
        titleUr: "تیسرا قدم: فارمیسی ونڈو", 
        descEn: "Collect medicines from the Indoor Pharmacy window. If the line is too long, the Zakat Store near the exit offers subsidized rates.", 
        descUr: "انڈور فارمیسی ونڈو سے دوائیں حاصل کریں۔ لائن لمبی ہونے کی صورت میں ایگزٹ کے پاس زکوٰۃ اسٹور سے سستی دوائیں مل سکتی ہیں۔",
        img: "/images/steps/hosp-lab-fee.png"
      }
    ]);

    // --- Government Services (Karachi Specific) ---
    await addSvc({
      titleEn: "Domicile & PRC (Karachi)",
      titleUr: "ڈومیسائل اور پی آر سی (کراچی)",
      type: "government",
      icon: "FileText",
      descriptionEn: "Process for Sindh Government Domicile/PRC via Karachi DC Offices.",
      descriptionUr: "سندھ حکومت کا ڈومیسائل اور پی آر سی کراچی ڈی سی آفس سے بنوانے کا طریقہ۔",
      checklistEn: ["**Form P & Form D**", "**2 Utility Bills (Karachi)**", "**Police Verification**", "**Attested CNIC Copies**"],
      checklistUr: ["**فارم P اور فارم D**", "**کراچی کے 2 بجلی/گیس کے بل**", "**پولیس ویریفیکیشن**", "**تصدیق شدہ شناختی کارڈ کی کاپیاں**"],
      jurisdiction: "Sindh Government / District Administration",
      officeLocations: ["DC South (Old Commissioner Office)", "DC East (Gulshan-e-Iqbal)", "DC Central (North Nazimabad)", "DC West (Orangi Town)", "DC Malir", "DC Korangi", "DC Keamari"],
      estimatedDays: "15-21 Days",
      feeStructure: "NBP Bank Challan (National Bank of Pakistan)",
    }, [
      { 
        titleEn: "Step 1: Visit DC Office", 
        titleUr: "پہلا قدم: ڈی سی آفس جائیں", 
        descEn: "Visit the Deputy Commissioner (DC) Office of your district (East, West, South, etc.).", 
        descUr: "اپنے ضلع (شرق، غرب، جنوب، وسطی، وغیرہ) کے ڈپٹی کمشنر (DC) آفس جائیں۔",
        img: "/images/steps/dc-office.png"
      },
      { 
        titleEn: "Step 2: Submit Form P/D", 
        titleUr: "دوسرا قدم: فارم جمع کروائیں", 
        descEn: "Submit the filled **Form P** and **Form D** with utility bills and police report.", 
        descUr: "مکمل بھرا ہوا **فارم P** اور **فارم D** بجلی کے بلوں اور پولیس رپورٹ کے ساتھ جمع کروائیں۔",
        img: "/images/steps/form-pd.png"
      }
    ]);

    await addSvc({
      titleEn: "NADRA CNIC (Karachi Mega Centers)",
      titleUr: "نادرا شناختی کارڈ (کراچی میگا سینٹرز)",
      type: "government",
      icon: "User",
      descriptionEn: "Getting your CNIC at Karachi Mega Centers (DHA, North Nazimabad, Siemens).",
      descriptionUr: "کراچی میگا سینٹرز (ڈی ایچ اے، نارتھ ناظم آباد، سیمنز) سے شناختی کارڈ بنوانے کا طریقہ۔",
      checklistEn: ["**Old CNIC / B-Form**", "**Parent/Guardian's CNIC**", "**Verification by Relative**"],
      checklistUr: ["**پرانا شناختی کارڈ / بے فارم**", "**والدین کا شناختی کارڈ**", "**رشتہ دار سے تصدیق**"],
      jurisdiction: "Federal Government (NADRA)",
      officeLocations: ["DHA Mega Center", "North Nazimabad Mega Center", "Siemens Chowrangi Mega Center"],
      estimatedDays: "15-30 Days",
      feeStructure: "Varies (Normal/Urgent/Executive)",
    }, [
      { 
        titleEn: "Step 1: Visit Mega Center", 
        titleUr: "پہلا قدم: میگا سینٹر جائیں", 
        descEn: "Visit Karachi Mega Centers (e.g. DHA or Siemens Chowrangi) for 24/7 service.", 
        descUr: "24/7 سروس کے لیے کراچی میگا سینٹرز (مثلاً ڈی ایچ اے یا سیمنز چورنگی) جائیں۔",
        img: "/images/steps/nadra-token.png"
      }
    ]);
  }
}

export const storage = new DatabaseStorage();
