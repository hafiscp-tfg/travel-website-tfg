"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { handleVisaInquiry } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const visaInquirySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    visaType: z.string().min(1, "Please select a visa type."),
    message: z.string().optional(),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={pending}>
            {pending ? "Submitting..." : "Get a Callback"}
        </Button>
    );
}

export function VisaInquiryForm() {
    const { toast } = useToast();
    const [state, formAction] = useFormState(handleVisaInquiry, { message: "", errors: {} });
    
    const form = useForm<z.infer<typeof visaInquirySchema>>({
        resolver: zodResolver(visaInquirySchema),
        defaultValues: {
            name: "", email: "", phone: "", visaType: "", message: "",
        },
    });

    useEffect(() => {
        if (state.message) {
            if (Object.keys(state.errors).length > 0) {
                toast({
                    title: "Error",
                    description: state.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: state.message,
                });
                form.reset();
            }
        }
    }, [state, toast, form]);

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="font-headline">Visa Inquiry</CardTitle>
                <CardDescription>Fill out the form below and our visa expert will contact you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div>
                        <Label htmlFor="visaType">Visa Type</Label>
                        <Select name="visaType" required>
                            <SelectTrigger id="visaType">
                                <SelectValue placeholder="Select a visa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="saudi">Saudi Arabia Visa</SelectItem>
                                <SelectItem value="uae">UAE Visa</SelectItem>
                                <SelectItem value="schengen">Schengen Visa</SelectItem>
                                <SelectItem value="uk">UK Visa</SelectItem>
                                <SelectItem value="us">US Visa</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea id="message" name="message" placeholder="Tell us more about your travel plans..." />
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
