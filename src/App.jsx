import { useState, useEffect, useRef } from "react";
import "./App.css";
import GridCard from "./components/CardGrid.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";

function App() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [activeCards, setActiveCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [initialCard, setInitialCard] = useState(4);
  const [rounds, setRounds] = useState(1);
  const [winner, setWinner] = useState(false);
  const [lost, setLost] = useState(false);
  const [isShuffling, setShuffling] = useState(false);
  const [clickedTimes, setClickedTimes] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const getBigReset = () => {
    setData(fullData);
    setActiveCards([]);
    setClickedCards([]);
    setInitialCard(4);
    setRounds(1);
    setWinner(true);
    setClickedTimes(0);
    setCurrentScore(0);
  };

  const getLossRound = () => {
    setLost(true);
    setCurrentScore(0);
    setClickedCards([]);
    setInitialCard(4);
    setRounds(1);
    setClickedTimes(0);
    setData(fullData);
  };

  const getPlayRound = (id) => {
    setClickedCards([...clickedCards, id]);
    setCurrentScore((prev) => prev + 1);
    shuffleInPlace(activeCards);
  };

  const getNextRound = (id) => {
    const removeUsedData = data.filter(
      (obj) => !activeCards.some((hero) => hero.id === obj.id),
    );
    setData(removeUsedData);
    setActiveCards([]);
    setClickedCards([]);
    setClickedTimes(0);
    setCurrentScore((prev) => prev + 1);
    setInitialCard((prev) => prev + 2);
    setRounds((prev) => prev + 1);
  };

  const shuffleInPlace = (activeCards) => {
    setShuffling(true);
    setTimeout(() => {
      const tempActiveCards = [...activeCards];
      for (let i = tempActiveCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempActiveCards[i], tempActiveCards[j]] = [
          tempActiveCards[j],
          tempActiveCards[i],
        ];
      }
      setShuffling(false);
      setActiveCards(tempActiveCards);
    }, 280);
  };

  const handleClick = (id) => {
    setClickedTimes((prev) => prev + 1);
    if (clickedCards.includes(id)) {
      getLossRound();
    } else if (clickedTimes + 1 == initialCard) {
      getNextRound(id);
    } else {
      getPlayRound(id);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    audioRef.current = new Audio("/assets/dota2-reborn.mp3");
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    async function getCardInfo() {
      const response = await fetch("https://api.opendota.com/api/heroes");
      const data = await response.json();
      const cleaned = data.map((hero) => ({
        ...hero,
        imgName: hero.name.replace("npc_dota_hero_", ""),
      }));
      setData(cleaned);
      setFullData(cleaned);
    }
    getCardInfo();
  }, []);

  useEffect(() => {
    if (!data) return;
    let chosenCards = [];
    for (let i = 0; i < initialCard; i++) {
      const randomNumber = Math.floor(Math.random() * (data.length - 1));
      if (!chosenCards.some((obj) => obj.id == data[randomNumber].id)) {
        chosenCards.push(data[randomNumber]);
      } else i--;
    }
    setActiveCards(chosenCards);
  }, [data]);

  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  }, [currentScore]);

  useEffect(() => {
    if (rounds === 8) getBigReset();
  }, [rounds]);

  return (
    <div className="body-wrapper">
      <div className="bg-overlay"></div>
      <Scoreboard
        currentScore={currentScore}
        bestScore={bestScore}
        rounds={rounds}
      />

      <GridCard
        activeCards={activeCards}
        handleClick={handleClick}
        isShuffling={isShuffling}
      />

      {winner && (
        <div className="modal-win">
          <div className="modal-content win">
            You are the winner!
            <button className="modal-btn" onClick={() => setWinner(false)}>
              Play again
            </button>
          </div>
        </div>
      )}

      {lost && (
        <div className="modal-loss">
          <div className="modal-content loss">
            Better luck next time
            <button className="modal-btn" onClick={() => setLost(false)}>
              Play again
            </button>
          </div>
        </div>
      )}

      <button className="song" onClick={toggleSound}>
        {" "}
        {isPlaying ? <GiSoundOn /> : <GiSoundOff />}{" "}
      </button>
    </div>
  );
}

export default App;
