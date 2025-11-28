
"use server";

import { z } from "zod";
import { generateTourPackageDescription } from "@/ai/flows/generate-tour-package-descriptions";

const visaInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  visaType: z.string().min(1, "Visa type is required"),
});

export async function handleVisaInquiry(prevState: any, formData: FormData) {
  try {
    const validatedFields = visaInquirySchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      visaType: formData.get("visaType"),
    });

    if (!validatedFields.success) {
      return {
        message: "Invalid form data",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    // In a real app, you would send an email or save this to a database.
    console.log("New Visa Inquiry:", validatedFields.data);

    return { message: "Your inquiry has been submitted successfully. We will get back to you shortly.", errors: {} };
  } catch (error) {
    return { message: "An unexpected error occurred.", errors: {} };
  }
}


const quoteRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    pax: z.coerce.number().min(1, "Number of people is required"),
    message: z.string().optional(),
    tourName: z.string(),
  });
  
  export async function handleQuoteRequest(prevState: any, formData: FormData) {
    try {
      const validatedFields = quoteRequestSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        pax: formData.get("pax"),
        message: formData.get("message"),
        tourName: formData.get("tourName"),
      });
  
      if (!validatedFields.success) {
        return {
          message: "Invalid form data",
          errors: validatedFields.error.flatten().fieldErrors,
        };
      }
      
      console.log("New Quote Request:", validatedFields.data);
  
      return { message: `Thank you for your interest in the ${validatedFields.data.tourName} package. We will send a quote to your email.`, errors: {} };
    } catch (error) {
      return { message: "An unexpected error occurred.", errors: {} };
    }
  }

export async function generateDescriptionAction(destination: string, duration: string, activities: string) {
  if (!destination || !duration || !activities) {
    return { error: "Please fill in all fields." };
  }
  try {
    const result = await generateTourPackageDescription({
      destination,
      duration,
      activities,
    });
    return { description: result.description };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate description. Please try again." };
  }
}
