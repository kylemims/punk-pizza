import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomTabNav.css";

export const BottomTabNav = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const tabItems = [
    { icon: "/src/assets/pizza-home.svg", label: "Home", path: "/" },
    { icon: "/src/assets/add-new.svg", label: "New Pie", path: "/pizza-builder" },
    { icon: "/src/assets/reports-icon.svg", label: "Reports", path: "/reports" },
    {
      icon: "/src/assets/profile.svg",
      label: "Developer",
      action: "profile",
    },
  ];

  const profileLinks = [
    {
      icon: "/src/assets/email.svg",
      label: "Email Me",
      href: "mailto:kylemims.dev@gmail.com",
      external: true,
    },
    {
      icon: "/src/assets/github.svg",
      label: "GitHub",
      href: "https://www.github.com/kylemims",
      external: true,
    },
    {
      icon: "/src/assets/linked.svg",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kylemims-dev/",
      external: true,
    },
    {
      icon: "/src/assets/portfolio.svg",
      label: "Portfolio",
      href: "https://www.kylemims.com", // Update when deployed
      external: true,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (item) => {
    if (item.action === "profile") {
      setShowProfileDropdown(!showProfileDropdown);
    } else {
      setShowProfileDropdown(false);
      navigate(item.path);
    }
  };

  const handleProfileLinkClick = (link) => {
    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    } else {
      navigate(link.href);
    }
    setShowProfileDropdown(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Hide on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <>
      <div className="bottom-tab-nav">
        <div className="tab-container">
          {tabItems.map((item, index) => (
            <button
              key={index}
              className={`tab-item ${isActive(item.path) ? "active" : ""} ${
                item.action === "profile" ? "profile-tab" : ""
              }`}
              onClick={() => handleTabClick(item)}
              aria-label={item.label}>
              <img src={item.icon} alt={item.label} className="tab-icon" />
              <span className="tab-label">{item.label}</span>
              {item.action === "profile" && <div className="profile-indicator" />}
            </button>
          ))}
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div className="developer-intro">
              <div className="developer-avatar">
                <span>KM</span>
              </div>
              <h4>Kyle Mims</h4>
              <p>Full-Stack Developer</p>
              <div className="tech-stack">
                <span>JavaScript</span>
                <span>React</span>
                <span>Python</span>
                <span>Django</span>
              </div>
            </div>

            <div className="contact-links">
              {profileLinks.map((link, index) => (
                <button key={index} className="contact-link" onClick={() => handleProfileLinkClick(link)}>
                  <img src={link.icon} alt={link.label} />
                  <span>{link.label}</span>
                  <svg className="external-icon" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H7.29289L3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355C3.34171 9.04882 3.65829 9.04882 3.85355 8.85355L8 4.70711V8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5V3.5C9 3.22386 8.77614 3 8.5 3H3.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <div className="project-footer">
              <p>Thanks for taking a bite!</p>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {showProfileDropdown && (
        <div className="dropdown-backdrop" onClick={() => setShowProfileDropdown(false)} />
      )}
    </>
  );
};
