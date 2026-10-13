"use client";

import { useState } from "react";

const brand = "#d29324";

const questions = [
  {
    id: "purpose",
    title: "What are you looking for?",
    subtitle: "Tell us your main property goal.",
    options: [
      {
        value: "buy",
        label: "Buy a Property",
        icon: "🏠",
        description: "Looking for a home or property to purchase",
      },
      {
        value: "investment",
        label: "Property Investment",
        icon: "📈",
        description: "Looking for a property as an investment",
      },
      {
        value: "rent",
        label: "Rent a Property",
        icon: "🔑",
        description: "Looking for a property to rent",
      },
      {
        value: "sell",
        label: "Sell a Property",
        icon: "💼",
        description: "Planning to sell your property",
      },
    ],
  },
  {
    id: "location",
    title: "Where are you looking?",
    subtitle: "Choose your preferred city.",
    options: [
      { value: "mumbai", label: "Mumbai", icon: "📍" },
      { value: "pune", label: "Pune", icon: "📍" },
      { value: "bengaluru", label: "Bengaluru", icon: "📍" },
      { value: "hyderabad", label: "Hyderabad", icon: "📍" },
      { value: "delhi", label: "Delhi NCR", icon: "📍" },
      { value: "other", label: "Other City", icon: "🌎" },
    ],
  },
  {
    id: "budget",
    title: "What is your budget?",
    subtitle: "Select the approximate property value.",
    options: [
      { value: "under50", label: "Under ₹50 Lakhs", icon: "₹" },
      { value: "50to100", label: "₹50 Lakhs – ₹1 Crore", icon: "₹" },
      { value: "100to200", label: "₹1 – ₹2 Crores", icon: "₹" },
      { value: "above200", label: "Above ₹2 Crores", icon: "₹" },
    ],
  },
  {
    id: "propertyType",
    title: "What type of property do you prefer?",
    subtitle: "Choose the property category.",
    options: [
      {
        value: "apartment",
        label: "Apartment",
        icon: "🏢",
      },
      {
        value: "villa",
        label: "Villa",
        icon: "🏡",
      },
      {
        value: "plot",
        label: "Plot / Land",
        icon: "🌳",
      },
      {
        value: "commercial",
        label: "Commercial",
        icon: "🏬",
      },
    ],
  },
  {
    id: "timeline",
    title: "When are you planning to move or invest?",
    subtitle: "This helps us understand your timeline.",
    options: [
      {
        value: "immediately",
        label: "Immediately",
        icon: "⚡",
      },
      {
        value: "3months",
        label: "Within 3 Months",
        icon: "📅",
      },
      {
        value: "6months",
        label: "Within 6 Months",
        icon: "📆",
      },
      {
        value: "exploring",
        label: "Just Exploring",
        icon: "🔎",
      },
    ],
  },
];

export default function PropertyAdvisoryPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[step];

  function selectOption(value) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  }

  function nextStep() {
    if (!answers[currentQuestion.id]) {
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function previousStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function resetAdvisor() {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  }

  function getRecommendation() {
    const purpose = answers.purpose;
    const propertyType = answers.propertyType;
    const budget = answers.budget;

    let title = "Residential Property";

    if (purpose === "investment") {
      title = "Investment Property";
    } else if (purpose === "rent") {
      title = "Rental Property";
    } else if (purpose === "sell") {
      title = "Property Selling Advisory";
    } else if (propertyType === "commercial") {
      title = "Commercial Property";
    } else if (propertyType === "villa") {
      title = "Villa / Premium Home";
    } else if (propertyType === "plot") {
      title = "Plot / Land Investment";
    }

    let budgetText = "Your selected budget";

    if (budget === "under50") {
      budgetText = "Under ₹50 Lakhs";
    } else if (budget === "50to100") {
      budgetText = "₹50 Lakhs – ₹1 Crore";
    } else if (budget === "100to200") {
      budgetText = "₹1 – ₹2 Crores";
    } else if (budget === "above200") {
      budgetText = "Above ₹2 Crores";
    }

    return {
      title,
      budgetText,
    };
  }

  const recommendation = getRecommendation();

  return (
    <main className="advisor-page">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .advisor-page {
          min-height: 100vh;
          background: #f8f6f2;
          color: #222;
          font-family: Arial, Helvetica, sans-serif;
        }

        .hero {
          background:
            linear-gradient(
              120deg,
              rgba(0, 0, 0, 0.82),
              rgba(0, 0, 0, 0.58)
            ),
            url("/images/hero-banner-bg.png") center/cover;
          color: white;
          padding: 90px 20px 120px;
        }

        .hero-content {
          width: min(1100px, 100%);
          margin: auto;
          text-align: center;
        }

        .tag {
          display: inline-block;
          padding: 8px 18px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 30px;
          font-size: 13px;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(40px, 6vw, 68px);
          line-height: 1.08;
        }

        .hero h1 span {
          color: ${brand};
        }

        .hero p {
          max-width: 680px;
          margin: 22px auto 0;
          color: #e7e7e7;
          font-size: 18px;
          line-height: 1.7;
        }

        .tool-wrapper {
          width: min(900px, 92%);
          margin: -65px auto 80px;
          position: relative;
          z-index: 2;
        }

        .tool-card {
          background: white;
          border-radius: 16px;
          padding: 42px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .progress-area {
          margin-bottom: 35px;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          color: #777;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .progress-track {
          height: 7px;
          background: #eeeeee;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: ${brand};
          border-radius: 20px;
          transition: width 0.3s ease;
        }

        .question h2 {
          margin: 0;
          font-size: 32px;
          line-height: 1.25;
        }

        .question-subtitle {
          color: #777;
          margin: 10px 0 30px;
        }

        .options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .option {
          width: 100%;
          text-align: left;
          padding: 20px;
          background: white;
          border: 2px solid #eeeeee;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .option:hover {
          border-color: ${brand};
          transform: translateY(-2px);
        }

        .option.selected {
          border-color: ${brand};
          background: #fff8eb;
        }

        .option-icon {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .option-label {
          display: block;
          font-size: 17px;
          font-weight: 700;
          color: #222;
        }

        .option-description {
          display: block;
          color: #777;
          font-size: 13px;
          line-height: 1.5;
          margin-top: 6px;
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 35px;
          padding-top: 25px;
          border-top: 1px solid #eeeeee;
        }

        .back-btn,
        .next-btn,
        .restart-btn {
          border-radius: 6px;
          padding: 13px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .back-btn {
          border: 1px solid #ddd;
          background: white;
          color: #333;
        }

        .next-btn,
        .restart-btn {
          border: 1px solid ${brand};
          background: ${brand};
          color: white;
        }

        .next-btn:hover,
        .restart-btn:hover {
          background: #b77e1b;
        }

        .next-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .result {
          text-align: center;
        }

        .result-icon {
          width: 75px;
          height: 75px;
          margin: 0 auto 20px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #fff2d7;
          font-size: 35px;
        }

        .result h2 {
          margin: 0;
          font-size: 35px;
        }

        .result-intro {
          color: #777;
          line-height: 1.7;
          max-width: 600px;
          margin: 12px auto 30px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          text-align: left;
          margin-bottom: 25px;
        }

        .result-item {
          padding: 20px;
          background: #fafafa;
          border: 1px solid #eeeeee;
          border-radius: 8px;
        }

        .result-item small {
          color: #888;
          display: block;
          margin-bottom: 7px;
        }

        .result-item strong {
          font-size: 18px;
        }

        .recommendation {
          background: #fff8eb;
          border-left: 4px solid ${brand};
          padding: 20px;
          text-align: left;
          margin-bottom: 25px;
        }

        .recommendation strong {
          display: block;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .about-section {
          width: min(1100px, 92%);
          margin: auto;
          padding: 0 0 90px;
        }

        .about-heading {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 45px;
        }

        .eyebrow {
          color: ${brand};
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .about-heading h2 {
          margin: 0;
          font-size: 38px;
        }

        .about-heading p {
          color: #666;
          line-height: 1.7;
        }

        .benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .benefit {
          background: white;
          padding: 30px;
          border-radius: 10px;
          border: 1px solid #eeeeee;
        }

        .benefit-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .benefit h3 {
          margin: 0 0 10px;
        }

        .benefit p {
          margin: 0;
          color: #666;
          line-height: 1.6;
          font-size: 14px;
        }

        @media (max-width: 700px) {
          .hero {
            padding: 70px 15px 100px;
          }

          .tool-card {
            padding: 25px 18px;
          }

          .options {
            grid-template-columns: 1fr;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .benefits {
            grid-template-columns: 1fr;
          }

          .question h2 {
            font-size: 27px;
          }

          .about-heading h2 {
            font-size: 30px;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <div className="tag">AURALIVING PROPERTY TOOLS</div>

          <h1>
            Find the right property
            <br />
            with <span>smart guidance.</span>
          </h1>

          <p>
            Answer a few simple questions and get a personalized property
            direction based on your purpose, location, budget and preferences.
          </p>
        </div>
      </section>

      <section className="tool-wrapper">
        <div className="tool-card">
          {!showResult ? (
            <>
              <div className="progress-area">
                <div className="progress-top">
                  <span>
                    Step {step + 1} of {questions.length}
                  </span>

                  <span>
                    {Math.round(
                      ((step + 1) / questions.length) * 100
                    )}
                    %
                  </span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        ((step + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="question">
                <h2>{currentQuestion.title}</h2>

                <p className="question-subtitle">
                  {currentQuestion.subtitle}
                </p>

                <div className="options">
                  {currentQuestion.options.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`option ${
                        answers[currentQuestion.id] === option.value
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => selectOption(option.value)}
                    >
                      <div className="option-icon">
                        {option.icon}
                      </div>

                      <span className="option-label">
                        {option.label}
                      </span>

                      {option.description && (
                        <span className="option-description">
                          {option.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="navigation">
                <button
                  type="button"
                  className="back-btn"
                  onClick={previousStep}
                  disabled={step === 0}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="next-btn"
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                >
                  {step === questions.length - 1
                    ? "Get My Recommendation"
                    : "Next →"}
                </button>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-icon">✓</div>

              <h2>Your Property Profile</h2>

              <p className="result-intro">
                Based on your answers, here is a starting direction for your
                property search. You can use this profile to discuss your
                requirements with a property advisor.
              </p>

              <div className="result-grid">
                <div className="result-item">
                  <small>Purpose</small>

                  <strong>
                    {answers.purpose === "buy"
                      ? "Buy a Property"
                      : answers.purpose === "investment"
                      ? "Property Investment"
                      : answers.purpose === "rent"
                      ? "Rent a Property"
                      : "Sell a Property"}
                  </strong>
                </div>

                <div className="result-item">
                  <small>Preferred Location</small>

                  <strong>
                    {answers.location === "mumbai"
                      ? "Mumbai"
                      : answers.location === "pune"
                      ? "Pune"
                      : answers.location === "bengaluru"
                      ? "Bengaluru"
                      : answers.location === "hyderabad"
                      ? "Hyderabad"
                      : answers.location === "delhi"
                      ? "Delhi NCR"
                      : "Other City"}
                  </strong>
                </div>

                <div className="result-item">
                  <small>Budget</small>

                  <strong>{recommendation.budgetText}</strong>
                </div>

                <div className="result-item">
                  <small>Property Type</small>

                  <strong>
                    {answers.propertyType === "apartment"
                      ? "Apartment"
                      : answers.propertyType === "villa"
                      ? "Villa"
                      : answers.propertyType === "plot"
                      ? "Plot / Land"
                      : "Commercial"}
                  </strong>
                </div>
              </div>

              <div className="recommendation">
                <strong>
                  Recommended Focus: {recommendation.title}
                </strong>

                <span>
                  Consider properties that match your selected location,
                  budget and timeline. An advisor can help you compare
                  available options and make a more informed decision.
                </span>
              </div>

              <button
                type="button"
                className="restart-btn"
                onClick={resetAdvisor}
              >
                Start Again
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="about-section">
        <div className="about-heading">
          <div className="eyebrow">Why Use Property Advisory?</div>

          <h2>Make your property search more focused</h2>

          <p>
            A simple guided experience can help you organize your requirements
            before you start comparing properties.
          </p>
        </div>

        <div className="benefits">
          <div className="benefit">
            <div className="benefit-icon">🎯</div>

            <h3>Clear Requirements</h3>

            <p>
              Define your purpose, location, budget and property preferences
              in a few simple steps.
            </p>
          </div>

          <div className="benefit">
            <div className="benefit-icon">⚡</div>

            <h3>Quick Guidance</h3>

            <p>
              Get a quick property profile without going through a complicated
              form.
            </p>
          </div>

          <div className="benefit">
            <div className="benefit-icon">🤝</div>

            <h3>Advisor Ready</h3>

            <p>
              Use your profile as a starting point when discussing your
              requirements with a property expert.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
