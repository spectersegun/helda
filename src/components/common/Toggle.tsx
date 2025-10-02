// Toggle.tsx
"use client";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  trackOn?: string; // e.g. "#174191"
  trackOff?: string; // e.g. "#EDEDED"
};

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  trackOn = "#174191", // dark blue like your mock
  trackOff = "#EFEFEF",
}: Props) {
  // dimensions chosen to match the screenshot proportions
  const W = 120; // track width
  const H = 46; // track height
  const KNOB_W = 66; // rectangular knob width
  const R = 8; // radii for both track & knob
  const translateX = W - KNOB_W; // 120 - 66 = 54px

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
        // "focus:!outline-none focus:ring-2 focus:ring-offset-2",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      style={{ width: W, height: H }}
    >
      {/* Track */}
      <span
        className="absolute inset-0 rounded-lg transition-colors"
        style={{ background: checked ? trackOn : trackOff, borderRadius: R }}
      />

      {/* Knob (sits on top; rectangular with rounded corners & black border) */}
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
