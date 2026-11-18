import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "./blogPosts";

function DemoNotice() {
  return (
    <p className="notice">
      Demo content: these fictional sample articles demonstrate the blog layout.
      They are not authored by the Swasthya doctor and are not medical advice.
    </p>
  );
}

export function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const categories = [
    "All topics",
    ...new Set(blogPosts.map((post) => post.category)),
  ];
  const posts = blogPosts.filter(
    (post) =>
      (category === "All topics" || post.category === category) &&
      `${post.title} ${post.excerpt} ${post.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">JOURNAL & EDUCATIONAL RESOURCES</span>
          <h1>A little understanding, every day</h1>
          <p>
            Explore sample stories about everyday practice, thoughtful learning,
            and reflection.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <DemoNotice />
          <div className="blog-toolbar">
            <label>
              Search articles
              <input
                type="search"
                placeholder="Search the journal…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label>
              Topic
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="fine" role="status">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <div className="blog-card-heading">
                  <BookOpen aria-hidden="true" />
                  <span className="eyebrow">{post.category}</span>
                </div>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span>
                    <Clock size={14} aria-hidden="true" /> {post.readMinutes}{" "}
                    min read
                  </span>
                  <Link to={`/blog/${post.slug}`}>
                    Read article <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {!posts.length && (
            <div className="empty-state">
              <p>No articles match your search.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setQuery("");
                  setCategory("All topics");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post)
    return (
      <main id="main-content" className="section">
        <div className="container">
          <h1>Article not found</h1>
          <Link className="btn btn-outline" to="/blog">
            Return to journal
          </Link>
        </div>
      </main>
    );
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{post.category} · SAMPLE ARTICLE</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <span className="fine">
            Swasthya demo editorial · {post.readMinutes} min read
          </span>
        </div>
      </section>
      <article className="section">
        <div className="container blog-article">
          <Link className="blog-back" to="/blog">
            <ArrowLeft size={16} aria-hidden="true" /> Back to journal
          </Link>
          <DemoNotice />
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <Link className="btn btn-outline" to="/blog">
            Explore more articles <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  );
}
