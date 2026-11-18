import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MapPin, Monitor, Phone } from "lucide-react";
import { assets, contact, programs } from "./content";
import { ExpertSection, ProgramGrid } from "./HealthcareHome";
import { Image, Page } from "./ui";

export function About() {
  return (
    <Page
      eyebrow="ABOUT OUR INSTITUTE"
      title="Care, learning, and the wisdom of yoga."
      subtitle="Meet Swasthya Medical Yoga Institute, a space for therapeutic movement and thoughtful education."
    >
      <div className="split-layout">
        <Image
          className="rounded-image"
          src={assets.studio}
          alt="Illustrative medical yoga studio"
        />
        <div>
          <span className="eyebrow">OUR PHILOSOPHY</span>
          <h2>
            A personal approach
            <br />
            to everyday movement.
          </h2>
          <p>
            Our work connects traditional yoga practice with movement awareness,
            rehabilitation-oriented education, and opportunities for structured
            learning.
          </p>
          <p>
            We focus on listening first. Understanding your starting point helps
            the team discuss suitable practice, adaptations, and next steps.
          </p>
          <ul className="check-list">
            <li>
              <Check /> Guided therapeutic movement
            </li>
            <li>
              <Check /> Individual goals and learning needs
            </li>
            <li>
              <Check /> Online and in-person opportunities
            </li>
          </ul>
          <Link className="btn" to="/programs">
            Explore our programs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <section id="expert" className="inner-section">
        <ExpertSection full />
      </section>
    </Page>
  );
}
export function Medical() {
  return (
    <Page
      eyebrow="MEDICAL YOGA"
      title="A mindful approach to therapeutic movement."
      subtitle="Explore yoga adapted to individual movement needs, with guided practice and an understanding of your existing care."
    >
      <div className="split-layout">
        <div>
          <span className="eyebrow">UNDERSTANDING THE APPROACH</span>
          <h2>
            Begin with your body.
            <br />
            Build with guidance.
          </h2>
          <p>
            Medical yoga brings attention to movement, posture, breath, and the
            ways a practice can be adapted. The first step is understanding your
            goals and circumstances.
          </p>
          <p>
            Our program pathways focus on spine and joint awareness, therapeutic
            practice, and a gradual approach to activity. A consultation helps
            identify what guidance to seek before starting.
          </p>
          <Link className="btn" to="/booking">
            Discuss your needs <ArrowRight size={16} />
          </Link>
        </div>
        <Image
          className="rounded-image"
          src={assets.therapy}
          alt="Illustrative instructor observing a comfortable seated movement"
        />
      </div>
      <div className="notice">
        If you have an injury or health condition, seek individual medical
        advice before changing your exercise routine. Program suitability is
        discussed with the team.
      </div>
      <section className="inner-section">
        <h2>Explore our program pathways</h2>
        <ProgramGrid />
      </section>
    </Page>
  );
}
export function Programs() {
  return (
    <Page
      eyebrow="OUR PROGRAMS"
      title="Find a starting point that suits you."
      subtitle="Explore medical yoga and guided movement pathways. The team can help you understand suitability and available session formats."
    >
      <ProgramGrid />
      <div className="help-banner">
        <div>
          <h3>Unsure where to begin?</h3>
          <p>A conversation can help you understand the options.</p>
        </div>
        <Link className="btn" to="/booking">
          Book a Consultation <ArrowRight size={16} />
        </Link>
      </div>
    </Page>
  );
}
export function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);
  if (!program)
    return (
      <Page title="Program not found">
        <Link className="btn" to="/programs">
          Browse programs
        </Link>
      </Page>
    );
  const Icon = program.icon;
  return (
    <Page
      eyebrow="MEDICAL YOGA PROGRAM"
      title={program.title}
      subtitle={program.description}
    >
      <div className="split-layout">
        <Image
          className="rounded-image"
          src={slug === "neck-shoulder-care" ? assets.therapy : assets.movement}
          alt="Illustrative guided therapeutic movement practice"
        />
        <div>
          <div className="program-icon">
            <Icon size={30} />
          </div>
          <h2>
            Guided practice,
            <br />
            at your starting point.
          </h2>
          <p>
            Discuss your movement history, current concerns, and goals with the
            team. Session format, pacing, and any adaptations will depend on
            your individual circumstances.
          </p>
          <h3>Areas to explore</h3>
          <ul className="check-list">
            {program.focus.map((focus) => (
              <li key={focus}>
                <Check /> {focus}
              </li>
            ))}
          </ul>
          <div className="button-row">
            <Link className="btn" to={`/booking?program=${program.slug}`}>
              Request a consultation <ArrowRight size={16} />
            </Link>
            <Link className="text-link" to="/programs">
              All programs
            </Link>
          </div>
        </div>
      </div>
      <div className="notice">
        Online and in-person availability is confirmed by the team. Please bring
        relevant clinical advice to your consultation if you are managing an
        injury or health condition.
      </div>
      <div className="three-step-grid inner-section">
        {[
          [
            "Share your goals",
            "Tell us what brings you here and choose your preferred session format.",
          ],
          [
            "Discuss your starting point",
            "The team will contact you to understand your needs and confirm availability.",
          ],
          [
            "Plan your practice",
            "Discuss a paced approach and any individual guidance you need before beginning.",
          ],
        ].map(([title, text]) => (
          <div className="info-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}
export function Contact() {
  return (
    <Page
      eyebrow="CONTACT SWASTHYA"
      title="We’re here to help you begin."
      subtitle="Questions about programs, learning, or appointments? Get in touch with the institute."
    >
      <div className="contact-grid">
        <div className="info-card">
          <Phone />
          <h3>Speak with the team</h3>
          <a className="text-link" href="tel:+919355441199">
            {contact.phone}
          </a>
          <p>Ask about program suitability, sessions, and course enquiries.</p>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Enquire on WhatsApp <ArrowRight size={15} />
          </a>
        </div>
        <div className="info-card">
          <MapPin />
          <h3>Visit our centres</h3>
          <p>
            Pune & Navi Mumbai
            <br />
            Maharashtra, India
          </p>
          <a
            className="text-link"
            href={contact.location}
            target="_blank"
            rel="noreferrer"
          >
            View Nerul location <ArrowRight size={15} />
          </a>
          <p className="small-text">
            Confirm the centre and appointment time before visiting.
          </p>
        </div>
        <div className="info-card">
          <Monitor />
          <h3>Connect online</h3>
          <p>
            Enquire about online consultations, guided sessions, and live
            learning.
          </p>
          <Link className="text-link" to="/booking">
            Request an appointment <ArrowRight size={15} />
          </Link>
          <a
            className="text-link"
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Follow the institute <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </Page>
  );
}
export function FAQ() {
  return (
    <Page eyebrow="HELP & GUIDANCE" title="Your questions, answered.">
      <div className="reading-width">
        {[
          [
            "Where should I start?",
            "Begin with a consultation request. Share your goals and the team will discuss available program pathways and suitability.",
          ],
          [
            "Can I attend online?",
            "You can request online or in-person sessions. The team confirms availability and joining details.",
          ],
          [
            "How do courses work?",
            "Browse the course catalog for descriptions, levels, and durations. Sign in before enrolling. After verified payment, enrollment appears in your learning dashboard.",
          ],
          [
            "How do I join live training?",
            "Use the live course enquiry link on the Courses page to discuss the curriculum, eligibility, duration, and available batches.",
          ],
          [
            "Is a booking request a confirmed appointment?",
            "The team must confirm availability and your appointment details after receiving the request.",
          ],
          [
            "What if I have an injury or health condition?",
            "Seek individual advice from a qualified healthcare professional before starting or changing exercise, and share relevant guidance with the team.",
          ],
        ].map(([question, answer]) => (
          <details className="faq" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
export function Legal({ terms = false }: { terms?: boolean }) {
  return (
    <Page
      eyebrow="INSTITUTE INFORMATION"
      title={terms ? "Terms & Conditions" : "Privacy Policy"}
    >
      <div className="reading-width">
        <div className="notice">
          The institute’s final {terms ? "terms" : "privacy policy"} are
          awaiting publication. Please contact the team for clarification before
          submitting sensitive information or making a payment.
        </div>
        <h2>
          {terms
            ? "Courses and appointments"
            : "Account and appointment information"}
        </h2>
        <p>
          {terms
            ? "A session request is subject to confirmation. Check course access, fees, availability, and cancellation or refund arrangements with the institute before enrolling."
            : "Account registration requests your name, email, and password. Appointment requests include contact details, a preferred session format, date, and an optional message."}
        </p>
        <h3>Questions?</h3>
        <a
          className="text-link"
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          Contact Swasthya <ArrowRight size={15} />
        </a>
      </div>
    </Page>
  );
}
