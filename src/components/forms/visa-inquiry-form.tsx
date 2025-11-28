
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { handleVisaInquiry } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/icons";

const visaInquirySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    visaType: z.string().min(1, "Please select a visa type."),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="flex-1 h-12 text-base" disabled={pending}>
            {pending ? "Submitting..." : "Get a Callback"}
        </Button>
    );
}

export function VisaInquiryForm() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleVisaInquiry, { message: "", errors: {} });

    const form = useForm<z.infer<typeof visaInquirySchema>>({
        resolver: zodResolver(visaInquirySchema),
        defaultValues: {
            name: "", email: "", phone: "", visaType: "",
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
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-foreground text-xl font-bold leading-tight tracking-tight pb-4">Start Your Visa Application</h2>
            <form action={formAction} className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" type="tel" required />
                </div>
                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                    <Label htmlFor="visaType" className="block text-sm font-medium text-muted-foreground mb-1">Desired Visa</Label>
                    <Select name="visaType" required>
                        <SelectTrigger id="visaType">
                            <SelectValue placeholder="Select a visa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="saudi">Saudi Arabia</SelectItem>
                            <SelectItem value="uae">UAE</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <SubmitButton />
                     <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="flex-1 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#25D366] text-white text-base font-bold leading-normal hover:bg-[#25D366]/90 transition-colors">
                        <WhatsAppIcon className="mr-2 h-5 w-5" />
                        <span className="truncate">WhatsApp Us</span>
                    </a>
                </div>
            </form>
        </div>
    );
}
