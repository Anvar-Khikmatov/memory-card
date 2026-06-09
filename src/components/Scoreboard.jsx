import { useState, useEffect } from "react";

export default function Scoreboard({ currentScore, bestScore, rounds }) {
  return (
    <>
      <div className="round-display">{rounds}/7 round</div>
      <div className="scoreboard-wrapper">
        <div className="current-score">Current score: {currentScore}</div>
        <div className="best-score">Best score {bestScore} </div>
      </div>
    </>
  );
}
