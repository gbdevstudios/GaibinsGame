import React from "react";
import { Action, GameDb, User } from "../../game/logic";
import { GridContainer } from "./Grid";
import * as R from "ramda";

export const ViewingResults = ({
  gameState,
  isHost,
  dispatch,
}: {
  gameState: GameDb;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {
  const drawingVotes = R.groupBy((x: User) => x.votedFor, gameState.users);

  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        Look who won!
      </h1>
      <GridContainer>
        {gameState.users.map((user) => (
          <ResultDrawing
            img={user.img!}
            username={user.id}
            key={user.id}
            votes={drawingVotes[user.id]}
          />
        ))}
      </GridContainer>
    </div>
  );
};

type GridItemProps = {
  img: string;
  votes: User[];
  username: string;
};

export const ResultDrawing: React.FC<GridItemProps> = ({
  username,
  img,
  votes,
}) => {
  const itemStyle: React.CSSProperties = {
    width: "100%",
    objectFit: "cover",
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontWeight: "bold", fontSize: "12px" }}>{username}</div>
      <img src={img} alt="" style={itemStyle} />
      {votes.map(v=> 
        <div>{v.id}</div>)} 
    </div>
  );
};

