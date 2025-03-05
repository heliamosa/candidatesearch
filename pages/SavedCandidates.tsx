import React, { useState, useEffect } from "react";

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  return (
    <div className="container">
      <h2>Saved Candidates</h2>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <div key={index}>
            <img src={candidate.avatar_url} alt="Avatar" width="50" />
            <h3>{candidate.name || "No Name"}</h3>
            <p><strong>Username:</strong> {candidate.login}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Location:</strong> {candidate.location || "Not Available"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))
      ) : (
        <p>No saved candidates</p>
      )}
    </div>
  );
};

export default SavedCandidates;
