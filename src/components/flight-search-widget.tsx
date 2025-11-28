"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlaneTakeoff, PlaneLanding, Users, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  tripType: z.enum(["one-way", "round-trip"]),
  from: z.string().min(3, "Required").max(3, "3-letter code"),
  to: z.string().min(3, "Required").max(3, "3-letter code"),
  depart: z.date(),
  return: z.date().optional(),
  passengers: z.coerce.number().min(1),
}).refine(data => {
    if (data.tripType === 'round-trip') {
        return !!data.return;
    }
    return true;
}, {
    message: "Return date is required for round trips",
    path: ["return"],
});

export function FlightSearchWidget() {
  const router = useRouter();
  const [tripType, setTripType] = useState("round-trip");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: "round-trip",
      from: "CCJ",
      to: "DXB",
      depart: new Date(),
      passengers: 1,
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
    params.set("pax", values.passengers.toString());
    
    router.push(`/flights/search?${params.toString()}`);
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
      <CardHeader>
        <RadioGroup defaultValue="round-trip" className="flex items-center" onValueChange={(value) => setTripType(value)}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip">Round Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way">One Way</Label>
            </div>
        </RadioGroup>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="CCJ" {...field} className="pl-9 uppercase" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="hidden md:flex items-center justify-center pt-8">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
               <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="DXB" {...field} className="pl-9 uppercase" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="depart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Depart</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "MMM dd, y") : <span>Pick a date</span>}
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
              <FormField
                control={form.control}
                name="return"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Return</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild disabled={tripType === 'one-way'}>
                        <FormControl>
                          <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "MMM dd, y") : <span>Pick a date</span>}
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
            
            <div className="lg:col-span-1">
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passengers</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="number" min="1" {...field} className="pl-9" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <div className="lg:col-span-2">
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                Search Flights
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// These components are not in shadcn/ui by default, adding them here for use in the widget.
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
