import React, { createContext, useReducer } from "react";
import Dashboard from "./Dashboard";
import User from "../models/user";
import ChannelContainer from "./ChannelContainer";

export const AppContext = createContext<[AppState, React.Dispatch<AppAction>]>(null)

interface IProps {
  user: User;
  authToken: string;
}

export type AppState = {
  user: User;
  authToken: string;
}

export type AppAction =
  | { type: 'SET_USER', user: User }

function appReducer(state: AppState, action: AppAction): AppState {
  switch(action.type) {
    case 'SET_USER': {
      return { ...state, user: action.user };
    }
    default: {
      return state;
    }
  }
}

export default function ChatClient(props: IProps) {
  const [appState, appDispatch] = useReducer(appReducer, {
    user: props.user,
    authToken: props.authToken,
  });

  return (
    <div className="ChatClient">
      <AppContext.Provider value={[appState, appDispatch]}>
        <Dashboard />
        <ChannelContainer />
      </AppContext.Provider>
    </div>
  );
}