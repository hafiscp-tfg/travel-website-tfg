
"use client";

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
        return: new Date(new Date().setDate(new Date().getDate() + 2))
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
                    <FormField
                        control={form.control}
                        name="tripType"
                        render={({ field }) => (
                        <FormItem className="flex h-10 w-fit items-center justify-center rounded-lg bg-background p-1">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <Label className="flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium text-gray-500 has-[:checked]:bg-card has-[:checked]:text-foreground has-[:checked]:shadow-sm dark:text-gray-400">
                                                <span className="truncate">Round Trip</span>
                                                <RadioGroupItem value="round-trip" className="invisible w-0" />
                                            </Label>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                                <Label className="flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium text-gray-500 has-[:checked]:bg-card has-[:checked]:text-foreground has-[:checked]:shadow-sm dark:text-gray-400">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end px-2 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 lg:col-span-4 lg:grid-cols-4">
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel className="text-left text-sm font-medium">From</FormLabel>
                                <FormControl>
                                    <Input placeholder="DXB" {...field} className="uppercase bg-background h-12" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="to"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel className="text-left text-sm font-medium">To</FormLabel>
                                <FormControl>
                                    <Input placeholder="COK" {...field} className="uppercase bg-background h-12" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    
                        <FormField
                            control={form.control}
                            name="depart"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-left text-sm font-medium">Departure</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("justify-start text-left font-normal bg-background h-12", !field.value && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "MMM d, yyyy") : <span>Pick a date</span>}
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

                        <FormField
                            control={form.control}
                            name="return"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-left text-sm font-medium">Return</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild disabled={tripType === 'one-way'}>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("justify-start text-left font-normal bg-background h-12", !field.value && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "MMM d, yyyy") : <span>Pick a date</span>}
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
                
                    <Button type="submit" size="lg" className="w-full h-12 font-bold tracking-wide">
                        <Search className="mr-2 h-5 w-5" /> Search
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export function FlightSearchWidget() {
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl bg-card rounded-xl shadow-2xl">
        <Tabs defaultValue="flights" className="w-full">
            <TabsList className="flex justify-start px-4 pt-2 gap-8 bg-transparent border-b rounded-none h-auto">
                <TabsTrigger value="flights" className="flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 transition-colors border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary text-gray-500 hover:text-primary rounded-none shadow-none bg-transparent px-0 data-[state=active]:shadow-none">
                    <PlaneTakeoff className="data-[state=active]:text-primary" />
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

    

    