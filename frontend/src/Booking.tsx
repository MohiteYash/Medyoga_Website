import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Monitor,
} from "lucide-react";
import { api } from "./api";
import { assets, programs } from "./content";
import { ErrorMessage, errorText, Image, Page } from "./ui";

export default function Booking() {
  const [params] = useSearchParams();
  const program = programs.find((item) => item.slug === params.get("program"));
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Online session",
    date: "",
    message: program ? `I would like guidance about ${program.title}.` : "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState<number | null>(null);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post("/bookings", form);
      setReference(data.id);
    } catch (error) {
      setError(
        errorText(
          error,
          "Your request could not be saved. Please try again or contact the team.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  const today = new Date();
  const minimumDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <Page
      eyebrow="CONSULTATIONS & APPOINTMENTS"
      title="Let’s find your starting point."
      subtitle="Request an online or in-person appointment. The team will contact you to confirm availability and next steps."
    >
      <div className="booking-layout">
        <div>
          <Image
            className="booking-image"
            src={assets.therapy}
            alt="Illustrative attentive movement consultation"
          />
          <h2>
            Personal attention,
            <br />
            from the first conversation.
          </h2>
          <p>
            Share what brings you here, choose a preferred format, and let us
            know a date that works for you.
          </p>
          <div className="appointment-steps">
            <div>
              <Monitor />
              <span>
                <strong>Online consultation</strong>Connect from a comfortable
                space at home.
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <strong>In-person consultation</strong>Enquire about Pune or
                Navi Mumbai availability.
              </span>
            </div>
            <div>
              <CalendarDays />
              <span>
                <strong>Confirmation from the team</strong>Your request becomes
                an appointment once confirmed.
              </span>
            </div>
          </div>
        </div>
        <form className="form-card booking-form" onSubmit={submit}>
          {reference !== null ? (
            <div className="success-state" role="status">
              <CheckCircle2 size={42} />
              <h2>We’ve received your request.</h2>
              <p>
                Your reference is #{reference}. The team will contact you to
                confirm the date, format, and availability.
              </p>
              <Link className="btn" to="/programs">
                Explore programs
              </Link>
            </div>
          ) : (
            <>
              <div>
                <span className="eyebrow">APPOINTMENT REQUEST</span>
                <h2>How can we help?</h2>
                <p className="small-text">Fields marked * are required.</p>
              </div>
              <fieldset className="format-picker">
                <legend>Preferred consultation *</legend>
                {["Online session", "In-person session"].map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="session-type"
                      value={type}
                      checked={form.type === type}
                      onChange={() => setForm({ ...form, type })}
                    />
                    {type === "Online session" ? (
                      <Monitor size={17} />
                    ) : (
                      <MapPin size={17} />
                    )}
                    {type}
                  </label>
                ))}
              </fieldset>
              <label>
                Full name *
                <input
                  autoComplete="name"
                  maxLength={120}
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </label>
              <div className="form-row">
                <label>
                  Email address *
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                  />
                </label>
                <label>
                  Phone number *
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={40}
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                  />
                </label>
              </div>
              <label>
                Preferred date
                <input
                  type="date"
                  min={minimumDate}
                  value={form.date}
                  onChange={(event) =>
                    setForm({ ...form, date: event.target.value })
                  }
                />
              </label>
              <label>
                What would you like help with?
                <textarea
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us your goals or questions. Share only information you are comfortable sending."
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                />
              </label>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <p className="small-text">
                We’ll use your contact details to respond to this request.{" "}
                <Link to="/privacy">Privacy information</Link>
              </p>
              <button className="btn full" disabled={busy}>
                {busy ? "Sending your request…" : "Request an Appointment"}{" "}
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </form>
      </div>
    </Page>
  );
}
