import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";
import Reveal from "../components/Reveal";

const InstagramIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const XIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9l5 3-5 3z" />
  </svg>
);

const platformLinks = [
  { label: "Home", to: "/" },
  { label: "Track Complaint", to: "/track" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "FAQs", to: "/faqs" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

const taglines = ["Cleaner Roads", "Safer Communities", "A Better Tomorrow"];

function Footer() {
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-[#263D30] text-[#F5F3EC] relative z-10">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#F5F3EC]/40 flex items-center justify-center">
                  <Sprout size={22} />
                </div>
                <span className="text-3xl font-serif font-light tracking-wide">xeuj</span>
              </Link>

              <p className="text-[#F5F3EC]/75 text-sm leading-relaxed mt-6 max-w-xs">
                Xeuj is a civic issue complaint platform that helps you report road waste,
                damages and other civic issues, and track their progress.
              </p>

              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-[#F5F3EC]/25 flex items-center justify-center hover:bg-[#F5F3EC]/10 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F3EC]/60 mb-6">
                Platform
              </h4>
              <ul className="space-y-3">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#F5F3EC]/85 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F3EC]/60 mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#F5F3EC]/85 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F3EC]/60 mb-6">
                Stay Connected
              </h4>
              <p className="text-sm text-[#F5F3EC]/85 leading-relaxed mb-6">
                Get updates on new features, important notices and more.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 rounded-full border border-[#F5F3EC]/30 pl-5 pr-1.5 py-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-[#F5F3EC]/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-10 h-10 rounded-full bg-[#A8C3A0] text-[#263D30] flex items-center justify-center hover:bg-[#B9D1B2] transition shrink-0"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-[#F5F3EC]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#F5F3EC]/70">
            <p>© {year} Xeuj. All rights reserved.</p>

            <div className="flex items-center gap-3">
              {taglines.map((text, index) => (
                <span key={text} className="flex items-center gap-3">
                  {index > 0 && <span className="text-[#F5F3EC]/30">|</span>}
                  {text}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default Footer;