import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { inquiries } from "@/lib/data";

export default function InquiriesPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl md:text-4xl mb-8">Customer Inquiries</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inquiry ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.id}</TableCell>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>{inquiry.type}</TableCell>
                <TableCell>{inquiry.subject}</TableCell>
                <TableCell>{inquiry.date}</TableCell>
                <TableCell>
                  <Badge variant={inquiry.status === 'New' ? 'destructive' : 'outline'}>
                    {inquiry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
