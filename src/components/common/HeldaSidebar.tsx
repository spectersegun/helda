// "use client";

// type SidebarItem = {
//   key: string;
//   label: string;
//   iconSrc: string;
//   alt: string;
//   to: string;
// };

// type HeldaSidebarProps = {
//   activeKey?: string;
//   items?: SidebarItem[];
//   className?: string;
//   logoSrc?: string;
//   productName?: string;
//   onChange?: (key: string) => void; // <-- NEW
// };

// const DEFAULT_ITEMS: SidebarItem[] = [
//   {
//     key: "home",
//     label: "Home",
//     iconSrc: "/icons/Home.png",
//     alt: "home",
//     to: "/dashboard",
//   },
//   {
//     key: "pricing",
//     label: "Pricing Intelligence",
//     iconSrc: "/icons/pl-icon.png",
//     alt: "Pricing Intelligence",
//     to: "/pricing",
//   },
//   {
//     key: "revenue",
//     label: "Revenue Performance",
//     iconSrc: "/icons/Dollar.png",
//     alt: "Revenue Performance",
//     to: "/revenue",
//   },
//   {
//     key: "patient",
//     label: "Patient Intelligence",
//     iconSrc: "/icons/Two-user.png",
//     alt: "Patient Intelligence",
//     to: "/patient",
//   },
//   {
//     key: "assistant",
//     label: "Helda AI Assistant",
//     iconSrc: "/icons/AIGenerate.png",
//     alt: "Helda AI Assistant",
//     to: "/ai-assistant",
//   },
// ];

// export default function HeldaSidebar({
//   onChange,
//   activeKey = "home",
//   items = DEFAULT_ITEMS,
//   className = "",
//   logoSrc = "/public/images/logo1.png",
//   productName = "Helda Insights",
// }: HeldaSidebarProps) {
//   return (
//     <>
//       <style jsx>{`
//         .helda-sidebar {
//           width: 250px;
//           background: #fcfafa;
//           border-radius: 20px;
//           padding: 24px 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06),
//             0 2px 6px rgba(0, 0, 0, 0.05);
//           transition: all 0.3s ease-in-out;
//         }

//         .helda-sidebar:hover {
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08),
//             0 6px 20px rgba(0, 0, 0, 0.06);
//         }

//         .brand-row {
//           margin-left: 36px;
//           margin-bottom: 40px;
//           display: flex;
//           gap: 6px;
//           justify-content: flex-start;
//           align-items: center;
//           color: white;
//           font-weight: 600;
//           font-size: 18px;
//         }

//         .brand-logo {
//           width: 24px;
//           height: auto;
//           transition: transform 0.5s ease-in-out;
//         }

//         .brand-row:hover .brand-logo {
//           transform: scale(1.1) rotate(12deg);
//         }

//         .brand-title {
//           color: #1f664b;
//           font-size: 20px;
//           font-weight: 700;
//           margin-bottom: 0;
//           transition: color 0.3s ease-in-out;
//         }

//         .brand-row:hover .brand-title {
//           color: #155e46;
//         }

//         .nav-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .nav-list > li + li {
//           margin-top: 4px;
//         }

//         .sidebar-item {
//           position: relative;
//           overflow: hidden;
//         }

//         .sidebar-item::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 4px;
//           height: 100%;
//           background: #1f664b;
//           transform: translateX(-100%);
//           transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .sidebar-item.active::before {
//           transform: translateX(0);
//         }

//         .sidebar-item::after {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(
//             270deg,
//             rgba(31, 102, 75, 0.16) -2.61%,
//             rgba(31, 102, 75, 0.05) 100%
//           );
//           opacity: 0;
//           transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           pointer-events: none;
//         }

//         .sidebar-item.active::after {
//           opacity: 1;
//         }

//         .sidebar-link {
//           display: block;
//           text-decoration: none;
//         }

//         .sidebar-link-content {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           gap: 6px;
//           align-items: center;
//           padding: 16px 0 16px 36px;
//           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .sidebar-item:hover .sidebar-link-content {
//           transform: translateX(2px);
//         }

//         .sidebar-item.active .sidebar-link-content {
//           transform: translateX(4px);
//         }

//         .sidebar-icon {
//           width: 28px;
//           height: auto;
//           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
//             filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .sidebar-item:hover .sidebar-icon {
//           transform: scale(1.1);
//         }

//         .sidebar-item.active .sidebar-icon {
//           transform: scale(1.05);
//           filter: brightness(1.1);
//         }

//         .sidebar-text {
//           color: #1f664b;
//           font-weight: 500;
//           font-size: 16px;
//           transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
//             font-weight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .sidebar-item:hover .sidebar-text {
//           color: #155e46;
//         }

//         .sidebar-item.active .sidebar-text {
//           color: #1f664b;
//           font-weight: 600;
//         }

//         .settings-container {
//           margin-left: 48px;
//         }

//         .settings-item {
//           position: relative;
//           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .settings-item:hover {
//           transform: translateY(-1px);
//         }

//         .settings-item:hover .sidebar-icon {
//           transform: rotate(45deg) scale(1.1);
//         }

//         .settings-link-content {
//           display: flex;
//           gap: 6px;
//           align-items: center;
//           padding: 16px 0 16px 36px;
//         }
//       `}</style>

//       <aside className={`helda-sidebar ${className}`}>
//         <div>
//           <div className="brand-row">
//             <img src={logoSrc} alt="logo" className="brand-logo" />
//             <h2 className="brand-title">{productName}</h2>
//           </div>

//           <div>
//             <ul className="nav-list">
//               {items.map((item) => {
//                 const isActive = activeKey === item.key;
//                 return (
//                   <li
//                     key={item.key}
//                     className={`sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <span
//                       className="sidebar-link"
//                       onClick={() => onChange?.(item.key)}
//                     >
//                       <div className="sidebar-link-content">
//                         <span>
//                           <img
//                             src={item.iconSrc}
//                             alt={item.alt}
//                             className="sidebar-icon"
//                           />
//                         </span>
//                         <span className="sidebar-text">{item.label}</span>
//                       </div>
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>

//         <div className="settings-container">
//           <span onClick={() => onChange?.("settings")} className="sidebar-link">
//             <div className="settings-item">
//               <div className="settings-link-content">
//                 <span>
//                   <img
//                     src="/icons/Settings.png"
//                     alt="Settings"
//                     className="sidebar-icon"
//                   />
//                 </span>
//                 <span className="sidebar-text">Settings</span>
//               </div>
//             </div>
//           </span>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

type SidebarItem = {
  key: string;
  label: string;
  iconSrc: string;
  alt: string;
  to: string; // kept for compatibility
};

type HeldaSidebarProps = {
  activeKey?: string;
  items?: SidebarItem[];
  className?: string;
  logoSrc?: string;
  productName?: string;
  onChange?: (key: string) => void;
};

const DEFAULT_ITEMS: SidebarItem[] = [
  {
    key: "home",
    label: "Home",
    iconSrc: "/icons/Home.png",
    alt: "home",
    to: "/dashboard",
  },
  {
    key: "pricing",
    label: "Pricing Intelligence",
    iconSrc: "/icons/pl-icon.png",
    alt: "Pricing Intelligence",
    to: "/pricing",
  },
  {
    key: "revenue",
    label: "Revenue Performance",
    iconSrc: "/icons/Dollar.png",
    alt: "Revenue Performance",
    to: "/revenue",
  },
  {
    key: "patient",
    label: "Patient Intelligence",
    iconSrc: "/icons/Two-user.png",
    alt: "Patient Intelligence",
    to: "/patient",
  },
  {
    key: "assistant",
    label: "Helda AI Assistant",
    iconSrc: "/icons/AIGenerate.png",
    alt: "Helda AI Assistant",
    to: "/ai-assistant",
  },
];

export default function HeldaSidebar({
  onChange,
  activeKey = "home",
  items = DEFAULT_ITEMS,
  className = "",
  logoSrc = "/images/logo1.png",
  productName = "Helda Insights",
}: HeldaSidebarProps) {
  const ITEM_H = 56;
  const expanded = activeKey === "home";
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.key === activeKey)
  );

  return (
    <>
      <style jsx>{`
        .helda-sidebar {
          background: #fcfafa;
          border-radius: 20px;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06),
            0 2px 6px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease-in-out, width 250ms ease;
          overflow: hidden;
        }
        .helda-sidebar:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08),
            0 6px 20px rgba(0, 0, 0, 0.06);
        }
        /* Width toggles */
        .sidebar--expanded {
          width: 250px;
        }
        .sidebar--compact {
          width: 84px;
        }

        /* Brand row */
        .brand-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
          transition: margin 250ms ease;
        }
        .sidebar--expanded .brand-row {
          margin-left: 36px;
          justify-content: flex-start;
        }
        .sidebar--compact .brand-row {
          margin-left: 0;
          justify-content: center;
        }

        .brand-logo {
          width: 24px;
          height: 24px;
          object-fit: contain;
          transition: transform 0.5s ease-in-out;
        }
        .brand-row:hover .brand-logo {
          transform: scale(1.1) rotate(12deg);
        }

        .brand-title {
          color: #1f664b;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          opacity: 0;
          max-width: 0;
          transition: max-width 250ms ease, opacity 200ms ease,
            margin 200ms ease;
        }
        .sidebar--expanded .brand-title {
          opacity: 1;
          max-width: 160px;
        }

        /* Nav + indicator */
        .nav-wrap {
          position: relative;
        }
        .indicator {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: ${ITEM_H}px;
          background: #1f664b;
          // border-radius: 0 3px 3px 0;
          transform: translateY(${activeIndex * ITEM_H}px);
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        // .nav-list > li + li {
        //   margin-top: 4px;
        // }

        .sidebar-item {
          position: relative;
          overflow: visible;
          height: ${ITEM_H}px;
          display: flex;
          align-items: center;
        }
        .sidebar-item.active::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            270deg,
            rgba(31, 102, 75, 0.16) -2.61%,
            rgba(31, 102, 75, 0.05) 100%
          );
          pointer-events: none;
        }

        .sidebar-link {
          display: block;
          text-decoration: none;
          cursor: pointer;
        }
        .sidebar-link-content {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 100%;
          padding-right: 12px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
            padding-left 250ms ease;
          will-change: transform;
        }
        .sidebar-item:hover .sidebar-link-content {
          transform: translateX(2px);
        }
        .sidebar-item.active .sidebar-link-content {
          transform: translateX(4px);
        }
        .sidebar--expanded .sidebar-link-content {
          padding-left: 36px;
        }
        .sidebar--compact .sidebar-link-content {
          padding-left: 24px;
          justify-content: center;
        }

        .sidebar-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex: 0 0 28px;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .sidebar-item:hover .sidebar-icon {
          transform: scale(1.06);
        }
        .sidebar-item.active .sidebar-icon {
          transform: scale(1.03);
          filter: brightness(1.05);
        }

        /* Label visibility toggles globally */
        .sidebar-text {
          color: #1f664b;
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          opacity: 0;
          max-width: 0;
          margin-left: 0;
          transition: max-width 250ms ease, opacity 200ms ease,
            margin 200ms ease;
        }
        .sidebar--expanded .sidebar-text {
          opacity: 1;
          max-width: 180px;
          margin-left: 6px;
        }

        /* Tooltips for compact mode */
        .sidebar--compact .sidebar-item[data-tooltip]:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          left: 64px;
          top: 50%;
          transform: translateY(-50%);
          background: #1f664b;
          color: #fff;
          font-size: 12px;
          padding: 6px 8px;
          border-radius: 6px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          pointer-events: none;
          white-space: nowrap;
        }

        /* Settings row */
        .settings-container {
          transition: margin 250ms ease;
        }
        .sidebar--expanded .settings-container {
          margin-left: 48px;
        }
        .sidebar--compact .settings-container {
          margin-left: 0;
          display: flex;
          justify-content: center;
        }
        .settings-item .sidebar-icon {
          transition: transform 0.2s ease;
        }
        .settings-item:hover .sidebar-icon {
          transform: rotate(45deg) scale(1.06);
        }
        .settings-link-content {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 16px 0 16px 36px;
        }
        .sidebar--compact .settings-link-content {
          padding-left: 0;
          justify-content: center;
        }
      `}</style>

      <aside
        className={[
          "helda-sidebar",
          expanded ? "sidebar--expanded" : "sidebar--compact",
          className,
        ].join(" ")}
      >
        {/* Brand */}
        <div>
          <div className="brand-row">
            <img src={logoSrc} alt="logo" className="brand-logo" />
            <h2 className="brand-title">{productName}</h2>
          </div>

          {/* Nav */}
          <div className="nav-wrap">
            <div className="indicator" />
            <ul className="nav-list ">
              {items.map((item) => {
                const isActive = activeKey === item.key;
                return (
                  <li
                    key={item.key}
                    className={`sidebar-item ${isActive ? "active" : ""}`}
                    // data-tooltip={expanded ? undefined : item.label}
                  >
                    <span
                      className="sidebar-link"
                      onClick={() => onChange?.(item.key)}
                    >
                      <div className="sidebar-link-content">
                        <img
                          src={item.iconSrc}
                          alt={item.alt}
                          className="sidebar-icon"
                        />
                        <span className="sidebar-text">{item.label}</span>
                      </div>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Settings */}
        <div className="settings-container">
          <span onClick={() => onChange?.("settings")} className="sidebar-link">
            <div className="settings-item">
              <div className="settings-link-content">
                <img
                  src="/icons/Settings.png"
                  alt="Settings"
                  className="sidebar-icon"
                />
                <span className="sidebar-text">Settings</span>
              </div>
            </div>
          </span>
        </div>
      </aside>
    </>
  );
}
