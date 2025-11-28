"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Plane, Clock, Landmark } from "lucide-react";

import { flights as allFlights } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function FlightResults() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const depart = searchParams.get("depart");

  // Simple filtering for demonstration
  const filteredFlights = allFlights.filter(
    (flight) =>
      flight.from.toLowerCase() === from?.toLowerCase() &&
      flight.to.toLowerCase() === to?.toLowerCase()
  );

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl">
            Flights from {from?.toUpperCase()} to {to?.toUpperCase()}
          </h1>
          <p className="text-muted-foreground">
            Showing results for {depart}
          </p>
        </div>
      </div>
      
      {filteredFlights.length > 0 ? (
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 grid grid-cols-12 items-center gap-4">
                <div className="col-span-12 md:col-span-2 flex items-center gap-2">
                  <Plane className="w-8 h-8 text-primary"/>
                  <div>
                    <div className="font-semibold">{flight.airline}</div>
                    <div className="text-xs text-muted-foreground">{flight.id}</div>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2 text-center">
                  <div className="text-lg font-bold">{flight.departureTime}</div>
                  <div className="text-sm text-muted-foreground">{flight.from}</div>
                </div>
                <div className="col-span-6 md:col-span-3 flex items-center justify-center text-center">
                    <Separator className="w-1/4 hidden md:block" />
                    <div className="px-2 text-sm text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3"/> {flight.duration}</div>
                        {flight.stops > 0 ? (
                            <div className="flex items-center gap-1 text-red-600"><Landmark className="w-3 h-3"/> {flight.stops} Stop via {flight.stopLocation}</div>
                        ) : (
                            <div className="text-green-600">Direct</div>
                        )}
                    </div>
                    <Separator className="w-1/4 hidden md:block" />
                </div>
                <div className="col-span-6 md:col-span-2 text-center">
                  <div className="text-lg font-bold">{flight.arrivalTime}</div>
                  <div className="text-sm text-muted-foreground">{flight.to}</div>
                </div>
                <div className="col-span-6 md:col-span-3 flex flex-col items-end gap-2">
                  <div className="text-xl font-bold text-right">
                    ₹{flight.price.toLocaleString("en-IN")}
                  </div>
                  <Button className="w-full md:w-auto bg-accent hover:bg-accent/90">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No flights found</h2>
          <p className="text-muted-foreground mt-2">
            We couldn't find any flights for this route. Please try a different search.
          </p>
        </div>
      )}
    </div>
  );
}


export default function FlightSearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FlightResults />
        </Suspense>
    )
}
