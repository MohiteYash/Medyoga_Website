import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  HeartHandshake,
  MapPin,
  Monitor,
  Quote,
  UserRound,
} from "lucide-react";
import { assets, contact, programs } from "./content";
import { Image, SectionTitle } from "./ui";
import { CourseGrid } from "./Courses";
import { blogPosts } from "./blogPosts";

export function ProgramGrid() {
  return (
    <div className="program-grid">
      {programs.map(({ slug, title, icon: Icon, description }) => (
        <article className="program-card" key={slug}>
          <div className="program-icon">
            <Icon size={26} strokeWidth={1.4} />
          </div>
          <h3>
            <Link to={`/programs/${slug}`}>{title}</Link>
          </h3>
          <p>{description}</p>
          <Link className="text-link" to={`/programs/${slug}`}>
            Explore program <ArrowRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ExpertSection({ full = false }: { full?: boolean }) {
  return (
    <div className="expert-layout">
      <div className="expert-identity">
        <div className="expert-monogram" aria-hidden="true">
          PN
        </div>
        <span className="eyebrow">FOUNDER & EDUCATOR</span>
        <h3>Dr. Pradnyesh Naikwade</h3>
        <p>
          Medical yoga education
          <br />
          Swasthya Medical Yoga Institute
        </p>
        <div className="expert-line" />
        <span className="small-text">Health · Education · Lifestyle</span>
      </div>
      <div>
        <span className="eyebrow">MEET THE EXPERT</span>
        <h2>
          Guidance that begins
          <br />
          with understanding.
        </h2>
        <p>
          The institute’s work brings yogic tradition into a practical learning
          environment, with an emphasis on spine and joint care, movement
          awareness, and medical yoga education.
        </p>
        <p>
          Learn about the approach behind Swasthya and discuss how its programs
          can fit your learning or movement goals.
        </p>
        {full && (
          <>
            <h3>Teaching focus</h3>
            <ul className="check-list">
              <li>
                <Check /> Medical yoga and therapeutic movement
              </li>
              <li>
                <Check /> Spine and joint movement education
              </li>
              <li>
                <Check /> Guided practice and professional learning
              </li>
            </ul>
            <p className="small-text">
              The institute’s public profile identifies Pradnesh (Ganesh)
              Naikwade as its founder. Detailed academic qualifications and an
              official portrait are awaiting confirmation.
            </p>
          </>
        )}
        <Link className="text-link" to={full ? "/booking" : "/about#expert"}>
          {full ? "Speak with the institute" : "View profile"}{" "}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function HealthcareHome() {
  const values = [
    {
      icon: HeartHandshake,
      title: "Guidance with care",
      text: "A therapeutic approach that starts with your needs and existing care context.",
    },
    {
      icon: UserRound,
      title: "A personal starting point",
      text: "Discuss movement goals and appropriate adaptations before you begin.",
    },
    {
      icon: Monitor,
      title: "Care that fits your day",
      text: "Choose online guidance or enquire about sessions at our centres.",
    },
    {
      icon: CalendarDays,
      title: "A structured way to learn",
      text: "Explore guided practice, educational resources, and medical yoga courses.",
    },
  ];
  return (
    <main id="main-content">
      <section className="institute-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" /> MEDICAL YOGA & REHABILITATION
            </span>
            <h1>
              Thoughtful care.
              <br />
              Mindful movement.
              <br />
              <em>A better everyday.</em>
            </h1>
            <p>
              Discover guided medical yoga for spine and joint care,
              rehabilitation, and wellbeing. A personal approach, grounded in
              the wisdom of yoga.
            </p>
            <div className="button-row">
              <Link className="btn" to="/programs">
                Explore Programs <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-outline" to="/booking">
                Book a Consultation
              </Link>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={15} /> Pune & Navi Mumbai
              </span>
              <span>
                <Monitor size={15} /> Online & in person
              </span>
            </div>
          </div>
          <div className="hero-image-wrap">
            <Image
              src={assets.therapy}
              alt="Illustrative Indian yoga instructor guiding a seated shoulder mobility practice"
              eager
            />
            <div className="hero-image-caption">
              <HeartHandshake size={23} strokeWidth={1.4} />
              <div>
                <strong>Individual attention. Guided practice.</strong>
                <span>A starting point that feels right for you.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our approach">
        <div className="container">
          {[
            "Guided therapeutic approach",
            "Individual movement needs",
            "Online & in-person sessions",
            "Structured yoga education",
          ].map((text) => (
            <span key={text}>
              <Check size={16} /> {text}
            </span>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div className="editorial-image">
            <Image
              src={assets.studio}
              alt="Illustrative light-filled medical yoga studio"
            />
            <div className="image-label">
              A space for care, learning, and connection.
            </div>
          </div>
          <div>
            <span className="eyebrow">WELCOME TO SWASTHYA</span>
            <h2>
              Where yogic tradition
              <br />
              meets thoughtful care.
            </h2>
            <p className="lead">
              Movement is personal. Your practice should be too.
            </p>
            <p>
              Swasthya Medical Yoga Institute brings together therapeutic yoga,
              movement education, and structured learning in a welcoming
              setting.
            </p>
            <p>
              Whether you are exploring a guided return to movement or deepening
              your understanding of medical yoga, begin with a conversation
              about your needs.
            </p>
            <Link className="text-link" to="/about">
              Discover our institute <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionTitle
            eyebrow="OUR MEDICAL YOGA PROGRAMS"
            title="Care for the way you move."
            text="Explore focused programs and find the right starting point with our team."
            to="/programs"
            label="View all programs"
          />
          <ProgramGrid />
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-layout">
          <div>
            <span className="eyebrow">WHY CHOOSE SWASTHYA</span>
            <h2>
              Personal guidance.
              <br />
              Purposeful practice.
            </h2>
            <p>
              Space to ask questions, understand your body, and build a practice
              at your pace.
            </p>
            <Link className="btn btn-outline" to="/medical-yoga">
              Our approach <ArrowRight size={16} />
            </Link>
          </div>
          <div className="value-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={24} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ExpertSection />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionTitle
            eyebrow="COURSES & LEARNING"
            title="Grow your practice. Deepen your knowledge."
            text="Discover online learning programs and enquire about live medical yoga training."
            to="/courses"
            label="Explore all courses"
          />
          <CourseGrid compact />
          <div className="live-course-note">
            <div>
              <span className="eyebrow">LIVE LEARNING</span>
              <h3>Medical Yoga Therapy Course</h3>
              <p>
                Speak with the team about upcoming batches, curriculum,
                duration, and eligibility.
              </p>
            </div>
            <a
              className="btn btn-outline"
              href={contact.course}
              target="_blank"
              rel="noreferrer"
            >
              Enquire about live training <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container consultation-panel">
          <div>
            <span className="eyebrow">CONSULTATIONS & APPOINTMENTS</span>
            <h2>
              Your next step starts
              <br />
              with a conversation.
            </h2>
            <p>
              Tell us about your goals, questions, and preferred session format.
              The team will contact you to discuss an appropriate starting
              point.
            </p>
            <div className="consultation-options">
              <span>
                <Monitor size={18} /> Online consultation
              </span>
              <span>
                <MapPin size={18} /> In-person consultation
              </span>
            </div>
            <Link className="btn" to="/booking">
              Request an Appointment <ArrowRight size={16} />
            </Link>
          </div>
          <Image
            src={assets.movement}
            alt="Illustrative guided balance session with a chair for support"
          />
        </div>
      </section>
      <section className="section community-section">
        <div className="container community-layout">
          <Quote size={38} strokeWidth={1} />
          <div>
            <span className="eyebrow">FROM OUR COMMUNITY</span>
            <h2>
              Get to know the people
              <br />
              behind the practice.
            </h2>
            <p>
              Explore the institute’s own teaching demonstrations, community
              stories, and testimonial highlights on Instagram.
            </p>
          </div>
          <a
            className="btn btn-outline"
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Visit our community <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="JOURNAL & RESOURCES"
            title="Learn a little. Live more mindfully."
            to="/blog"
            label="View all resources"
          />
          <div className="resource-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article className="resource-card" key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  <Image
                    src={
                      [assets.studio, assets.therapy, assets.movement][index]
                    }
                    alt="Illustrative medical yoga learning environment"
                  />
                  <div className="resource-body">
                    <span className="eyebrow">
                      {post.category} · SAMPLE ARTICLE
                    </span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="text-link">
                      Read article <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-band">
        <div className="container">
          <div>
            <span className="eyebrow">LET’S BEGIN, TOGETHER</span>
            <h2>Make room for your wellbeing.</h2>
          </div>
          <Link className="btn" to="/booking">
            Book a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
