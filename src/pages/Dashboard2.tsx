"use client";

import React from "react";
import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";

// Eager pages
import HomePage from "./HomePage";
import Pricing from "./Pricing";
import Revenue from "./Revenue";
import Settings from "./Settings";
import Profile from "./Profile";

// Lazy pages (optional: only if these exist and are heavier)
const Patient = React.lazy(() => import("./Patient"));
const AIAssistant = React.lazy(() => import("./AIAssistant"));

type TabKey =
  | "home"
  | "pricing"
  | "revenue"
  | "patient"
  | "assistant"
  | "settings"
  | "profile";

const HEADERS: Record<TabKey, { name: string; subtitle?: string }> = {
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
  profile: { name: "Profile", subtitle: "" },
};

// Map tab -> component
const CONTENT: Record<TabKey, React.ComponentType> = {
  home: HomePage,
  pricing: Pricing,
  revenue: Revenue,
  patient: Patient,
  assistant: AIAssistant,
  settings: Settings,
  profile: Profile,
};

export default function Dashboard2() {
  const [active, setActive] = React.useState<TabKey>("home");

  const header = React.useMemo(() => HEADERS[active], [active]);
  const ActivePage = React.useMemo(() => CONTENT[active] ?? HomePage, [active]);

  return (
    <GreenWrapper>
      <div className="!p-6 !h-full bg-[#f3f3ee] flex gap-5 font-outfit">
        <HeldaSidebar
          activeKey={active}
          onChange={(k) => setActive(k as TabKey)}
        />

        <div className="flex-1 flex flex-col gap-0">
          <WelcomeCard
            name={header.name}
            subtitle={header.subtitle}
            avatarSrc="/images/dp.png"
            className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
            setActive={() => setActive("profile")}
          />

          <ActivePage />
        </div>
      </div>
    </GreenWrapper>
  );
}
