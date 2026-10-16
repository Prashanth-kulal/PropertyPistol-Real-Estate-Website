"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const brand = "#d29324";

const solutions = [
  {
    number: "01",
    title: "Broker Network",
    text: "Connect your projects with a wider network of real estate brokers and channel partners.",
    icon: "🤝",
  },
  {
    number: "02",
    title: "Lead Generation",
    text: "Generate and manage qualified property leads through an organized technology-driven process.",
    icon: "🎯",
  },
  {
    number: "03",
    title: "Centralized CRM",
    text: "Track broker sourcing, leads, follow-ups and project activity from one centralized system.",
    icon: "📊",
  },
  {
    number: "04",
    title: "Project Knowledge",
    text: "Keep associated brokers updated with important project information and sales material.",
    icon: "📚",
  },
  {
    number: "05",
    title: "Focused Marketing",
    text: "Run targeted campaigns and monitor performance with project-level reporting.",
    icon: "📣",
  },
  {
    number: "06",
    title: "Sales Reporting",
    text: "Get clearer visibility into broker activity, enquiries and sales performance.",
    icon: "📈",
  },
];

const process = [
  "Understand your project and sales objectives",
  "Connect the project with the relevant broker network",
  "Share project information and sales material",
  "Manage leads and follow-ups through a centralized system",
  "Track performance and improve the sales process",
];

export default function RadiatePage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="radiate-page flex-1">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .radiate-page {
          min-height: 100vh;
          background: #ffffff;
          color: #202020;
          font-family: Arial, Helvetica, sans-serif;
        }

        .hero {
          min-height: 590px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              115deg,
              rgba(0, 0, 0, 0.86),
              rgba(0, 0, 0, 0.62),
              rgba(0, 0, 0, 0.35)
            ),
            url("/images/hero-banner-bg.png") center/cover;
        }

        .hero-content {
          width: min(1180px, 92%);
          margin: auto;
          padding: 90px 0;
          color: white;
        }

        .tag {
          display: inline-block;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,.45);
          border-radius: 30px;
          font-size: 13px;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }

        .hero h1 {
          max-width: 760px;
          margin: 0;
          font-size: clamp(42px, 6vw, 72px);
          line-height: 1.05;
          font-weight: 700;
        }

        .hero h1 span {
          color: ${brand};
        }

        .hero p {
          max-width: 680px;
          margin: 25px 0;
          color: #eeeeee;
          font-size: 18px;
          line-height: 1.7;
        }

        .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .primary-btn,
        .secondary-btn {
          padding: 14px 25px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: .25s ease;
        }

        .primary-btn {
          border: 1px solid ${brand};
          background: ${brand};
          color: white;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          background: #b87d17;
        }

        .secondary-btn {
          border: 1px solid rgba(255,255,255,.7);
          background: transparent;
          color: white;
        }

        .secondary-btn:hover {
          background: white;
          color: #222;
        }

        .section {
          width: min(1180px, 92%);
          margin: auto;
          padding: 90px 0;
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .eyebrow {
          color: ${brand};
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .section h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.15;
        }

        .section-heading p {
          color: #666;
          line-height: 1.7;
          font-size: 16px;
          margin-top: 18px;
        }

        .intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .intro-card {
          background: #faf7f1;
          border-left: 5px solid ${brand};
          padding: 35px;
          border-radius: 8px;
        }

        .intro-card h3 {
          margin-top: 0;
          font-size: 27px;
        }

        .intro-card p {
          color: #666;
          line-height: 1.8;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 35px;
        }

        .stat {
          padding: 25px;
          border: 1px solid #eeeeee;
          border-radius: 8px;
          background: white;
        }

        .stat strong {
          display: block;
          font-size: 32px;
          color: ${brand};
        }

        .stat span {
          color: #666;
          font-size: 14px;
        }

        .solutions-section {
          background: #f8f8f8;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .solution-card {
          position: relative;
          padding: 32px;
          background: white;
          border-radius: 10px;
          border: 1px solid #eeeeee;
          transition: .25s ease;
        }

        .solution-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,.08);
        }

        .solution-number {
          position: absolute;
          top: 20px;
          right: 22px;
          color: #d9d9d9;
          font-size: 14px;
          font-weight: 700;
        }

        .solution-icon {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .solution-card h3 {
          margin: 0 0 12px;
          font-size: 20px;
        }

        .solution-card p {
          margin: 0;
          color: #666;
          line-height: 1.7;
          font-size: 14px;
        }

        .process {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 55px;
          align-items: center;
        }

        .process-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .process-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px;
          border: 1px solid #eeeeee;
          border-radius: 8px;
        }

        .process-item span {
          min-width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: ${brand};
          color: white;
          font-weight: 700;
        }

        .process-item p {
          margin: 5px 0;
          line-height: 1.5;
        }

        .cta {
          background: #171717;
          color: white;
          text-align: center;
        }

        .cta-inner {
          width: min(850px, 92%);
          margin: auto;
          padding: 90px 0;
        }

        .cta h2 {
          font-size: clamp(32px, 5vw, 50px);
          margin: 0 0 18px;
        }

        .cta p {
          color: #cfcfcf;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .form-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.65);
          display: grid;
          place-items: center;
          padding: 20px;
          z-index: 9999;
        }

        .form-box {
          width: min(500px, 100%);
          background: white;
          padding: 35px;
          border-radius: 10px;
          position: relative;
        }

        .form-box h3 {
          margin-top: 0;
          font-size: 26px;
        }

        .close {
          position: absolute;
          top: 14px;
          right: 18px;
          border: none;
          background: none;
          font-size: 25px;
          cursor: pointer;
        }

        .form-box input,
        .form-box textarea,
        .form-box select {
          width: 100%;
          margin-bottom: 14px;
          padding: 13px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font: inherit;
        }

        .form-box textarea {
          min-height: 100px;
          resize: vertical;
        }

        .success {
          background: #f4f8ee;
          padding: 20px;
          border-radius: 6px;
          line-height: 1.6;
        }

        @media (max-width: 850px) {
          .intro,
          .process {
            grid-template-columns: 1fr;
          }

          .solutions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .solutions-grid {
            grid-template-columns: 1fr;
          }

          .hero {
            min-height: 540px;
          }

          .section {
            padding: 65px 0;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <div className="tag">PROPERTY TECHNOLOGY • BUILDER SOLUTIONS</div>

          <h1>
            Build smarter.
            <br />
            Sell <span>better.</span>
          </h1>

          <p>
            A technology-driven real estate business solution designed to
            connect developers with brokers, manage leads and create a more
            organized sales journey.
          </p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => setShowForm(true)}
            >
              Talk to an Expert
            </button>

            <a href="#solutions" className="secondary-btn">
              Explore Solutions
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="intro">
          <div>
            <div className="eyebrow">Radiate</div>

            <h2>
              A connected solution for modern real estate sales
            </h2>

            <p>
              Radiate is positioned around technology-enabled business
              solutions for developers and real estate companies. The idea is
              to bring broker networks, lead management, project information
              and reporting into a more organized sales ecosystem.
            </p>

            <div className="stats">
              <div className="stat">
                <strong>360°</strong>
                <span>Business visibility</span>
              </div>

              <div className="stat">
                <strong>CRM</strong>
                <span>Centralized lead management</span>
              </div>

              <div className="stat">
                <strong>24/7</strong>
                <span>Connected sales support</span>
              </div>
            </div>
          </div>

          <div className="intro-card">
            <h3>Why Radiate?</h3>

            <p>
              Real estate sales often involve developers, brokers, leads,
              project information and multiple follow-ups. A centralized
              technology approach can make these activities easier to track
              and coordinate.
            </p>

            <p>
              Our implementation focuses on a clean, professional experience
              while keeping the important business actions easy to understand.
            </p>
          </div>
        </div>
      </section>

      <section className="solutions-section" id="solutions">
        <div className="section">
          <div className="section-heading">
            <div className="eyebrow">Business Solutions</div>

            <h2>
              Everything needed to support a stronger sales ecosystem
            </h2>

            <p>
              A structured set of solutions inspired by the business areas
              highlighted by PropertyPistol's builder-service offering.
            </p>
          </div>

          <div className="solutions-grid">
            {solutions.map((item) => (
              <div className="solution-card" key={item.number}>
                <div className="solution-number">{item.number}</div>

                <div className="solution-icon">{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="process">
          <div>
            <div className="eyebrow">How It Works</div>

            <h2>
              From project onboarding to sales visibility
            </h2>

            <p style={{ color: "#666", lineHeight: 1.8 }}>
              The workflow is designed to keep project information, broker
              engagement and lead activity connected.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowForm(true)}
            >
              Enquire Now
            </button>
          </div>

          <div className="process-list">
            {process.map((item, index) => (
              <div className="process-item" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to grow your real estate business?</h2>

          <p>
            Connect with our team to understand how a technology-enabled
            approach can support your project and sales objectives.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Get Started
          </button>
        </div>
      </section>

      {showForm && (
        <div
          className="form-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="form-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            {!submitted ? (
              <>
                <h3>Talk to an Expert</h3>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                  />

                  <select required defaultValue="">
                    <option value="" disabled>
                      Select your requirement
                    </option>
                    <option>Builder Services</option>
                    <option>Project Marketing</option>
                    <option>Broker Network</option>
                    <option>Lead Management</option>
                    <option>Other</option>
                  </select>

                  <textarea
                    placeholder="Tell us about your requirement"
                  />

                  <button
                    className="primary-btn"
                    type="submit"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </>
            ) : (
              <div className="success">
                <h3>Thank you!</h3>

                <p>
                  Your enquiry has been submitted successfully. Our team can
                  get in touch with you regarding your requirement.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setShowForm(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}
