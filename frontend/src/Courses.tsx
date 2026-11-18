import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Monitor, UserRound } from "lucide-react";
import { api } from "./api";
import { assets, contact } from "./content";
import { ErrorMessage, errorText, Image, Page } from "./ui";

export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  level: string;
  duration: string;
  image_url?: string;
  is_published: boolean;
};
type PaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type CheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: PaymentResponse) => void;
  modal: { ondismiss: () => void };
  theme: { color: string };
};
declare global {
  interface Window {
    Razorpay?: new (options: CheckoutOptions) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}
let checkoutPromise: Promise<void> | null = null;
function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!checkoutPromise)
    checkoutPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => {
        script.remove();
        checkoutPromise = null;
        reject(new Error("Checkout could not load."));
      };
      document.head.appendChild(script);
    });
  return checkoutPromise;
}
export function courseImage(course: Course) {
  if (course.image_url && !course.image_url.includes("images.unsplash.com"))
    return course.image_url;
  return course.slug.includes("pranayama")
    ? assets.studio
    : course.slug.includes("mobility")
      ? assets.movement
      : assets.therapy;
}
export function CourseGrid({ compact = false }: { compact?: boolean }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All levels");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    api
      .get<Course[]>("/courses")
      .then((response) => {
        if (active) setCourses(response.data);
      })
      .catch(() => {
        if (active) setError("Courses could not be loaded. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const list = courses.filter(
    (course) =>
      `${course.title} ${course.description}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (level === "All levels" || course.level === level),
  );
  return (
    <>
      {!compact && (
        <div className="filter-toolbar">
          <label>
            Search courses
            <input
              type="search"
              placeholder="Search by topic or course name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            Experience level
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
              <option>All levels</option>
              {[...new Set(courses.map((course) => course.level))]
                .filter((value) => value !== "All levels")
                .map((value) => (
                  <option key={value}>{value}</option>
                ))}
            </select>
          </label>
          <span role="status">{list.length} courses</span>
        </div>
      )}
      {loading && (
        <div className="loading-state" role="status">
          Loading learning programs…
        </div>
      )}
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <button
            className="btn btn-outline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Try again
          </button>
        </>
      )}
      {!loading && !error && (
        <div className="course-grid">
          {(compact ? list.slice(0, 3) : list).map((course) => (
            <article className="course-card" key={course.id}>
              <Link className="course-image" to={`/courses/${course.slug}`}>
                <Image
                  src={courseImage(course)}
                  alt={`Illustrative learning scene for ${course.title}`}
                />
                <span className="tag">{course.level}</span>
              </Link>
              <div className="course-body">
                <div className="course-meta">
                  <span>
                    <Clock size={13} /> {course.duration}
                  </span>
                  <span>
                    <Monitor size={13} /> Online learning
                  </span>
                </div>
                <h3>
                  <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                </h3>
                <p>{course.description}</p>
                <div className="instructor-line">
                  <UserRound size={14} /> Swasthya teaching team
                </div>
                <div className="course-bottom">
                  <strong>₹{course.price.toLocaleString("en-IN")}</strong>
                  <Link className="text-link" to={`/courses/${course.slug}`}>
                    View course <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {!loading && !error && list.length === 0 && (
        <div className="empty-state">
          <BookOpen />
          <h3>No courses found</h3>
          <p>Try another topic or experience level.</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setQuery("");
              setLevel("All levels");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
export function Courses() {
  const [params, setParams] = useSearchParams();
  const live = params.get("format") === "live";
  return (
    <Page
      eyebrow="COURSES & LEARNING"
      title="Learn with purpose. Practice with understanding."
      subtitle="Explore online learning and enquire about instructor-led medical yoga training."
    >
      <div className="tab-bar" role="group" aria-label="Course format">
        <button aria-pressed={!live} onClick={() => setParams({})}>
          Online learning
        </button>
        <button
          aria-pressed={live}
          onClick={() => setParams({ format: "live" })}
        >
          Live training
        </button>
      </div>
      {live ? (
        <div className="split-layout">
          <Image
            className="rounded-image"
            src={assets.movement}
            alt="Illustrative guided learning session"
          />
          <div>
            <span className="eyebrow">LIVE MEDICAL YOGA TRAINING</span>
            <h2>Medical Yoga Therapy Course</h2>
            <p>
              Learn more about guided medical yoga education. The team can
              confirm the curriculum, instructor details, eligibility, duration,
              current fees, and next available batch.
            </p>
            <a
              className="btn"
              href={contact.course}
              target="_blank"
              rel="noreferrer"
            >
              Enquire about live training <ArrowRight size={16} />
            </a>
          </div>
        </div>
      ) : (
        <>
          <p className="small-text catalog-note">
            Course availability and details are provided by the institute’s
            catalog. Review the curriculum and access arrangements before
            enrolling.
          </p>
          <CourseGrid />
        </>
      )}
    </Page>
  );
}
export function CourseDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setCourse(null);
    api
      .get<Course>(`/courses/slug/${slug}`)
      .then((response) => {
        if (active) setCourse(response.data);
      })
      .catch((error) => {
        if (active)
          setError(errorText(error, "This course could not be loaded."));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);
  async function enroll() {
    if (!localStorage.getItem("medyoga_token")) {
      nav(`/login?next=${encodeURIComponent(`/courses/${slug}`)}`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await loadCheckout();
      const { data } = await api.post("/payments/create-order", {
        course_id: course!.id,
      });
      if (!window.Razorpay) throw new Error("Checkout unavailable");
      const checkout = new window.Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "Swasthya Medical Yoga",
        description: data.course_title,
        theme: { color: "#315B46" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (response) => {
          try {
            await api.post("/payments/verify", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            nav("/dashboard");
          } catch (error) {
            setError(
              errorText(
                error,
                "Payment verification is pending. Contact the institute before paying again.",
              ),
            );
          } finally {
            setBusy(false);
          }
        },
      });
      checkout.on("payment.failed", () => {
        setError(
          "Payment was unsuccessful. Please check the payment status before trying again.",
        );
        setBusy(false);
      });
      checkout.open();
    } catch (error) {
      setError(
        errorText(
          error,
          "Checkout is currently unavailable. Please contact the institute.",
        ),
      );
      setBusy(false);
    }
  }
  if (loading)
    return (
      <Page title="Loading course…">
        <div className="loading-state" role="status">
          Fetching course information…
        </div>
      </Page>
    );
  if (!course)
    return (
      <Page title="Course unavailable">
        <ErrorMessage>{error}</ErrorMessage>
        <Link className="btn" to="/courses">
          Browse courses
        </Link>
      </Page>
    );
  return (
    <Page
      eyebrow="COURSE DETAILS"
      title={course.title}
      subtitle={course.description}
    >
      <div className="course-detail-layout">
        <div>
          <Image
            className="rounded-image course-detail-image"
            src={courseImage(course)}
            alt={`Illustrative scene for ${course.title}`}
          />
          <section className="inner-section">
            <h2>About this course</h2>
            <p>{course.description}</p>
            <h3>Learning with Swasthya</h3>
            <p>
              Review the course level and duration, and discuss your learning
              goals with the team before enrolling. Instructor details, final
              curriculum, lesson availability, and access duration should be
              confirmed with the institute.
            </p>
            <a
              className="text-link"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Ask about the curriculum <ArrowRight size={16} />
            </a>
          </section>
        </div>
        <aside className="enrollment-panel">
          <span className="eyebrow">ONLINE LEARNING</span>
          <h2>₹{course.price.toLocaleString("en-IN")}</h2>
          <dl>
            <div>
              <dt>Duration</dt>
              <dd>{course.duration}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{course.level}</dd>
            </div>
            <div>
              <dt>Teaching</dt>
              <dd>Swasthya team</dd>
            </div>
          </dl>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <button className="btn full" onClick={enroll} disabled={busy}>
            {busy ? "Preparing checkout…" : "Enroll Now"}{" "}
            <ArrowRight size={16} />
          </button>
          <p className="small-text">
            Secure payment through Razorpay. Enrollment appears in your
            dashboard after payment verification.
          </p>
          <Link className="text-link" to="/booking">
            Need guidance before enrolling?
          </Link>
        </aside>
      </div>
    </Page>
  );
}
