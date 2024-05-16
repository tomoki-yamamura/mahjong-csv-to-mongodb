export default function parseDateString(dateString: string, timeString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hour, min] = timeString.split(':').map(Number) 
  const date = new Date(year, month - 1, day, hour, min);
  return date;
}
