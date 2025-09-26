"use client";

import { Link } from "react-router-dom";

type SidebarItem = {
  key: string;
  label: string;
  iconSrc: string;
  alt: string;
  to: string;
};

type HeldaSidebarProps = {
  activeKey?: string;
  items?: SidebarItem[];
  settingsTo?: string;
  className?: string;
  logoSrc?: string;
  productName?: string;
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

export default function HeldaSidebar2({
  activeKey = "home",
  items = DEFAULT_ITEMS,
  settingsTo = "/settings",
  className = "",
  logoSrc = "/public/images/logo1.png",
}: HeldaSidebarProps) {
  return (
    <>
      <style jsx>{`
        .helda-sidebar {
          width: 80px;
          background: #fcfafa;
          border-radius: 20px;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06),
            0 2px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out;
        }

        .helda-sidebar:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08),
            0 6px 20px rgba(0, 0, 0, 0.06);
        }

        .brand-row {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          gap: 6px;
          align-items: center;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }

        .brand-logo {
          width: 24px;
          height: auto;
          transition: transform 0.5s ease-in-out;
        }

        .brand-row:hover .brand-logo {
          transform: scale(1.1) rotate(12deg);
        }

        .brand-title {
          color: #1f664b;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 0;
          transition: color 0.3s ease-in-out;
        }

        .brand-row:hover .brand-title {
          color: #155e46;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-list > li + li {
          margin-top: 4px;
        }

        .sidebar-item {
          position: relative;
          overflow: hidden;
        }

        .sidebar-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #1f664b;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-item.active::before {
          transform: translateX(0);
        }

        .sidebar-item::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            270deg,
            rgba(31, 102, 75, 0.16) -2.61%,
            rgba(31, 102, 75, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .sidebar-item.active::after {
          opacity: 1;
        }

        .sidebar-link {
          width: 100%;
          display: flex;
          justify-content: center;
          text-decoration: none;
        }

        .sidebar-link-content {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 16px 0 16px 0px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-item:hover .sidebar-link-content {
          transform: translateX(2px);
        }

        .sidebar-item.active .sidebar-link-content {
          transform: translateX(4px);
        }

        .sidebar-icon {
          width: 28px;
          height: auto;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-item:hover .sidebar-icon {
          transform: scale(1.1);
        }

        .sidebar-item.active .sidebar-icon {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .sidebar-text {
          color: #1f664b;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            font-weight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-item:hover .sidebar-text {
          color: #155e46;
        }

        .sidebar-item.active .sidebar-text {
          color: #1f664b;
          font-weight: 600;
        }

        .settings-container {
          display: flex;
          align-items: center;
          justify-items: center;
        }

        .settings-item {
          position: relative;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .settings-item:hover {
          transform: translateY(-1px);
        }

        .settings-item:hover .sidebar-icon {
          transform: rotate(45deg) scale(1.1);
        }

        .settings-link-content {
          display: flex;
          gap: 6px;
          align-items: center;
        }
      `}</style>

      <aside className={`helda-sidebar ${className}`}>
        <div>
          <div className="brand-row">
            <img src={logoSrc} alt="logo" className="brand-logo" />
          </div>

          <div>
            <ul className="nav-list">
              {items.map((item) => {
                const isActive = activeKey === item.key;
                return (
                  <li
                    key={item.key}
                    className={`sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <Link to={item.to} className="sidebar-link">
                      <div className="sidebar-link-content">
                        <span>
                          <img
                            src={item.iconSrc}
                            alt={item.alt}
                            className="sidebar-icon"
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="settings-container">
          <Link to={settingsTo} className="sidebar-link">
            <div className="settings-item">
              <div className="settings-link-content">
                <span>
                  <img
                    src="/icons/Settings.png"
                    alt="Settings"
                    className="sidebar-icon"
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
