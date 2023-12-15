import React from "react";
import { Action, GameDb } from "../../game/logic";
import { GridContainer, Drawing } from "./Grid";

export const Voting = ({
  gameState,
  isHost,
  dispatch,
}: {
  gameState: GameDb;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {
  const handleVote = (id: string) => {
    dispatch({ type: "submit-vote", who: id });
  };

  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Vote on the Drawings!
      </h1>
      <GridContainer>
        {gameState.users.map((user) => (
          <Drawing
            img={user.img!}
            username={user.id}
            key={user.id}
            onClick={() => handleVote(user.id)}
          />
        ))}
      </GridContainer>
    </div>
  );
};
