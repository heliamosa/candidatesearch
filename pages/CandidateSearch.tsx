import React, { useState, useEffect } from "react";
import { getCandidate } from "../api/API";

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setIsLoading(true);
    const data = await getCandidate();

    if (data) {
      const randomEmail = data.email || `${data.login}@example.com`;
      const randomAvatar = data.avatar_url || `https://i.pravatar.cc/150?u=${data.login}`;

      setCandidate({ ...data, email: randomEmail, avatar_url: randomAvatar });
    } else {
      setCandidate(null);
    }

    setIsLoading(false);
  };

  const handleAccept = async () => {
    if (!candidate) return;

    let savedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    savedCandidates.push({
      ...candidate,
      email: candidate.email || `${candidate.login}@example.com`,
      avatar_url: candidate.avatar_url || `https://i.pravatar.cc/150?u=${candidate.login}`,
    });

    localStorage.setItem("candidates", JSON.stringify(savedCandidates));

    await fetchCandidate();
  };

  const handleReject = async () => {
    await fetchCandidate();
  };

  return (
    <div className="container">
      {isLoading ? (
        <p className="loading-text">Loading candidate...</p>
      ) : candidate && candidate.login ? (
        <>
          <img src={candidate.avatar_url} alt="Avatar" width="100" />
          <h2>{candidate.name || "No Name Provided"}</h2>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Location:</strong> {candidate.location || "Not Available"}</p>
          <p><strong>Company:</strong> {candidate.company || "Not Available"}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <br />
          <button className="accept-btn" onClick={handleAccept}>+ Accept</button>
          <button className="reject-btn" onClick={handleReject}>- Reject</button>
        </>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
