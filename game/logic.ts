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

type WithUser<T> = T & { user: User };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExit" };

export interface User {
  id: string;
  img: string | undefined;
  votedFor: string | undefined;
}

// This interface holds all the information about your game
export interface GameDb {
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
  "bird",
  "lion",
  "eagle",
  "monkey",
  "fish",
  "Joe Biden",
  "house",
  "cat",
  "dog",
];

// This is how a fresh new game starts out, it's a function so you can make it dynamic!
// In the case of the guesser game we start out with a random target
export const initialGame = (): GameDb => ({
  users: [],
  state: "lobby",
  log: addLog("Game Created!", []),
  prompt: words[Math.floor(Math.random() * 9 + 1)],
});


// Here are all the actions we can dispatch for a user
type GameAction =
  | { type: "start" }
  | { type: "submit-drawing"; img: string;}
  | { type: "submit-vote"; who: string ; }
  | { type: "force-end" };

export const gameUpdater = (
  action: ServerAction,
  db: GameDb
): GameDb => {
  const allSubmitted: boolean = db.users.every((user) => user.hasSubmitted);

  // This switch should have a case for every action type you add.

  // "UserEntered" & "UserExit" are defined by default

  // Every action has a user field that represent the user who dispatched the action,
  // you don't need to add this yourself

  // trying it first without xstate
  switch (action.type) {
    case "UserEntered":
      return {
        ...db,
        users: [...db.users, action.user],
        log: addLog(`user ${action.user.id} joined 🎉`, db.log),
      };

    case "UserExit":
      return {
        ...db,
        users: db.users.filter((user) => user.id !== action.user.id),
        log: addLog(`user ${action.user.id} left 😢`, db.log),
      };
    case "start":
      return {
        ...db,
        state: "drawing",
        log: addLog("everyone here; game started!", db.log),
      };
    case "submit-drawing":
      const updatedUsersSubmitDrawing = db.users.map((user) =>
        user.id === action.user.id ? { 
          ...user,
           img: action.img
        } : user
      );
      
      const allDrawingsSubmitted = updatedUsersSubmitDrawing.every(user => user.img);
      return {
        ...db,
        users: updatedUsersSubmitDrawing,
        state:  allDrawingsSubmitted ? 'voting' : 'drawing',
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
        user.id === action.user.id ? { 
          ...user, 
          votedFor: action.who
         } : user
      );
      
      const allVotesSubmitted = updatedUsersSubmitVote.every(user => user.votedFor);
      return {
        ...db,
        users: updatedUsersSubmitVote,
        state: allVotesSubmitted ? 'viewing-results' : 'voting',
        log: addLog(action.user.id + " submitted a drawing!", db.log),
      };
    );

    return {
      ...db,
      users: updatedUsersSubmitVote,
      hasSubmitted: allSubmitted, // Update hasSubmitted based on all users
      state: "viewing-results",
      log: addLog("check out the results!", db.log),
    };
  }
};
