import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type CustomizeTripFormValues = z.infer<typeof customizeTripSchema>;

export const customizeTripSchema = z.object({
  fullName: z.string().min(3, "Please enter your full name"),

  email: z.string().email("Please enter a valid email address"),

  phone: z.string().min(7, "Please enter a valid phone number"),

  destination: z.string().min(2, "Please enter your destination"),

  preferredStartDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid start date"),

  preferredEndDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid end date"),

  isDateFlexible: z.boolean(),

  numberOfDays: z.number().int().min(1, "Enter at least 1 day"),

  numberOfAdults: z.number().int().min(1, "Enter at least 1 adult"),

  numberOfChildren: z.number().int().min(0, "Children cannot be negative"),

  preferredPricingTier: z.enum(["BUDGET", "MIDRANGE", "LUXURY"], {
    message: "Select a pricing tier",
  }),

  budgetMin: z.number().min(0, "Minimum budget cannot be negative"),

  budgetMax: z.number().min(0, "Maximum budget cannot be negative"),

  currency: z.string().min(2, "Select a currency"),

  accommodationPreference: z.string().min(2, "Enter accommodation preference"),

  transportationPreference: z.string().min(2, "Enter transportation preference"),

  activities: z.array(z.string()).min(1, "Select at least one activity"),

  specialRequests: z.string().optional(),
});

export const formSchema = z.object({
  fullName: z.string().min(3,"Please enter a full name"),
  email: z.string().email().min(3,"Please enter a valid email address"),
  phone: z.string().min(7,'Please enter a phone number'),
  journeyId: z.string(),
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a travel date"),
  numberOfAdults: z.number().int().min(1),
  numberOfChildren: z.number().int().min(0),
  pricingTier: z.string().min(1, "Select a pricing tier"),
  nationality: z.string().min(2,'Please enter a nationality'),
  specialRequests: z.string().optional(),
});