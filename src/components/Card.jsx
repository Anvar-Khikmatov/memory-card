import { useState, useEffect } from 'react'


export default function Card({ imgName, heroName, id, handleClick }) {

  
  return (
    <div className="card-wrapper"  onClick={() => {handleClick(id)}}>
      <img src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${imgName}.png`} alt={name} className="src" />
      <div className="img-names">{heroName}</div>
    </div>
  )
}