🏢 Connect 4 Game - Next.js + TypeScript

A web-based Connect 4 game built with Next.js, TypeScript, and Tailwind CSS.Two players can take turns in the same browser window, with the game state managed server-side.

🚀 Features

✅ Two-player mode (Red vs Yellow)
✅ Game state managed on the backend (via Next.js API routes)
✅ Win & draw detection (horizontal, vertical, diagonal)
✅ No database needed (state stored in memory)


🛠 Setup & Installation

1️⃣ Clone the Repository

git clone git@github.com:tomasdavid1/cotera.git
cd cotera

2️⃣ Install Dependencies

npm install

3️⃣ Start the Development Server

yarn dev

🛠 Open http://localhost:3000 to play the game.

🎮 How to Play

1️⃣ Players take turns clicking on a column to drop a piece.
2️⃣ The piece falls to the lowest available row in that column.
3️⃣ The first player to connect 4 pieces in a row (horizontal, vertical, or diagonal) wins!
4️⃣ If the board fills up without a winner, it's a draw.
5️⃣ Click the Restart Game button to start a new match.


💡 Next Steps

- Animations: Add smooth drop animations for pieces.

- Online gaming: Create webhooks to allow more than one player to play at once

- AI Opponent: Implement an AI mode for single-player games.

- Winning Effect: Highlight the winning row/column.

Contributions & feedback welcome! 🚀

