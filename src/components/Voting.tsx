import React from "react";
import { Action, GameState } from "../../game/logic";

export const Voting = ({
  gameState, isHost, dispatch,
}: {
  gameState: GameState;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {
  const handleVote = () => {
    dispatch({ type: "submit-vote" });
  };

  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Vote on the Drawings!
      </h1>
      {Object.entries(gameState.drawings).map(([id, obj]) => (
        <div>
          <div>{id}</div>
          <img src={obj.img} />
        </div>
      ))}
    </div>
  );
};
