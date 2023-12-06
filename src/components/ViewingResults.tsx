import React from "react";
import { Action, GameDb } from "../../game/logic";

export const Voting = ({
  gameState, isHost, dispatch,
}: {
  gameState: GameDb;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {

  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Vote on the Drawings!
      </h1>
      {Object.entries(gameState.img).map(([id, obj]) => (
        <div key={id}>
          <div>{id}</div>
          <img src={gameState.img} />
        </div>
      ))}
    </div>
  );
};