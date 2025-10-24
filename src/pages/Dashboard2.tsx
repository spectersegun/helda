// import React from "react";
// import GreenWrapper from "../components/common/GreenWrapper";
// import WelcomeCard from "../components/common/WelcomeCard";
// import HeldaSidebar from "../components/common/HeldaSidebar";
// import {
//   NavigationProvider,
//   useNavigation,
//   type TabKey,
// } from "../contexts/NavigationContext";
// import HomePage from "./HomePage";
// import Pricing from "./Pricing";
// import Revenue from "./Revenue";
// import Settings from "./Settings";
// import Profile from "./Profile";

// const Patient = React.lazy(() => import("./Patient"));
// const AIAssistant = React.lazy(() => import("./AIAssistant"));

// const HEADERS: Record<TabKey, { name: string; subtitle?: string }> = {
//   home: {
//     name: "Welcome Mayowa",
//     subtitle:
//       "Your intelligent hub for patient trends, service pricing and revenue performance",
//   },
//   pricing: {
//     name: "Pricing Intelligence",
//     subtitle:
//       "Your smart command center for real-time service pricing trends, competitor benchmarks, and revenue impact insights.",
//   },
//   revenue: {
//     name: "Revenue Performance",
//     subtitle:
//       "Your financial pulseboard for tracking income by service, department, and payer — spotlighting growth drivers and underperformers in real time.",
//   },
//   patient: {
//     name: "Patient Intelligence",
//     subtitle:
//       "Your engagement dashboard for uncovering patient behavior, loyalty trends, and population insights — helping you tailor care and boost retention.",
//   },
//   assistant: {
//     name: "Helda AI Assistant",
//     subtitle:
//       "Your AI partner for instant answers and insights — helping you make faster, smarter healthcare decisions.",
//   },
//   settings: { name: "Settings", subtitle: "" },
//   profile: { name: "My Profile", subtitle: "" },
// };

// const CONTENT: Record<TabKey, React.ComponentType> = {
//   home: HomePage,
//   pricing: Pricing,
//   revenue: Revenue,
//   patient: Patient,
//   assistant: AIAssistant,
//   settings: Settings,
//   profile: Profile,
// };

// const DashboardContent: React.FC = () => {
//   const { activeTab, navigateToTab } = useNavigation();

//   const header = React.useMemo(() => HEADERS[activeTab], [activeTab]);
//   const ActivePage = React.useMemo(
//     () => CONTENT[activeTab] ?? HomePage,
//     [activeTab]
//   );

//   return (
//     <GreenWrapper>
//       <div className="!p-6 !h-full bg-[#f3f3ee] flex gap-5 font-outfit">
//         <HeldaSidebar
//           activeKey={activeTab}
//           onChange={(key: string) => navigateToTab(key as TabKey)}
//         />

//         <div className="flex-1 flex flex-col gap-0">
//           <WelcomeCard
//             name={header.name}
//             subtitle={header.subtitle}
//             avatarSrc="/images/dp.png"
//             className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
//             onProfileClick={() => navigateToTab("profile")}
//           />

//           <React.Suspense
//             fallback={
//               <div className="flex items-center justify-center p-8">
//                 <div className="w-8 h-8 border-2 border-nigeria-green border-t-transparent rounded-full animate-spin" />
//               </div>
//             }
//           >
//             <ActivePage />
//           </React.Suspense>
//         </div>
//       </div>
//     </GreenWrapper>
//   );
// };

// export default function Dashboard2() {
//   return (
//     <NavigationProvider defaultTab="home">
//       <DashboardContent />
//     </NavigationProvider>
//   );
// }

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GreenWrapper from "../components/common/GreenWrapper";
import WelcomeCard from "../components/common/WelcomeCard";
import HeldaSidebar from "../components/common/HeldaSidebar";
import {
  NavigationProvider,
  useNavigation,
  type TabKey,
} from "../contexts/NavigationContext";
import HomePage from "./HomePage";
import Pricing from "./Pricing";
import Revenue from "./Revenue";
import Settings from "./Settings";
import Profile from "./Profile";
import { HEADERS } from "../constant";

const Patient = React.lazy(() => import("./Patient"));
const AIAssistant = React.lazy(() => import("./AIAssistant"));

const CONTENT: Record<TabKey, React.ComponentType> = {
  home: HomePage,
  pricing: Pricing,
  revenue: Revenue,
  patient: Patient,
  assistant: AIAssistant,
  settings: Settings,
  profile: Profile,
};

const DashboardContent: React.FC = () => {
  const { activeTab, navigateToTab } = useNavigation();
  const header = React.useMemo(() => HEADERS[activeTab], [activeTab]);
  const ActivePage = React.useMemo(
    () => CONTENT[activeTab] ?? HomePage,
    [activeTab]
  );

  // Animation state control
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const sidebarTimer = setTimeout(() => setShowSidebar(true), 300);
    const headerTimer = setTimeout(() => setShowHeader(true), 600);
    const contentTimer = setTimeout(() => setShowContent(true), 900);

    return () => {
      clearTimeout(sidebarTimer);
      clearTimeout(headerTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <GreenWrapper>
      <div className="!p-[3vh] !h-full bg-[#f3f3ee] flex gap-[1.2vw] font-outfit ">
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              className="!h-full"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <HeldaSidebar
                activeKey={activeTab}
                onChange={(key: string) => navigateToTab(key as TabKey)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col gap-0">
          <AnimatePresence>
            {showHeader && (
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <WelcomeCard
                  name={header.name}
                  subtitle={header.subtitle}
                  avatarSrc="/images/dp.png"
                  className="!shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.05)]"
                  onProfileClick={() => navigateToTab("profile")}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content animation */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 h-full"
                >
                  <React.Suspense
                    fallback={
                      <div className="flex items-center justify-center p-8  ">
                        <div className="w-8 h-8 border-2 border-nigeria-green border-t-transparent rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <ActivePage />
                  </React.Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </GreenWrapper>
  );
};

export default function Dashboard2() {
  return (
    <NavigationProvider defaultTab="home">
      <DashboardContent />
    </NavigationProvider>
  );
}
