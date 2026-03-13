import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const SPECIALIZATION_LABELS: Record<string, string> = {
  mutual_funds: "Mutual Funds",
  equity: "Equity",
  tax_planning: "Tax Planning",
  retirement: "Retirement",
  insurance: "Insurance",
  real_estate: "Real Estate",
  debt_funds: "Debt Funds",
  portfolio_management: "Portfolio Management",
  nri_investments: "NRI Investments",
  goal_based: "Goal-Based Planning",
};

export const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat",
  "Lucknow", "Chandigarh", "Bhopal", "Indore", "Coimbatore",
];

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffDays > 30) return formatDate(dateString);
  if (diffDays > 1) return `${diffDays} days ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffHours > 1) return `${diffHours} hours ago`;
  if (diffMins > 1) return `${diffMins} minutes ago`;
  return "Just now";
}
