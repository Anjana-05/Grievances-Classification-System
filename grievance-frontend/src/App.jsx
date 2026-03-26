import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
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
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Smart City Grievances</h1>
        <p className="subtitle">Submit your complaint to find the right department</p>

        <textarea
          className="input-box"
          placeholder="Describe your grievance here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Find Department
        </button>

        {result && (
          <div className="result-box">
            <h3>Assigned Department:</h3>
            <span className="department-badge">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;