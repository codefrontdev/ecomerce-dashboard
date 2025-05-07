import { format } from "date-fns";

export function formatDate(dateString: string): string {
    console.log(dateString);
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  return format(date, "MMM dd, yyyy");
}