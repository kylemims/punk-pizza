import { Link } from "react-router-dom";
import GitHubIcon from "/assets/github-icon.svg";
import LinkedInIcon from "/assets/linked-icon.svg";
import WebsiteIcon from "/assets/website-icon.svg";

export const Footer = () => {
  return (
    <footer className="bg-redriot text-white py-4 flex justify-between items-center px-6 text-sm">
      <div className="flex items-center gap-4">
        <a href="https://github.com/kylemims" target="_blank" rel="noreferrer">
          <img src={GitHubIcon} alt="GitHub" className="w-6 h-6 hover:opacity-80 transition" />
        </a>
        <a href="https://www.linkedin.com/in/kylemims-dev" target="_blank" rel="noreferrer">
          <img src={LinkedInIcon} alt="LinkedIn" className="w-6 h-6 hover:opacity-80 transition" />
        </a>
        <a href="https://kylemims.dev" target="_blank" rel="noreferrer">
          <img src={WebsiteIcon} alt="Website" className="w-6 h-6 hover:opacity-80 transition" />
        </a>
      </div>

      <Link to="/about" className="hover:text-limepunk transition underline font-luckiest text-xs sm:text-sm">
        About This Project
      </Link>

      <a
        href="https://www.kylemims.dev"
        target="_blank"
        rel="noreferrer"
        className="hover:text-limepunk transition underline font-luckiest text-xs sm:text-sm">
        Created by Kyle Mims
      </a>
    </footer>
  );
};
