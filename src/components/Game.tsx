import { useState } from "react";
import { useGameRoom } from "@/hooks/useGameRoom";
import { stringToColor } from "@/utils";
import React, { Component } from "react";
import { useRef } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "../draw";
import { Action, GameState } from "../../game/logic";
import { object } from "zod";
import styles from './Game';

interface GameProps {
  username: string;
  roomId: string;
}

//const firstCanvas = useRef(object);
//const secondCanvas = useRef();

//const handleClick = () => {
  //const data = firstCanvas.current.getSaveData();
  //secondCanvas.current.loadSaveData(data);
//};

let word:any;

const words = [
  "bird",
  "lion",
  "eagle",
  "monkey",
  "fish",
  "Joe Biden",
  "house",
  "cat",
  "dog"
]

word  = words[Math.floor(Math.random()*9+1)]

const Lobby = ({ gameState, isHost, dispatch }: { gameState: GameState, isHost: boolean, dispatch: (action: Action) => void }) => {
  const handleStart = () => {
    dispatch({ type: 'start' })
  }
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        LOBBY!!!!!!
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">
        Whos going to show up for your party game??
        {isHost && (
          <div >
            <div>Hey, since you are the host, you can start the game! Dont make them wait!</div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '50px', border: "3px"}}>
            <button 
            onClick={handleStart} 
            className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
            >Start</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Drawing = ({ gameState, isHost, dispatch }: { gameState: GameState, dispatch: (action:Action) => void, isHost: boolean, }) => {
  const handleDraw = () => {
    dispatch({ type: 'submit-drawing' })
  }
  let img = "";
    return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Draw: {word}
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">

      <CanvasDraw />
        
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '50px', border: "3px"}}>
        <button 
        //onClick={handleClick}
        className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
        >
        Save
        </button>
        <button 
        className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle l-padding-50"
        >
        Undo
        </button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '70px', border: "3px"}}>
        <label className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle l-padding-25"
        >Ready? 
           <input type="checkbox"
          className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle l-padding-25"
          ></input>
          {isHost && (
            <button onClick={handleDraw}
            className="bg-black rounded p-4 inline-block shadow text-xs text-stone-50 hover:animate-wiggle"
            >Move to Voting Round!</button>
          )}
        </label>
      </div>
    </>
  );
};

const Voting = ({ gameState, isHost, dispatch}: {gameState: GameState, isHost: boolean, dispatch: (action:Action) => void}) => {
  const handleVote = () => {
    dispatch({type: 'submit-vote'})
  }
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🖌️ Vote on the Drawings!
      </h1>
      <div className="flex flex-col gap-4 py-6 items-center">
        <input type="text">
          Vote!:
        </input>
      </div>
    </>

  );
};

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);

  // Local state to use for the UI
  const [guess, setGuess] = useState<number>(0);

  // Indicated that the game is loading
  if (gameState === null) {
    return (
      <p>
        <span className="transition-all w-fit inline-block mr-4 animate-bounce">
          🎲
        </span>
        Waiting for server...
      </p>
    );
  }

  const isHost = gameState.users[0].id === username;

  const phase = (() => {
    switch (gameState.state) {
      case "lobby":
        return <Lobby gameState={gameState} isHost={isHost} dispatch={dispatch} />;
      case "drawing":
        return <Drawing gameState={gameState} isHost={isHost} dispatch={dispatch}/>;
      case "voting":
        return <Voting gameState={gameState} isHost={isHost} dispatch={dispatch} />;
    }
  })();

  return (
    <>
      {phase}

      <section>
        <div className="border-t border-yellow-400 py-2" />

        <div className=" bg-yellow-100 flex flex-col p-4 rounded text-sm">
          {gameState.log.map((logEntry, i) => (
            <p key={logEntry.dt} className="animate-appear text-black">
              {logEntry.message}
            </p>
          ))}
        </div>

        <h2 className="text-lg">
          Players in room <span className="font-bold">{roomId}</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {gameState.users.map((user) => {
            return (
              <p
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-white"
                style={{ backgroundColor: stringToColor(user.id + roomId) }}
                key={user.id}
              >
                {user.id}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Game;
