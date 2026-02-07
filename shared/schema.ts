import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === TABLE DEFINITIONS ===
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleUr: text("title_ur").notNull(),
  type: text("type").notNull(),
  icon: text("icon").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionUr: text("description_ur").notNull(),
  checklistEn: jsonb("checklist_en").$type<string[]>().default([]),
  checklistUr: jsonb("checklist_ur").$type<string[]>().default([]),
  jurisdiction: text("jurisdiction"),
  officeLocations: jsonb("office_locations").$type<string[]>().default([]),
  estimatedDays: text("estimated_days"),
  feeStructure: text("fee_structure"),
});

export const steps = pgTable("steps", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  stepNumber: integer("step_number").notNull(),
  titleEn: text("title_en").notNull(),
  titleUr: text("title_ur").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionUr: text("description_ur").notNull(),
  imagePath: text("image_path"),
});

// === RELATIONS ===
export const servicesRelations = relations(services, ({ many }) => ({
  steps: many(steps),
}));

export const stepsRelations = relations(steps, ({ one }) => ({
  service: one(services, {
    fields: [steps.serviceId],
    references: [services.id],
  }),
}));

// === BASE SCHEMAS ===
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertStepSchema = createInsertSchema(steps).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Service = typeof services.$inferSelect;
export type Step = typeof steps.$inferSelect;
export type ServiceWithSteps = Service & { steps: Step[] };
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertStep = z.infer<typeof insertStepSchema>;
