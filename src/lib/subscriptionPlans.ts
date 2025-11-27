export interface SubscriptionPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  details: string[];
  gradient: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "pay-per-ride",
    title: "Pay Per Ride",
    subtitle: "Unlock fee: KES 150",
    price: "KES 10 / minute",
    details: [
      "First 10 minutes free",
      "Best for: Occasional riders, short errands, or first-time users who want flexibility",
      "Includes: Access to any Breezo e-bike or scooter, simple payment via app or e-wallet",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "daily-pass",
    title: "Daily Pass",
    subtitle: "Price: KES 500",
    price: "Unlimited Rides",
    details: [
      "Unlimited rides for 12 hours",
      "Best for: A user who needs mobility for a full day—work, meetings, errands",
      "Includes: As many rides as needed within that 12-hour window.",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "weekly-pass",
    title: "Weekly Pass",
    subtitle: "Price: KES 2,350",
    price: "Unlimited Rides",
    details: [
      "Unlimited rides each day for 5 consecutive working days",
      "Best for: Frequent riders (e.g., daily commuters), university students during a busy week, or short-term stay users",
      "Includes: Active for 5 working days",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "monthly-pass",
    title: "Monthly Pass",
    subtitle: "Price: KES 8,500",
    price: "Unlimited Rides",
    details: [
      "Unlimited rides each day for 23 working days",
      "Best for: Regular commuters with a predictable daily schedule—business professionals, campus residents, gig economy workers",
      "Includes: Full month access",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "student-pass",
    title: "Student Pass",
    subtitle: "Price: KES 5,500 /month",
    price: "Unlimited Rides",
    details: [
      "Same structure as the Monthly Pass",
      "Best for: University and college students with tighter budgets who need daily mobility",
      "Includes: Discounted monthly rate, access to student-only promo periods, possibly campus-located docking stations",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "corporate-fleet",
    title: "Corporate & Fleet Plans (B2B)",
    subtitle: "Starting from KES 6,000",
    price: "Custom Pricing",
    details: [
      "Corporate Package: KES 8,550 per employee per month",
      "Delivery Rider Plan: KES 7,500 per month",
      "Fleet Leasing: KES 12,000 – KES 15,000 per bike per month",
    ],
    gradient: "from-blue-500 to-indigo-700",
  },
];
