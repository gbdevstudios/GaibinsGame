import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { stringToColor } from "@/utils";
import React, { Component } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
//import CanvasDraw from "../draw";
import { object } from "zod";
import styles from "./Game";
import { Drawing } from "./Drawing";
import { Voting } from "./Voting";
import { Lobby } from "./Lobby";
import { ViewingResults } from "./ViewingResults";

interface GameProps {
  username: string;
  roomId: string;
}

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

  const phase = (() => {
    switch (gameState.state) {
      case "lobby":
        return (
          <Lobby gameState={gameState} isHost={isHost} dispatch={dispatch} />
        );
      case "drawing":
        return (
          <Drawing
            userId={username}
            gameState={gameState}
            isHost={isHost}
            dispatch={dispatch}
          />
        );
      case "voting":
        return (
          <Voting gameState={gameState} isHost={isHost} dispatch={dispatch} />
        );
      case "viewing-results":
        return (
          <ViewingResults
            gameState={gameState}
            isHost={isHost}
            dispatch={dispatch}
          />
        );
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
                style={{ backgroundColor: stringToColor(user.id), opacity: user.isConnected ? 1 : 0.5 }}
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
