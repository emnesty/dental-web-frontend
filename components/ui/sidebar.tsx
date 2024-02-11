import { cn } from "@/lib/utils"; // Assuming this is a utility for combining Tailwind classes
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 w-64 pb-12 h-screen fixed top-0 left-0",
        className
      )}
    >
      <div className="space-y-4 py-4 px-4">
        {/* Optional: Dentist Logo */}
        <div className="w-full flex justify-center mb-4">
          <Image
            src="/images/logo.png"
            alt="Dentist Office Logo"
            width={50}
            height={50}
          />
        </div>
        {/* Navigation Links */}
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <svg /* ... icon SVG */ className="mr-2 h-4 w-4">...</svg>
            Patients
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg /* ... icon SVG */ className="mr-2 h-4 w-4">...</svg>
            Appointments
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg /* ... icon SVG */ className="mr-2 h-4 w-4">...</svg>
            Procedures
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg /* ... icon SVG */ className="mr-2 h-4 w-4">...</svg>
            Billing
          </Button>
        </div>
      </div>
    </div>
  );
}
