// util for easy adding logs
const addLog = (message: string, logs: GameDb["log"]): GameDb["log"] => {
  return [{ dt: new Date().getTime(), message: message }, ...logs].slice(
    0,
    MAX_LOG_SIZE
  );
};

// Do not change!
export type Action = DefaultAction | GameAction;

// Do not change!
export type ServerAction = WithUser<DefaultAction> | WithUser<GameAction>;

// The maximum log size, change as needed
const MAX_LOG_SIZE = 4;

type WithUser<T> = T & { user: MiniUser };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExit" };

export interface MiniUser {
  id: string
}
export interface User {
  id: string;
  isConnected: boolean;
  img?: string;
  votedFor?: string;
  hasSubmitted: boolean;
}

// This interface holds all the information about your game
export interface GameDb {
  [x: string]: { [s: string]: unknown } | ArrayLike<unknown>;
  state: "lobby" | "instructions" | "drawing" | "voting" | "viewing-results";
  users: User[];
  log: {
    dt: number;
    message: string;
  }[];
  prompt: string;
}
export let word: any;

const words = [
  "emo rock artist",
  "jack stebbins",
  "multiple frogs",
  "batman",
  "corpses in a wheelbarrow",
  "donkey fucking a tree",
  "69",
  "george bush",
  "donald trump on a golden toilet",
  "duck peeing on a fish",
  "ugliest person you know",
  "donald trump joe biden sex",
  "baby smoking a blunt",
  "charlie riding alligator",
  "shark wearing bikini",
  "burger",
  "six fingers",
  "your least favorite person in the room being crucified",
  "person to your left dieing",
  "centaur but backwards",
  "person to your right hairless and noseless",
  "gay monkeys",
  "how aids was made",
  "nightmare blunt rotation",
  "your favorite position",
  "your least favorite etacher as a monkey",
  "your favorite caricature"
];

// This is how a fresh new game starts out, it's a function so you can make it dynamic!
// In the case of the guesser game we start out with a random target
export const initialGame = (): GameDb => ({
  users: [],
  state: "lobby",
  log: addLog("Game Created!", []),
  prompt: words[Math.floor(Math.random() * 25 + 1)],
});

// Here are all the actions we can dispatch for a user
type GameAction =
  | { type: "start" }
  | { type: "submit-drawing"; img: string }
  | { type: "submit-vote"; who: string }
  | { type: "force-end" };

export const gameUpdater = (action: ServerAction, db: GameDb): GameDb => {
  const allSubmitted: boolean = db.users.every((user) => user.hasSubmitted);

  switch (action.type) {
    case "UserEntered":
      let newUsers: User[]
      if (db.users.some(x => x.id === action.user.id)) {
        // user exists so just update
        newUsers = db.users.map(x => x.id === action.user.id ? {
          ...x,
          isConnected: true,
        } : x)
      } else {
        // user does not exist (joining for the first time) so add to the end of the list
        newUsers = [...db.users, {
          ...action.user,
          hasSubmitted: false,
          isConnected: true,
        }]
      }
      return {
        ...db,
        users: newUsers,
        log: addLog(`user ${action.user.id} connected 🎉`, db.log),
      };

    case "UserExit":
      const newUsers2 = db.users.map(x => x.id === action.user.id ? {
        ...x,
        isConnected: false,
      } : x)
      return {
        ...db,
        users: newUsers2,
        log: addLog(`user ${action.user.id} disconnected 😢`, db.log),
      };

    case "start":
      return {
        ...db,
        state: "drawing",
        log: addLog("everyone here; game started!", db.log),
      };

    case "submit-drawing":
      const updatedUsersSubmitDrawing = db.users.map((user) =>
        user.id === action.user.id
          ? {
              ...user,
              img: action.img,
            }
          : user
      );

      const allDrawingsSubmitted = updatedUsersSubmitDrawing.every(
        (user) => user.img
      );
      console.log(allDrawingsSubmitted, updatedUsersSubmitDrawing)
      return {
        ...db,
        users: updatedUsersSubmitDrawing,
        state: allDrawingsSubmitted ? "voting" : "drawing",
        log: addLog(action.user.id + " submitted a drawing!", db.log),
      };

    case "force-end":
      return {
        ...db,
        state: "voting",
        log: addLog("Host moves us on to voting", db.log),
      };

    case "submit-vote":
      const updatedUsersSubmitVote = db.users.map((user) =>
        user.id === action.user.id
          ? {
              ...user,
              votedFor: action.who,
            }
          : user
      );

      const allVotesSubmitted = updatedUsersSubmitVote.every(
        (user) => user.votedFor
      );
      return {
        ...db,
        users: updatedUsersSubmitVote,
        state: allVotesSubmitted ? "viewing-results" : "voting",
        log: addLog(action.user.id + " voted!", db.log),
      };

    default:
      return db;
  }
};
