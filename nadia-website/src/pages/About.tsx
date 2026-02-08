export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://via.placeholder.com/600x800/1a2332/ffffff?text=[Agent+Photo]" alt="Nadia Alfante Cagay - Real Estate Agent" />
          </div>
          <div className="about-content">
            <h2 className="section-title">Your Real Estate Specialist</h2>
            <p className="about-text">
              What makes my work different is simple: I don't sell properties—I guide decisions.
            </p>
            <p className="about-text">
              My approach is rooted in clarity, ethics, and long-term thinking. In an industry often driven by urgency and pressure, I take the opposite path. I start by understanding who you are, where you are financially, and what the property is truly meant for—home, investment, or future security. Only then do I recommend options that genuinely fit.
            </p>
            <p className="about-text">
              I specialize in buyer profiling, ensuring that the unit, location, and payment structure align with your lifestyle and risk comfort. This means no forced upgrades, no emotional pushing, and no "buy now, regret later." Every recommendation is grounded in market understanding, legal awareness, and sustainability—both for you as a buyer and for the property's long-term value.
            </p>
            <p className="about-text">
              I am also deeply involved in brokerage training and real estate education, which allows me to explain contracts, titles, and payment terms in a way that is clear and transparent. My clients don't just buy—they understand what they are buying.
            </p>
            <p className="about-text">
              My goal is not a one-time transaction. It is a relationship built on trust, informed choices, and confidence—so that years from now, you can look back and say: that decision still makes sense.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">4</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Transparency</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Client Trust</div>
              </div>
            </div>

            <div className="about-specialties">
              <h3>My Specialties</h3>
              <ul>
                <li>🏢 Condominiums</li>
                <li>🏡 Houses</li>
                <li>🌳 Vacant Lots</li>
                <li>💼 Investment Properties</li>
                <li>🔑 First-Time Buyers</li>
                <li>📈 Buyer Profiling & Market Analysis</li>
                <li>📚 Real Estate Education & Training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
