import React from "react";
import { Action, GameDb } from "../../game/logic";

export const ViewingResults = ({
  gameState, isHost, dispatch,
}: {
  gameState: GameDb;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {

  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        Look who won!
      </h1>
      {gameState.users.map(user => (
        <div key={user.id}>
          <div>{user.id}</div>
          <img src={user.img} />
        </div>
      ))}
    </div>
  );
};