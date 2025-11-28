"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlaneTakeoff, PlaneLanding, Users, ArrowRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  tripType: z.enum(["one-way", "round-trip"]),
  from: z.string().min(3, "Required").max(3, "3-letter code"),
  to: z.string().min(3, "Required").max(3, "3-letter code"),
  depart: z.date(),
  return: z.date().optional(),
}).refine(data => {
    if (data.tripType === 'round-trip') {
        return !!data.return;
    }
    return true;
}, {
    message: "Return date is required for round trips",
    path: ["return"],
});

function FlightSearchForm() {
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        tripType: "round-trip",
        from: "DXB",
        to: "COK",
        depart: new Date(),
      },
    });
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      const params = new URLSearchParams();
      params.set("from", values.from);
      params.set("to", values.to);
      params.set("depart", format(values.depart, "yyyy-MM-dd"));
      if (values.tripType === 'round-trip' && values.return) {
        params.set("return", format(values.return, "yyyy-MM-dd"));
      }
      
      router.push(`/flights/search?${params.toString()}`);
    }

    const tripType = form.watch("tripType");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                            >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="round-trip" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Round Trip</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="one-way" />
                                    </FormControl>
                                    <FormLabel className="font-normal">One Way</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                 )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
                    <div className="lg:col-span-2">
                        <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>From</FormLabel>
                            <FormControl>
                                <Input placeholder="DXB" {...field} className="uppercase bg-input" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>To</FormLabel>
                            <FormControl>
                                <Input placeholder="COK" {...field} className="uppercase bg-input" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                
                    <div className="lg:col-span-2">
                        <FormField
                            control={form.control}
                            name="depart"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Departure</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-input border-input", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "MM/dd/yyyy") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <FormField
                            control={form.control}
                            name="return"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Return</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild disabled={tripType === 'one-way'}>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-input border-input", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "MM/dd/yyyy") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("depart") || new Date())} initialFocus />
                                </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                
                    <div className="lg:col-span-2">
                    <Button type="submit" size="lg" className="w-full">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export function FlightSearchWidget() {

  return (
    <div className="bg-background rounded-lg shadow-lg p-4 sm:p-6">
        <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/60">
                <TabsTrigger value="flights">Flights</TabsTrigger>
                <TabsTrigger value="tours">Tours</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="visa">Visa</TabsTrigger>
            </TabsList>
            <TabsContent value="flights" className="pt-6">
                <FlightSearchForm />
            </TabsContent>
            <TabsContent value="tours">
                <p className="text-center text-muted-foreground py-8">Tour search coming soon!</p>
            </TabsContent>
            <TabsContent value="hotels">
                <p className="text-center text-muted-foreground py-8">Hotel search coming soon!</p>
            </TabsContent>
            <TabsContent value="visa">
                <p className="text-center text-muted-foreground py-8">Visa information coming soon!</p>
            </TabsContent>
        </Tabs>
    </div>
  );
}
