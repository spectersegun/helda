type ViewItem = {
  key: string;
  label: string;
  info?: string; // tooltip text for info icon
};

type InsightViewToggleProps = {
  items: ViewItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
};

export default function InsightViewToggle({
  items,
  activeKey,
  onChange,
  className = "",
}: InsightViewToggleProps) {
  // colors — use your design tokens if you have them
  // green used in the screenshot: #1f664b
  const brandGreen = "#1f664b";

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      role="tablist"
      aria-label="Insight view selector"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(item.key)}
            className={`
              relative flex items-center gap-3 select-none
              rounded-full
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${brandGreen}]
              ${
                isActive
                  ? "bg-[rgba(31,102,75,1)] text-white shadow-sm"
                  : "bg-white text-[#0f1724] border border-gray-200"
              }
              px-4 py-2
            `}
            title={item.label}
          >
            {/* Label */}
            <span className="text-sm font-medium leading-none">
              {item.label}
            </span>

            {/* circled "i" icon */}
            <span
              className={`
                ml-1 flex items-center justify-center rounded-full
                border-[1.5px] 
                ${isActive ? "border-white" : "border-[rgba(31,102,75,1)]"}
                w-6 h-6
                bg-white/0
              `}
              // show tooltip on info icon hover using title, or you can swap with a custom tooltip lib
              title={item.info ?? "More info"}
              aria-hidden={item.info ? undefined : true}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke={isActive ? "#ffffff" : brandGreen}
                  strokeWidth="0"
                  fill="transparent"
                />
                <rect
                  x="11"
                  y="10"
                  width="2"
                  height="6"
                  rx="1"
                  fill={isActive ? "#ffffff" : brandGreen}
                />
                <circle
                  cx="12"
                  cy="7.5"
                  r="0.9"
                  fill={isActive ? "#ffffff" : brandGreen}
                />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}
