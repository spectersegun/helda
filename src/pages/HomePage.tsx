import AIUnderText from "../components/common/AIUnderText";
import PatientIntelligenceCard from "../components/common/PatientIntelligenceCard";
import PricingIntelCard from "../components/common/PricingIntelCard";
import RevenuePerformanceCard from "../components/common/RevenuePerformanceCard";
import UIHomeCard from "../components/common/UIHomeCard";
import { useNavigation } from "../contexts/NavigationContext";
// import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function HomePage() {
  const { navigateToTab } = useNavigation();

  return (
    <div className="grid grid-cols-1 gap-6 items-stretch flex-1 !relative mt-5 overflow-y-auto !pb-10 !bt-5 hide-native-scrollbar !p-2 ">
      <div className="grid grid-cols-3 gap-x-7 ">
        <PricingIntelCard />
        <RevenuePerformanceCard />
        <PatientIntelligenceCard />
      </div>

      <div className="grid grid-cols-3 gap-x-7">
        <div
          className="bg-white rounded-[18px] !p-2.5 hover:shadow-[0_4px_7px_3px_rgba(31,102,75,0.78)] cursor-pointer transition-shadow duration-300 ease-in-out"
          onClick={() => navigateToTab("assistant")}
        >
          <h2 className="text-[#1F664B] !text-2xl text-center text-medium ">
            Helda AI Assistant
          </h2>

          <div className="grid place-items-center !mb-2 !py-5">
            <div className="w-[200px] max-w-full h-[200px] aspect-[1/1] overflow-hidden rounded-full !relative">
              <video
                src="/assets/AIBlob.web.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[750px] h-auto  object-cover object-center origin-center [transform:scale(4.65)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AIUnderText
              text="“What are the top 3 services"
              subText="driving revenue this month?”"
            />

            <AIUnderText
              text="“What are the top 3 services "
              subText="driving revenue this month?”"
            />

            <AIUnderText
              text="“Show me the new vs returning"
              subText="patient trends for Q2.”"
            />

            <AIUnderText
              text="“Which services need pricing"
              subText="adjustments based on "
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <div className="relative flex justify-center items-center">
              <span className="absolute w-full !border-t !border-[#BAB6B6]"></span>
              <h3
                className={`relative z-10 !text-lg !font-semibold !p-2.5 min-w-[340px] !border !border-[#BAB6B6] rounded-lg !text-center leading-6 !mb-0 bg-white `}
              >
                Unified Intelligence
              </h3>
              {/* <span className="w-[80px] !border-t !border-[#BAB6B6]"></span> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 !mt-7 ">
            <UIHomeCard
              title="Patient Volume vs Revenue"
              subtitle="Diabetes Checkups grew 30%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Pricing vs Patient "
              subtitle="Charges for Spinal Surgery rose 20%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Underutilised High-Charge Services"
              subtitle="Diabetes Checkups grew 30%"
              trend="but total revenue declined — revisit pricing"
            />

            <UIHomeCard
              title="Payer Mix vs Profitability"
              subtitle="Cardiology services has the highest average charge"
              trend="but total revenue declined — revisit pricing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function HomeEnterOrchestrator({
  children,
  play = true,
}: {
  children: React.ReactNode;
  play?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!play || !scope.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set(
        [
          "[data-topcards] > *",
          "[data-helda]",
          "[data-helda] [data-suggestions] > *",
          "[data-divider]",
          "[data-title]",
          "[data-grid] > *",
        ],
        { opacity: 0, y: 16 }
      );

      gsap.set("[data-bubble]", {
        opacity: 0,
        scale: 0.7,
        filter: "blur(6px)",
        transformOrigin: "50% 50%",
        willChange: "transform, opacity, filter",
      });

      tl.fromTo(scope.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

      tl.to(
        "[data-topcards] > *",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: { each: 0.08, from: "center" },
        },
        "+=0.05"
      );

      tl.to("[data-helda]", { opacity: 1, y: 0, duration: 0.45 }, "-=0.15");

      tl.to(
        "[data-bubble]",
        {
          opacity: 1,
          scale: 1.04,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "back.out(1.6)",
        },
        "-=0.2"
      ).to(
        "[data-bubble]",
        { scale: 1, duration: 0.18, ease: "power3.inOut" },
        "<"
      );

      tl.to(
        "[data-helda] [data-suggestions] > *",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
        },
        "-=0.1"
      );

      tl.to(
        "[data-divider]",
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.05"
      ).to("[data-title]", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

      tl.to(
        "[data-grid] > *",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: { each: 0.08, from: "edges" },
          ease: "power2.out",
        },
        "-=0.05"
      );
    }, scope);

    return () => ctx.revert();
  }, [play]);

  return <div ref={scope}>{children}</div>;
}
