import { services, steps, type Service, type Step, type ServiceWithSteps, type InsertService, type InsertStep } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
// Add 'sql' to the list of imports from "drizzle-orm"
import { eq, sql } from "drizzle-orm";

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
    try {
      // FORCE CLEAR: This replaces the "if (existing)" check.
      // It wipes the old 3 services so the new 12+ can be imported fresh.
      await db.execute(sql`TRUNCATE TABLE services, steps RESTART IDENTITY CASCADE`);
      console.log("Old data cleared. Starting fresh import from CSV...");

      const servicesPath = path.resolve(process.cwd(), "services.csv");
      const stepsPath = path.resolve(process.cwd(), "steps.csv");

      if (!fs.existsSync(servicesPath) || !fs.existsSync(stepsPath)) {
        console.error("CSV files not found! Ensure services.csv and steps.csv are in the root directory.");
        return;
      }

      // Read and parse services.csv
      const servicesRaw = fs.readFileSync(servicesPath, "utf-8");
      const serviceRecords = parse(servicesRaw, { columns: true, skip_empty_lines: true });

      // Read and parse steps.csv
      const stepsRaw = fs.readFileSync(stepsPath, "utf-8");
      const stepRecords = parse(stepsRaw, { columns: true, skip_empty_lines: true });

      console.log(`Importing ${serviceRecords.length} services...`);

      for (const row of serviceRecords) {
        // Insert the main service data 
        const newService = await this.createService({
          titleEn: row.title_en,
          titleUr: row.title_ur,
          type: row.type,
          icon: row.icon,
          descriptionEn: row.description_en,
          descriptionUr: row.description_ur,
          checklistEn: JSON.parse(row.checklist_en || "[]"),
          checklistUr: JSON.parse(row.checklist_ur || "[]"),
          jurisdiction: row.jurisdiction || null,
          officeLocations: JSON.parse(row.office_locations || "[]"),
          estimatedDays: row.estimated_days || null,
          feeStructure: row.fee_structure || null,
        });

        // Find and insert all steps belonging to this service 
        const matchingSteps = stepRecords.filter((s: any) => s.service_id === row.id);
        for (const s of matchingSteps) {
          await this.createStep({
            serviceId: newService.id,
            stepNumber: parseInt(s.step_number),
            titleEn: s.title_en,
            titleUr: s.title_ur,
            descriptionEn: s.description_en,
            descriptionUr: s.description_ur,
            imagePath: s.image_path || null,
          });
        }
      }
      console.log("Database successfully populated from CSV files!");
    } catch (error) {
      console.error("Seeding failed:", error);
    }
  }

export const storage = new DatabaseStorage();
