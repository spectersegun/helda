import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAllPageNavigation } from "../../contexts/AllPagesNavigationContext";

interface Props {
  children: React.ReactNode;
}

export default function DeviceGuard({ children }: Props) {
  const { currentView, navigateTo } = useAllPageNavigation();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  const isMobileDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /iphone|android|mobile/i.test(ua) || window.innerWidth < 1280;
  };

  useEffect(() => {
    if (isMobileDevice() && location.pathname !== "/incompatible") {
      navigateTo("incompatible");
    }
    setChecked(true);
  }, [location.pathname, currentView, isMobileDevice]);

  if (!checked) return null;

  return <>{children}</>;
}
