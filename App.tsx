import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CandidateSearch from "./pages/CandidateSearch";
import SavedCandidates from "./pages/SavedCandidates";

const App: React.FC = () => {
  return (
    <div>
      <h1>Candidate Search App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/saved-candidates">Saved Candidates</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CandidateSearch />} />
        <Route path="/saved-candidates" element={<SavedCandidates />} />
      </Routes>
    </div>
  );
};

export default App;
