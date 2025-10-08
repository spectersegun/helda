import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function DeviceGuard({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  const isMobileDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /iphone|android|mobile/i.test(ua) || window.innerWidth < 1280;
  };

  useEffect(() => {
    if (isMobileDevice() && location.pathname !== "/incompatible") {
      navigate("/incompatible", { replace: true });
    }
    setChecked(true);
  }, [location.pathname, navigate]);

  if (!checked) return null;

  return <>{children}</>;
}
