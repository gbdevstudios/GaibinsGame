import usePartySocket from "partysocket/react";
import { useState } from "react";
import { GameDb, Action } from "../../game/logic";

export const useGameRoom = (username: string, roomId: string) => {
  const [gameState, setGameState] = useState<GameDb | null>(null);

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_SERVER_URL || "https://partykit-starter-party.mikegai.partykit.dev",
    room: roomId,
    id: username,
    onMessage(event: MessageEvent<string>) {
      setGameState(JSON.parse(event.data));
      console.log(JSON.parse(event.data))
    },
  });

  const dispatch = (action: Action) => {
    socket.send(JSON.stringify(action));
  };

  return {
    gameState,
    dispatch,
  };
};
