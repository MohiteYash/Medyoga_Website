import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, LogOut, Plus } from "lucide-react";
import { api } from "./api";
import { assets } from "./content";
import { ErrorMessage, errorText, Image, Page } from "./ui";

type User = { id: number; name: string; email: string; role: string };
type Enrollment = {
  id: number;
  course_id: number;
  course_title: string;
  status: string;
  amount: number;
};
function clearSession() {
  localStorage.removeItem("medyoga_token");
  localStorage.removeItem("medyoga_user");
}

export function Auth({ register = false }: { register?: boolean }) {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const next = params.get("next");
  const safeNext =
    next?.startsWith("/") && !next.startsWith("//") && !next.includes("\\")
      ? next
      : null;
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { data } = await api.post(
        register ? "/auth/register" : "/auth/login",
        form,
      );
      localStorage.setItem("medyoga_token", data.access_token);
      localStorage.setItem("medyoga_user", JSON.stringify(data.user));
      nav(safeNext || (data.user.role === "admin" ? "/admin" : "/dashboard"));
    } catch (error) {
      setError(
        errorText(error, "Sign-in could not be completed. Please try again."),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page
      eyebrow="STUDENT & INSTITUTE PORTAL"
      title={
        register
          ? "A thoughtful start to your learning."
          : "Welcome back to Swasthya."
      }
      subtitle="Access your learning and course enrollments in one place."
    >
      <div className="auth-layout">
        <div className="auth-visual">
          <Image
            src={assets.studio}
            alt="Illustrative calm yoga learning space"
          />
          <div>
            <h2>
              Keep learning.
              <br />
              Keep growing.
            </h2>
            <p>Your next chapter begins with understanding.</p>
          </div>
        </div>
        <form className="form-card auth-form" onSubmit={submit}>
          <span className="eyebrow">
            {register ? "CREATE AN ACCOUNT" : "SIGN IN TO YOUR ACCOUNT"}
          </span>
          <h2>{register ? "Join Swasthya" : "Continue your journey"}</h2>
          {register && (
            <label>
              Full name
              <input
                autoComplete="name"
                minLength={2}
                maxLength={120}
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </label>
          )}
          <label>
            Email address
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
            Password
            <input
              type="password"
              autoComplete={register ? "new-password" : "current-password"}
              minLength={register ? 8 : undefined}
              required
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
            />
          </label>
          {register && (
            <p className="small-text">
              Use at least 8 characters for your password.
            </p>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <button className="btn full" disabled={busy}>
            {busy ? "Please wait…" : register ? "Create account" : "Sign in"}{" "}
            <ArrowRight size={16} />
          </button>
          <p className="small-text">
            {register ? "Already have an account?" : "New to Swasthya?"}{" "}
            <Link
              to={`${register ? "/login" : "/register"}${safeNext ? `?next=${encodeURIComponent(safeNext)}` : ""}`}
            >
              {register ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <Link className="text-link" to="/contact">
            Need help accessing your account?
          </Link>
        </form>
      </div>
    </Page>
  );
}

export function Protected({
  children,
  admin = false,
}: {
  children: ReactNode;
  admin?: boolean;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    if (!localStorage.getItem("medyoga_token")) {
      setLoading(false);
      return;
    }
    api
      .get<User>("/me")
      .then((response) => {
        if (active) {
          setUser(response.data);
          localStorage.setItem("medyoga_user", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        if (!active) return;
        if (error.response?.status === 401) {
          clearSession();
          setUser(null);
        } else setError("Your account could not be checked. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  if (loading)
    return (
      <Page title="Checking your account…">
        <p role="status">Please wait while we load your account.</p>
      </Page>
    );
  if (error)
    return (
      <Page title="Account temporarily unavailable">
        <ErrorMessage>{error}</ErrorMessage>
        <button
          className="btn"
          onClick={() => setAttempt((value) => value + 1)}
        >
          Try again
        </button>
      </Page>
    );
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== "admin")
    return (
      <Page title="Administrator access required">
        <p>This area is available to institute administrators.</p>
        <Link className="btn" to="/dashboard">
          Go to my learning
        </Link>
      </Page>
    );
  return <>{children}</>;
}

export function Dashboard() {
  const [orders, setOrders] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const user: User | null = JSON.parse(
    localStorage.getItem("medyoga_user") || "null",
  );
  useEffect(() => {
    let active = true;
    api
      .get<Enrollment[]>("/me/enrollments")
      .then((response) => {
        if (active) setOrders(response.data);
      })
      .catch(() => {
        if (active)
          setError(
            "Your enrollments could not be loaded. Please refresh or contact the team.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <Page
      eyebrow="MY LEARNING"
      title={`Welcome${user?.name ? `, ${user.name}` : " back"}.`}
      subtitle="Your course enrollments and next learning steps."
    >
      <div className="dashboard-actions">
        <Link className="btn" to="/courses">
          Explore courses <ArrowRight size={16} />
        </Link>
        <button
          className="btn btn-outline"
          onClick={() => {
            clearSession();
            nav("/");
          }}
        >
          <LogOut size={16} /> Sign out
        </button>
        {user?.role === "admin" && (
          <Link className="text-link" to="/admin">
            Institute administration
          </Link>
        )}
      </div>
      <div className="dashboard-grid">
        <div className="info-card">
          <BookOpen />
          <h3>My courses</h3>
          <p>
            {loading
              ? "Loading enrollments…"
              : `${orders.length} verified enrollments`}
          </p>
        </div>
        <div className="info-card">
          <CalendarDays />
          <h3>My next session</h3>
          <p>Request an online or in-person appointment.</p>
          <Link className="text-link" to="/booking">
            Book a consultation <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <h2>Enrolled courses</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <p role="status">Loading your courses…</p>}
      {!loading && !error && !orders.length && (
        <div className="empty-state">
          <BookOpen size={32} />
          <h3>Your learning journey starts here.</h3>
          <p>Courses appear here after verified payment.</p>
          <Link className="btn" to="/courses">
            Discover courses
          </Link>
        </div>
      )}
      <div className="enrollment-list">
        {orders.map((order) => (
          <article className="info-card" key={order.id}>
            <span className="tag">{order.status}</span>
            <h3>{order.course_title}</h3>
            <p>
              Enrollment #{order.id} · ₹{order.amount.toLocaleString("en-IN")}
            </p>
            <Link className="text-link" to="/contact">
              Ask about lesson access <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </Page>
  );
}

export function Admin() {
  const [stats, setStats] = useState<{
    courses: number;
    students: number;
    orders: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    api
      .get("/admin/summary")
      .then((response) => {
        if (active) setStats(response.data);
      })
      .catch(() => {
        if (active) setError("Platform activity could not be loaded.");
      });
    return () => {
      active = false;
    };
  }, [revision]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/admin/courses", {
        title,
        description: "",
        price: Number(price),
        level: "All levels",
        duration: "To be announced",
        is_published: false,
      });
      setTitle("");
      setPrice("");
      setSuccess("Course draft created.");
      setRevision((value) => value + 1);
    } catch (error) {
      setError(errorText(error, "The course could not be created."));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page
      eyebrow="INSTITUTE ADMINISTRATION"
      title="Your platform, at a glance."
      subtitle="Review platform activity and create course drafts."
    >
      <div className="dashboard-actions">
        <Link className="text-link" to="/dashboard">
          My learning
        </Link>
        <Link className="text-link" to="/courses">
          Public course catalog
        </Link>
      </div>
      <div className="dashboard-grid">
        {(["courses", "students", "orders"] as const).map((key) => (
          <div className="info-card" key={key}>
            <h3>{key[0].toUpperCase() + key.slice(1)}</h3>
            <strong className="metric">{stats?.[key] ?? "—"}</strong>
          </div>
        ))}
      </div>
      <form className="form-card admin-form" onSubmit={submit}>
        <h2>Create a course draft</h2>
        <label>
          Course title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Price (INR)
          <input
            type="number"
            min="0"
            step="1"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && (
          <p className="feedback success" role="status">
            {success}
          </p>
        )}
        <button className="btn" disabled={busy}>
          <Plus size={16} />
          {busy ? "Creating…" : "Create draft"}
        </button>
      </form>
    </Page>
  );
}
