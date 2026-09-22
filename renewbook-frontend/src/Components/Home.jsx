import React from 'react'
import'./CssHome.css'
import Navbar from './Navbar'
const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">SHARE • EXCHANGE • REUSE</p>

          <h1>
            Give Your Academic
            <span> Resources a Second Life.</span>
          </h1>

          <p className="hero-description">
            RenewBook is a student-focused platform where you can
            share, exchange and discover useful academic resources
            within your college community.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => (window.location.href = "/resources")}
            >
              Browse Resources
            </button>

            <button
              className="secondary-button"
              onClick={() => (window.location.href = "/share")}
            >
              Share a Resource
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-title">
          <p>ABOUT RENEWBOOK</p>
          <h2>What is RenewBook?</h2>
        </div>

        <div className="about-content">
          <p>
            Every year, students finish their courses with textbooks,
            notes, lab manuals and other academic materials that are
            still useful. RenewBook gives these resources a second
            life by connecting students who have resources with
            students who need them.
          </p>

          <p>
            Instead of letting useful materials remain unused,
            students can share, exchange or donate them through one
            simple platform.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-title">
          <p>HOW IT WORKS</p>
          <h2>Simple. Useful. Sustainable.</h2>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Share</h3>
            <p>
              List your unused textbooks, notes, lab manuals or other
              academic resources.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Discover</h3>
            <p>
              Browse resources shared by students from your college
              community.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Request</h3>
            <p>
              Send a request for the resource you need.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Reuse</h3>
            <p>
              The resource gets a second life instead of being wasted.
            </p>
          </div>
        </div>
      </section>

      {/* Why RenewBook */}
      <section className="why-section">
        <div className="section-title">
          <p>WHY RENEWBOOK?</p>
          <h2>More Than Just Sharing</h2>
        </div>

        <div className="benefits-container">
          <div className="benefit-card">
            <h3>Save Money</h3>
            <p>
              Find useful academic materials without always buying
              new ones.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Reduce Waste</h3>
            <p>
              Give existing academic materials a second life.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Help Students</h3>
            <p>
              Share resources with students who need them.
            </p>
          </div>
        </div>
      </section>

      {/* What Can You Share */}
      <section className="categories-section">
        <div className="section-title">
          <p>ACADEMIC RESOURCES</p>
          <h2>What Can You Share?</h2>
        </div>

        <div className="category-container">
          <div>Textbooks</div>
          <div>Notes</div>
          <div>Lab Manuals</div>
          <div>Calculators</div>
          <div>Drawing Instruments</div>
          <div>Project Materials</div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <h2>RenewBook</h2>
        <p>
          Give academic resources a second life.
        </p>
        <p className="copyright">
          © 2026 RenewBook. Student Academic Resource Sharing Platform.
        </p>
      </footer>
    </>
  )
}

export default Home