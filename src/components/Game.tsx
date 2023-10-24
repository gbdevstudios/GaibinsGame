import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { stringToColor } from "@/utils";
import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "../draw";
import { GameState } from "../../game/logic";

interface GameProps {
  username: string;
  roomId: string;
}

const Lobby = ({ gameState, isHost }: { gameState: GameState, isHost: boolean }) => {
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        LOBBY!!!!!!
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">
        Who's going to show up for your party game??
        {isHost && (
          <div>
            <div>Hey, since you are the host, you can start the game! Don't make them wait!</div>
            <button style={{ backgroundColor: 'green' , color: 'white', padding: '8px'}}>Start</button>
          </div>
        )}
      </div>
    </>
  );
};

const Drawing = ({ gameState }: { gameState: GameState }) => {
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Guess the Drawing!
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">
        <CanvasDraw />
      </div>
    </>
  );
};

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);

  // Local state to use for the UI
  const [guess, setGuess] = useState<number>(0);

  // Indicated that the game is loading
  if (gameState === null) {
    return (
      <p>
        <span className="transition-all w-fit inline-block mr-4 animate-bounce">
          🎲
        </span>
        Waiting for server...
      </p>
    );
  }

  const isHost = gameState.users[0].id === username;

  const handleGuess = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Dispatch allows you to send an action!
    // Modify /game/logic.ts to change what actions you can send
    dispatch({ type: "guess", guess: guess });
  };

  const phase = (() => {
    switch (gameState.state) {
      case "lobby":
        return <Lobby gameState={gameState} isHost={isHost} />;
      case "drawing":
        return <Drawing gameState={gameState} />;
    }
  })();

  return (
    <>
      {phase}

      <section>
        <div className="border-t border-yellow-400 py-2" />

        <div className=" bg-yellow-100 flex flex-col p-4 rounded text-sm">
          {gameState.log.map((logEntry, i) => (
            <p key={logEntry.dt} className="animate-appear text-black">
              {logEntry.message}
            </p>
          ))}
        </div>

        <h2 className="text-lg">
          Players in room <span className="font-bold">{roomId}</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {gameState.users.map((user) => {
            return (
              <p
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-white"
                style={{ backgroundColor: stringToColor(user.id + roomId) }}
                key={user.id}
              >
                {user.id}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Game;
