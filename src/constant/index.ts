import type { TabKey } from "../contexts/NavigationContext";

export const HEADERS: Record<TabKey, { name: string; subtitle?: string }> = {
  home: {
    name: "Welcome Mayowa",
    subtitle:
      "Your intelligent hub for patient trends, service pricing and revenue performance",
  },
  pricing: {
    name: "Pricing Intelligence",
    subtitle:
      "Your smart command center for real-time service pricing trends, competitor benchmarks, and revenue impact insights.",
  },
  revenue: {
    name: "Revenue Performance",
    subtitle:
      "Your financial pulseboard for tracking income by service, department, and payer — spotlighting growth drivers and underperformers in real time.",
  },
  patient: {
    name: "Patient Intelligence",
    subtitle:
      "Your engagement dashboard for uncovering patient behavior, loyalty trends, and population insights — helping you tailor care and boost retention.",
  },
  assistant: {
    name: "Helda AI Assistant",
    subtitle:
      "Your AI partner for instant answers and insights — helping you make faster, smarter healthcare decisions.",
  },
  settings: { name: "Settings", subtitle: "" },
  profile: { name: "My Profile", subtitle: "" },
};
