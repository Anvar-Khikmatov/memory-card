import { useState, useEffect } from "react";
import Card from "./Card.jsx";

export default function GridCard({ activeCards, handleClick, isShuffling }) {
  return (
    <div className="grid-card-wrapper">
      {activeCards.map((obj) => (
        <Card
          key={obj.id}
          imgName={obj.imgName}
          heroName={obj.localized_name}
          id={obj.id}
          handleClick={handleClick}
          isShuffling={isShuffling}
        />
      ))}
    </div>
  );
}
