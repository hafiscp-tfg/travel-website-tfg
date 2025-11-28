import { VisaInquiryForm } from "@/components/forms/visa-inquiry-form";
import { Badge } from "@/components/ui/badge";

export default function VisaPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">Hassle-Free Processing</Badge>
            <h1 className="font-headline text-4xl md:text-5xl">Visa Assistance Services</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Navigating the complexities of visa applications can be daunting. Let our experienced consultants guide you through every step of the process, ensuring a smooth and successful application.
            </p>
            <div className="mt-8 space-y-4">
              <h3 className="font-headline text-xl">We specialize in:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Tourist & Visit Visas for the Gulf (Saudi Arabia, UAE, etc.)</li>
                <li>Schengen Visas for your European adventures.</li>
                <li>Visas for the United States (US) and the United Kingdom (UK).</li>
                <li>And many other destinations worldwide.</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Our team stays up-to-date with the latest immigration rules and documentation requirements to maximize your chances of approval.
              </p>
            </div>
          </div>
          <div>
            <VisaInquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
