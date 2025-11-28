import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { bookings } from "@/lib/data";

export default function BookingsPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl md:text-4xl mb-8">Flight Bookings</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Flight</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.flight}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                   className={booking.status === 'Confirmed' ? 'bg-green-500' : ''}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">₹{booking.amount.toLocaleString('en-IN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
