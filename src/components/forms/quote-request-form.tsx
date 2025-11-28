"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleQuoteRequest } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Sending..." : "Request Quote"}
        </Button>
    );
}

export function QuoteRequestForm({ tourName }: { tourName: string }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleQuoteRequest, { message: "", errors: {} });

    useEffect(() => {
        if (state?.message) {
            toast({
                title: Object.keys(state.errors).length > 0 ? "Error" : "Success",
                description: state.message,
                variant: Object.keys(state.errors).length > 0 ? "destructive" : "default",
            });
        }
    }, [state, toast]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Request a Custom Quote</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="tourName" value={tourName} />
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" required />
                        </div>
                        <div>
                            <Label htmlFor="pax">No. of People</Label>
                            <Input id="pax" name="pax" type="number" min="1" defaultValue="2" required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea id="message" name="message" placeholder="Any special requests or questions?" />
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
