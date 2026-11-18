import { Navigate, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./Layout";
import HealthcareHome from "./HealthcareHome";
import {
  About,
  Contact,
  FAQ,
  Legal,
  Medical,
  ProgramDetail,
  Programs,
} from "./PublicPages";
import { CourseDetail, Courses } from "./Courses";
import Booking from "./Booking";
import { Admin, Auth, Dashboard, Protected } from "./Accounts";
import { Blog, BlogArticle } from "./Blog";
import { Page } from "./ui";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HealthcareHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/medical-yoga" element={<Medical />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route
          path="/consultations"
          element={<Navigate to="/booking" replace />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/resources" element={<Navigate to="/blog" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected admin>
              <Admin />
            </Protected>
          }
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal terms />} />
        <Route
          path="*"
          element={
            <Page title="This page could not be found.">
              <p>
                Find a program, explore learning, or get in touch with the
                institute.
              </p>
              <Link className="btn" to="/">
                Return home
              </Link>
            </Page>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
