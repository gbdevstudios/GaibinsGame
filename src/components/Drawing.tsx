import React, { useRef } from "react";
import { Action, GameState } from "../../game/logic";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { word } from "./Game";

export const Drawing = ({
  gameState,
  isHost,
  dispatch,
}: {
  gameState: GameState;
  dispatch: (action: Action) => void;
  isHost: boolean;
}) => {
  const ref = useRef<ReactSketchCanvasRef>(null);
  const handleSubmit = () => {
    if (!ref.current) {
      console.error("Wait a minute. Never got the canvas reference!");
      return;
    }
    ref.current.exportImage("png").then((img) => {
      dispatch({ type: "submit-drawing", img });
    });
  };
  const handleForceEnd = () => {
    dispatch({ type: "force-end" });
  };
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Draw: {word}
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">
        <ReactSketchCanvas
          ref={ref}
          width="800px"
          height="700px"
          strokeWidth={4}
          strokeColor="red"
        />
      </div>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "50px",
          border: "3px",
          marginBottom: "7px",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{ marginLeft: "4px" }}
          className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
        >
          Submit
        </button>
        {isHost && (
          <button
            onClick={handleForceEnd}
            style={{ marginLeft: "4px" }}
            className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
          >
            Move to Voting Round!
          </button>
        )}
      </div>
    </>
  );
};
