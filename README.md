# Dota 2 Memory Card Game

A browser-based memory card game built with React, featuring Dota 2 heroes fetched from the OpenDota API.

**Live Demo:** [View](https://anvar-khikmatov.github.io/memory-card/)

---

## How to Play

Click hero cards without clicking the same hero twice. Cards shuffle after every click. If you click a hero you already picked, the game resets.

The game runs across 7 rounds. Each round you clear, 2 new heroes are added and the previous ones are retired. Complete all 7 rounds without a mistake to win.

- Round 1: 4 cards
- Round 2: 6 cards
- Round 3: 8 cards
- Round 4: 10 cards
- Round 5: 12 cards
- Round 6: 14 cards
- Round 7: 16 cards

Max possible score: 70

---

## Features

- 127 Dota 2 heroes fetched from the OpenDota API
- Progressive difficulty across 7 rounds
- Shuffle animation on every card click
- Current score and best score tracking
- Win and loss modals
- Background music toggle with sound on/off icon
- Dota 2 themed design with custom scrollbar and medieval font

---

## Built With

- React
- Vite
- OpenDota API
- react-icons
- CSS with native nesting

---

## Local Setup

```bash
git clone https://github.com/Anvar-Khikmatov/memory-card.git
cd memory-card
npm install
npm run dev
```

---

## What I Practiced

- `useEffect` for data fetching and side effect management
- `useRef` for persistent Audio object across renders
- State lifting and prop drilling across component tree
- Fisher-Yates shuffle algorithm
- Async functions inside useEffect
- Conditional rendering for game states