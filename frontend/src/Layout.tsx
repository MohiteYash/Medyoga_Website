import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { contact, programs } from "./content";

function Brand() {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="Swasthya Medical Yoga Institute home"
    >
      <span className="brand-emblem" aria-hidden="true">
        स्व
      </span>
      <span>
        Swasthya<small>MEDICAL YOGA INSTITUTE</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    setOpen(false);
    const frame = requestAnimationFrame(() => {
      const destination = hash ? document.getElementById(hash.slice(1)) : null;
      if (destination) destination.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const signedIn = Boolean(localStorage.getItem("medyoga_token"));
  const links = [
    ["Home", "/"],
    ["About Us", "/about"],
    ["Medical Yoga", "/medical-yoga"],
    ["Programs", "/programs"],
    ["Courses", "/courses"],
    ["Consultations", "/booking"],
    ["Resources", "/blog"],
    ["Contact", "/contact"],
  ];
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="container">
          <span>
            <MapPin size={13} /> Pune & Navi Mumbai{" "}
            <span className="utility-separator">|</span> Online & in-person care
          </span>
          <a href="tel:+919355441199">
            <Phone size={12} /> {contact.phone}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="site-navigation"
            className={open ? "site-nav is-open" : "site-nav"}
            aria-label="Main navigation"
          >
            {links.map(([label, path]) => (
              <NavLink key={path} end={path === "/"} to={path}>
                {label}
              </NavLink>
            ))}
            <Link
              className="mobile-login"
              to={signedIn ? "/dashboard" : "/login"}
            >
              {signedIn ? "My learning" : "Student login"}
            </Link>
          </nav>
          <div className="header-actions">
            <Link
              className="login-link"
              to={signedIn ? "/dashboard" : "/login"}
            >
              {signedIn ? "My learning" : "Login"}
            </Link>
            <Link className="btn btn-small" to="/booking">
              <CalendarDays size={15} /> Book a Consultation
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <Brand />
          <p>
            Bringing together yogic tradition and thoughtful movement education.
            Care, learning, and guidance for everyday wellbeing.
          </p>
          <div className="social-links">
            <a href={contact.instagram} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight size={13} />
            </a>
            <a href={contact.youtube} target="_blank" rel="noreferrer">
              YouTube <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div>
          <h3>Our institute</h3>
          <Link to="/about">About Swasthya</Link>
          <Link to="/medical-yoga">Medical Yoga</Link>
          <Link to="/courses">Courses & learning</Link>
          <Link to="/blog">Educational resources</Link>
          <Link to="/faq">Frequently asked questions</Link>
          <Link to="/login">Student login</Link>
        </div>
        <div>
          <h3>Our programs</h3>
          {programs.map((program) => (
            <Link key={program.slug} to={`/programs/${program.slug}`}>
              {program.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href="tel:+919355441199">{contact.phone}</a>
          <p>
            Pune & Navi Mumbai
            <br />
            Maharashtra, India
          </p>
          <a href={contact.location} target="_blank" rel="noreferrer">
            Find us in Nerul <ArrowUpRight size={13} />
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer">
            Enquire on WhatsApp
          </a>
          <Link to="/booking">Request an appointment</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Swasthya Medical Yoga Institute
        </span>
        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
      <div className="container footer-note">
        Yoga education and guided movement complement individual care. Please
        seek qualified medical advice for health concerns. Illustrative studio
        photographs are AI-generated.
      </div>
    </footer>
  );
}
