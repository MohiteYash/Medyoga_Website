import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";

export function Page({
  title,
  eyebrow,
  subtitle,
  children,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" to="/">
            Home / {eyebrow || title}
          </Link>
          <span className="eyebrow">{eyebrow || "SWASTHYA MEDICAL YOGA"}</span>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
      <section className="section">
        <div className="container">{children}</div>
      </section>
    </main>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  text,
  to,
  label,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  to?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {label || "Explore more"} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="feedback error" role="alert">
      {children}
    </div>
  );
}
export function errorText(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.status >= 500) return fallback;
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (error.response?.status === 422)
      return "Please check the information you entered.";
  }
  return fallback;
}
export function Image({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const localImage = src.startsWith("/assets/images/") && src.endsWith(".webp");
  return (
    <img
      className={className}
      src={src}
      srcSet={
        localImage
          ? `${src.replace(".webp", "-720.webp")} 720w, ${src} 1440w`
          : undefined
      }
      sizes={
        localImage
          ? "(max-width: 700px) calc(100vw - 36px), (max-width: 1200px) 50vw, 600px"
          : undefined
      }
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      width="1200"
      height="800"
    />
  );
}
