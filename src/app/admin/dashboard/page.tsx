import { Plane, Ship, Mail } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { bookings, inquiries, tourPackages } from "@/lib/data";

const stats = [
    { title: "Total Bookings", value: bookings.length, icon: Plane },
    { title: "Tour Packages", value: tourPackages.length, icon: Ship },
    { title: "New Inquiries", value: inquiries.filter(i => i.status === 'New').length, icon: Mail },
]

export default function AdminDashboardPage() {
  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl mb-8">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="mt-8">
            <h2 className="font-headline text-2xl mb-4">Welcome, Admin!</h2>
            <p className="text-muted-foreground">
                From this dashboard, you can manage flight bookings, update tour packages, and respond to customer inquiries. Use the sidebar to navigate through the different sections.
            </p>
        </div>
    </div>
  );
}
