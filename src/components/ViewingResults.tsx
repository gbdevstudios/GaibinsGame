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
  const drawingVotes = R.groupBy((x: User) => x.votedFor!, gameState.users);
  const maxVotes = R.reduce(
    (acc, [id, votes]) => R.max(acc, votes!.length), 0, 
    Object.entries(drawingVotes)
  );
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
            votes={drawingVotes[user.id] ?? []}
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
      {votes.map((v) => (
        <div
          key={v.id}
          style={{ padding: 8, borderRadius: 6, backgroundColor: "green" }}
        >
          {v.id}
        </div>
      ))}
    </div>
  );
};
