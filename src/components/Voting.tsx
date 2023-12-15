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
          <VoteDrawing
            img={user.img!}
            key={user.id}
            onClick={() => handleVote(user.id)}
          />
        ))}
      </GridContainer>
    </div>
  );
};
type GridItemProps = {
  img: string;
  onClick: () => void;
};

export const VoteDrawing: React.FC<GridItemProps> = ({ img, onClick }) => {
  const itemStyle: React.CSSProperties = {
    width: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={{width: '100%'}} onClick={onClick}>
        <img src={img} alt="" style={itemStyle} />
    </div>
  )
};