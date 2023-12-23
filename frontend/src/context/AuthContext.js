import { createContext, useReducer } from "react";

export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return { state };
  }
};
//custom component that wrap around entire app and provide value for AuthContext
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log("AuthContext state", state);
  //This return will wrap the codes around the whole application (the values - state and dispatch function ready to be used when called)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
