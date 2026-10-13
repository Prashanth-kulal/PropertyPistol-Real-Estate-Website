"use client";

import { useState } from "react";

const brand = "#d29324";

const services = [
  {
    icon: "🔎",
    title: "Property Research",
    text: "Get assistance researching suitable properties and understanding the information needed to make an informed decision.",
  },
  {
    icon: "🏠",
    title: "Buying & Selling",
    text: "Get support throughout the property journey, from identifying suitable options to coordinating the transaction.",
  },
  {
    icon: "📹",
    title: "Virtual Site Visits",
    text: "Explore properties remotely when you cannot conveniently visit the property in person.",
  },
  {
    icon: "🔑",
    title: "Leasing Support",
    text: "Get assistance with finding tenants and coordinating the leasing process for your property.",
  },
  {
    icon: "💰",
    title: "Rent Collection",
    text: "Keep track of rental activity and receive support with regular rent collection and disbursement.",
  },
  {
    icon: "🛠️",
    title: "Property Maintenance",
    text: "Coordinate inspections, maintenance requirements and property repairs while you are away.",
  },
  {
    icon: "📄",
    title: "Accounting & Statements",
    text: "Maintain better visibility of property-related financial activity and regular statements.",
  },
  {
    icon: "⚖️",
    title: "Legal Assistance",
    text: "Get coordination support for tenant-related issues, documentation and other property matters.",
  },
  {
    icon: "💬",
    title: "Tenant Communication",
    text: "Let a professional team coordinate routine communication with tenants on your behalf.",
  },
];

const steps = [
  {
    title: "Tell us your requirement",
    text: "Share whether you are looking to buy, sell, lease or manage a property.",
  },
  {
    title: "Get personalized assistance",
    text: "Our team can understand your requirement and help identify the right next steps.",
  },
  {
    title: "Explore properties remotely",
    text: "Use virtual coordination and site-visit support when you cannot be physically present.",
  },
  {
    title: "Complete the transaction",
    text: "Receive assistance with coordination and documentation through the property journey.",
  },
  {
    title: "Manage your property",
    text: "For rental properties, receive ongoing support for tenants, maintenance and property activity.",
  },
];

const faqs = [
  {
    q: "Can an NRI buy property in India?",
    a: "Property rules depend on the buyer's status, property type and applicable regulations. NRI, OCI and PIO customers should verify the current rules and obtain professional advice before completing a transaction.",
  },
  {
    q: "Can I manage my Indian property while living abroad?",
    a: "Yes. Property management services can help coordinate activities such as tenant communication, inspections, rent collection and maintenance when the owner is not physically present.",
  },
  {
    q: "Can I arrange a property visit remotely?",
    a: "Remote coordination and virtual property viewing can be useful when travelling to the property is difficult. Availability depends on the property and local team.",
  },
  {
    q: "Can you help with rental property management?",
    a: "The NRI Desk service is designed to support rental-property activities such as tenant coordination, rent collection, inspections and maintenance assistance.",
  },
];

export default function NRIDeskPage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="nri-page">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .nri-page {
          min-height: 100vh;
          background: white;
          color: #222;
          font-family: Arial, Helvetica, sans-serif;
        }

        .hero {
          min-height: 610px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              110deg,
              rgba(0,0,0,.88),
              rgba(0,0,0,.68),
              rgba(0,0,0,.35)
            ),
            url("/images/hero-banner-bg.png") center/cover;
        }

        .hero-content {
          width: min(1180px, 92%);
          margin: auto;
          padding: 100px 0;
          color: white;
        }

        .tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,.45);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 13px;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }

        .hero h1 {
          max-width: 780px;
          margin: 0;
          font-size: clamp(40px, 6vw, 70px);
          line-height: 1.05;
        }

        .hero h1 span {
          color: ${brand};
        }

        .hero p {
          max-width: 700px;
          color: #eeeeee;
          line-height: 1.75;
          font-size: 18px;
          margin: 25px 0;
        }

        .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .primary-btn,
        .secondary-btn {
          display: inline-block;
          padding: 14px 25px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 15px;
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
          color: white;
          border: 1px solid rgba(255,255,255,.7);
          background: transparent;
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

        .eyebrow {
          color: ${brand};
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .section h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.15;
        }

        .section-intro {
          max-width: 760px;
          color: #666;
          line-height: 1.8;
          margin-top: 18px;
        }

        .benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 45px;
        }

        .benefit {
          padding: 30px;
          border: 1px solid #eeeeee;
          border-radius: 9px;
          background: #fff;
        }

        .benefit strong {
          display: block;
          color: ${brand};
          font-size: 35px;
          margin-bottom: 10px;
        }

        .benefit h3 {
          margin: 0 0 10px;
        }

        .benefit p {
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        .services-section {
          background: #f8f8f8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 45px;
        }

        .service-card {
          padding: 30px;
          background: white;
          border: 1px solid #eeeeee;
          border-radius: 9px;
          transition: .25s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 30px rgba(0,0,0,.07);
        }

        .service-icon {
          font-size: 32px;
          margin-bottom: 18px;
        }

        .service-card h3 {
          margin: 0 0 10px;
          font-size: 19px;
        }

        .service-card p {
          color: #666;
          line-height: 1.7;
          margin: 0;
          font-size: 14px;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 40px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 20px;
          border: 1px solid #eeeeee;
          border-radius: 8px;
        }

        .step-number {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: grid;
          place-items: center;
          background: ${brand};
          color: white;
          border-radius: 50%;
          font-weight: 700;
        }

        .step h3 {
          margin: 2px 0 7px;
        }

        .step p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .faq-section {
          background: #faf7f1;
        }

        .faq {
          max-width: 850px;
          margin: 40px auto 0;
        }

        .faq-item {
          background: white;
          border: 1px solid #e8e8e8;
          margin-bottom: 10px;
          border-radius: 7px;
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          text-align: left;
          padding: 20px;
          background: white;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .faq-answer {
          padding: 0 20px 20px;
          color: #666;
          line-height: 1.7;
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
          color: #ccc;
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
          top: 12px;
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
          padding: 13px;
          margin-bottom: 14px;
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
          .services-grid,
          .benefits {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .services-grid,
          .benefits {
            grid-template-columns: 1fr;
          }

          .hero {
            min-height: 550px;
          }

          .section {
            padding: 65px 0;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <div className="tag">NRI REAL ESTATE SERVICES</div>

          <h1>
            Your property in India.
            <br />
            <span>Our support.</span>
          </h1>

          <p>
            Professional real estate assistance for NRIs who want to buy,
            sell, lease or manage property in India while living away from
            home.
          </p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => setShowForm(true)}
            >
              Enquire Now
            </button>

            <a className="secondary-btn" href="#services">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">NRI Desk</div>

        <h2>
          Real estate support, even when you are miles away
        </h2>

        <p className="section-intro">
          Managing property from another country can involve research,
          communication, documentation, tenants, maintenance and regular
          follow-ups. The NRI Desk brings these requirements together through
          a dedicated real estate support approach.
        </p>

        <div className="benefits">
          <div className="benefit">
            <strong>01</strong>
            <h3>Local Assistance</h3>
            <p>
              Get support from a team that can coordinate activities on the
              ground in India.
            </p>
          </div>

          <div className="benefit">
            <strong>02</strong>
            <h3>Remote Convenience</h3>
            <p>
              Handle important property activities without needing to be
              physically present for every step.
            </p>
          </div>

          <div className="benefit">
            <strong>03</strong>
            <h3>Ongoing Support</h3>
            <p>
              Stay connected with your property's activities even after the
              initial transaction.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section">
          <div className="eyebrow">Our Services</div>

          <h2>
            Support across your property journey
          </h2>

          <p className="section-intro">
            From property research and buying assistance to rental management
            and maintenance coordination, the service model covers the major
            areas an NRI property owner may need help with.
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">Simple Process</div>

        <h2>How the NRI Desk works</h2>

        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step.title}>
              <div className="step-number">
                {index + 1}
              </div>

              <div>
                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="section">
          <div style={{ textAlign: "center" }}>
            <div className="eyebrow">FAQ</div>

            <h2>Frequently asked questions</h2>
          </div>

          <div className="faq">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq.q}>
                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <span>{faq.q}</span>

                  <span>
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2>Need help with your property in India?</h2>

          <p>
            Tell us what you need and get connected with a real estate
            assistance team.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Speak to an Expert
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
                <h3>Enquire with NRI Desk</h3>

                <form onSubmit={submitForm}>
                  <input
                    type="text"
                    placeholder="Full Name"
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
                      What do you need help with?
                    </option>

                    <option>Buy Property</option>
                    <option>Sell Property</option>
                    <option>Rent / Lease Property</option>
                    <option>Property Management</option>
                    <option>Property Maintenance</option>
                    <option>Other</option>
                  </select>

                  <textarea
                    placeholder="Tell us about your requirement"
                  />

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </>
            ) : (
              <div className="success">
                <h3>Thank you!</h3>

                <p>
                  Your enquiry has been submitted successfully.
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
  );
}
