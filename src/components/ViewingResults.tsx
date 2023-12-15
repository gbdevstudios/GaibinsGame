import React from "react";
import { Action, GameDb, User } from "../../game/logic";
import { GridContainer } from "./Grid";
import * as R from "ramda";
import { stringToColor } from "@/utils";

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
    (acc, [id, votes]) => R.max(acc, votes!.length),
    0,
    Object.entries(drawingVotes)
  );
  return (
    <div>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        Look who won!
      </h1>
      <GridContainer>
        {gameState.users.map((user) => {
          const votes = drawingVotes[user.id] ?? [];
          return (
            <ResultDrawing
              img={user.img!}
              username={user.id}
              key={user.id}
              isWinner={votes.length === maxVotes}
              votes={votes}
            />
          );
        })}
      </GridContainer>
    </div>
  );
};

type GridItemProps = {
  img: string;
  votes: User[];
  isWinner: boolean;
  username: string;
};

export const ResultDrawing: React.FC<GridItemProps> = ({
  username,
  img,
  votes,
  isWinner,
}) => {
  const itemStyle: React.CSSProperties = {
    width: "100%",
    objectFit: "cover",
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          color: "white",
          borderRadius: 6,
          textAlign: "center",
          backgroundColor: stringToColor(username),
        }}
      >
        {username}
      </div>
      <img src={img} alt="" style={itemStyle} />
      {votes.map((v) => (
        <div
          key={v.id}
          style={{
            padding: 8,
            borderRadius: 6,
            color: "white",
            backgroundColor: stringToColor(v.id),
            marginTop: 6,
            textAlign: "center",
          }}
        >
          {v.id}
        </div>
      ))}
      {isWinner ? (
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            padding: 8,
            borderRadius: 6,
            color: "black",
            backgroundColor: "gold",
            marginTop: 6,
            textAlign: "center",
          }}
        >
          !WINNER!😁😁😁
        </div>
      ) : null}
    </div>
  );
};
