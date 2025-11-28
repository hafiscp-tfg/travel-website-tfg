"use client"

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { generateDescriptionAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type TourFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function TourForm({ isOpen, onClose }: TourFormProps) {
  const { register, handleSubmit, control, setValue, watch } = useForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const destination = watch("destination");
  const duration = watch("duration");
  const activities = watch("activities");

  const handleGenerateDescription = async () => {
    if (!destination || !duration || !activities) {
      toast({
        title: "Missing Information",
        description: "Please fill destination, duration, and activities to generate a description.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateDescriptionAction(destination, duration, activities);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.description) {
        setValue("description", result.description);
        toast({ title: "Success", description: "Description generated successfully." });
      }
    } catch (e) {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data); // In a real app, you'd save this data.
    toast({ title: "Tour Saved", description: "The tour package has been saved." });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline">Add New Tour Package</SheetTitle>
          <SheetDescription>
            Fill in the details for the new tour. Use the AI generator for a head start on the description.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <div>
            <Label htmlFor="title">Tour Title</Label>
            <Input id="title" {...register("title")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" {...register("destination")} placeholder="e.g., Munnar" />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} placeholder="e.g., 5 days" />
            </div>
          </div>
          
          <div>
              <Label htmlFor="activities">Activities</Label>
              <Input id="activities" {...register("activities")} placeholder="e.g., trekking, tea tasting" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="description">Description</Label>
              <Button type="button" variant="ghost" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </div>
            <Textarea id="description" {...register("description")} rows={8} />
          </div>

          <Button type="submit" className="w-full">Save Package</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
