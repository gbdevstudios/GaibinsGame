import React from "react";
import { Action, GameState } from "../../game/logic";

export const Lobby = ({
  gameState, isHost, dispatch,
}: {
  gameState: GameState;
  isHost: boolean;
  dispatch: (action: Action) => void;
}) => {
  const handleStart = () => {
    dispatch({ type: "start" });
  };
  return (
    <>
      <h1 className="text-8xl border-b border-yellow-400 text-center relative">
        LOBBY!!!!!!
      </h1>
      <div
        className="text-9x1 border-b flex flex-col gap-4 py-6 items-center"
        style={{ height: "200px" }}
      >
        Whos going to show up for your party game??
        {isHost && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
                border: "3px",
              }}
              className="text-8x1"
            >
              Hey, since you are the host, you can start the game! Dont make
              them wait!
              <button
                onClick={handleStart}
                className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
                style={{ borderSpacing: "40px", marginLeft: "10px" }}
              >
                Start
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
