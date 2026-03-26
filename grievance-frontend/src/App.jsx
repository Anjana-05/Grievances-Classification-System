import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      setResult(data.department);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("complaint-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">SmartCity<span>Connect</span></div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <button className="nav-btn" onClick={scrollToForm}>Report Issue</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Help Us Build a Better City</h1>
          <p>Instantly route your city-related grievances to the right department using our AI-powered classification system. Fast, reliable, and transparent.</p>
          <button className="cta-btn" onClick={scrollToForm}>Report an Issue Now</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>1. Describe the Issue</h3>
            <p>Tell us about the problem you're facing in your neighborhood using everyday language.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>2. AI Processing</h3>
            <p>Our intelligent system analyzes your complaint and categorizes it instantly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>3. Direct Routing</h3>
            <p>Your grievance is automatically forwarded to the exact department that can fix it.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="complaint-section" className="form-section">
        <div className="container">
          <div className="card">
            <h1 className="title">Submit Your Grievance</h1>
            <p className="subtitle">Let the AI find the right department for you</p>

            <textarea
              className="input-box"
              placeholder="e.g. There is a huge pothole on 5th Avenue that needs immediate repair..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="5"
            />

            <button 
              className={`submit-btn ${loading ? 'loading' : ''}`} 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Find Department & Submit'}
            </button>

            {result && (
              <div className="result-box">
                <h3>Assigned Department:</h3>
                <span className="department-badge">{result}</span>
                <p className="success-msg">✓ Your grievance has been successfully logged!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SmartCity Connect. Making urban living better.</p>
      </footer>
    </div>
  );
}

export default App;