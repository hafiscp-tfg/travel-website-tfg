"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlaneTakeoff, Ship, FileText, Search } from "lucide-react";

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <div className="flex justify-start px-2 py-3">
                    <div className="flex h-10 w-fit items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                        <FormField
                            control={form.control}
                            name="tripType"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex"
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <Label className="flex cursor-pointer h-full items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-slate-900 dark:has-[:checked]:text-white text-gray-500 text-sm font-medium">
                                                    <span className="truncate">Round Trip</span>
                                                    <RadioGroupItem value="round-trip" className="invisible w-0" />
                                                </Label>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                 <Label className="flex cursor-pointer h-full items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-slate-900 dark:has-[:checked]:text-white text-gray-500 text-sm font-medium">
                                                    <span className="truncate">One Way</span>
                                                    <RadioGroupItem value="one-way" className="invisible w-0" />
                                                </Label>
                                            </FormControl>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                         )}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end px-2 pt-2">
                    <div className="lg:col-span-2">
                        <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-left">From</FormLabel>
                            <FormControl>
                                <Input placeholder="DXB" {...field} className="uppercase bg-slate-50 dark:bg-slate-800 h-12" />
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
                            <FormLabel className="text-left">To</FormLabel>
                            <FormControl>
                                <Input placeholder="COK" {...field} className="uppercase bg-slate-50 dark:bg-slate-800 h-12" />
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
                                <FormLabel className="text-left">Departure</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-slate-50 dark:bg-slate-800 h-12", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                                <FormLabel className="text-left">Return</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild disabled={tripType === 'one-way'}>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-slate-50 dark:bg-slate-800 h-12", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                    <Button type="submit" size="lg" className="w-full h-12 font-bold tracking-wide">
                        <Search className="mr-2 h-5 w-5" /> Search
                    </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export function FlightSearchWidget() {
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl bg-background rounded-xl shadow-2xl">
        <Tabs defaultValue="flights" className="w-full">
            <TabsList className="flex px-4 pt-2 gap-8 bg-transparent border-b rounded-none h-auto justify-start">
                <TabsTrigger value="flights" className="flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 transition-colors border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary text-gray-500 hover:text-primary rounded-none shadow-none bg-transparent px-0 data-[state=active]:shadow-none">
                    <PlaneTakeoff />
                    <p className="text-sm font-bold tracking-[0.015em]">Flights</p>
                </TabsTrigger>
                <TabsTrigger value="tours" onClick={() => router.push('/services/tours')}  className="flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 transition-colors border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary text-gray-500 hover:text-primary rounded-none shadow-none bg-transparent px-0 data-[state=active]:shadow-none">
                    <Ship />
                    <p className="text-sm font-bold tracking-[0.015em]">Tours</p>
                </TabsTrigger>
                <TabsTrigger value="visa" onClick={() => router.push('/services/visa')} className="flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 transition-colors border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary text-gray-500 hover:text-primary rounded-none shadow-none bg-transparent px-0 data-[state=active]:shadow-none">
                    <FileText />
                    <p className="text-sm font-bold tracking-[0.015em]">Visa</p>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="flights" className="p-6">
                <FlightSearchForm />
            </TabsContent>
        </Tabs>
    </div>
  );
}
