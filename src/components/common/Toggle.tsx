import { useEffect, useMemo, useState } from "react";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  trackOn?: string;
  trackOff?: string;
  designWidth?: number;
  designHeight?: number;
};

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  trackOn = "#174191",
  trackOff = "#EFEFEF",
  designWidth = 1980,
  designHeight = 1080,
}: Props) {
  const DESIGN = useMemo(
    () => ({
      W: 150,
      H: 55,
      KNOB_W: 80,
      R: 10,
    }),
    []
  );

  const [scale, setScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    return Math.min(
      window.innerWidth / designWidth,
      window.innerHeight / designHeight
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      const s =
        Math.min(
          window.innerWidth / designWidth,
          window.innerHeight / designHeight
        ) || 1;
      setScale(s);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [designWidth, designHeight]);

  const W = Math.round(DESIGN.W * scale);
  const H = Math.round(DESIGN.H * scale);
  const KNOB_W = Math.round(DESIGN.KNOB_W * scale);
  const R = Math.round(DESIGN.R * scale);
  const translateX = W - KNOB_W;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="toggle"
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={[
        "relative inline-flex items-center select-none !outline-none !bg-inherit ",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      style={{ width: W, height: H }}
    >
      <span
        className="absolute inset-0 rounded-lg transition-colors"
        style={{
          background: checked ? trackOn : trackOff,
          borderRadius: R,
        }}
      />

      <span
        className="relative z-[1] h-full rounded-lg !border border-black bg-white shadow-sm transition-transform duration-300 ease-out"
        style={{
          width: KNOB_W,
          transform: `translateX(${checked ? translateX : 0}px)`,
          borderRadius: R,
        }}
      />
    </button>
  );
}
