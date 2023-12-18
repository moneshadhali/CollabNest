import { createContext, useReducer } from "react";

export const SocietyContext = createContext();

export const societyReducer = (state, action) => {
  switch (action.type) {
    case "SET_SOCIETIES":
      return {
        societies: action.payload,
      };
    case "CREATE_SOCIETIES":
      return {
        societies: [action.payload, ...state.societies],
      };
    case "DELETE_SOCIETIES":
      return {
        societies: state.societies.filter((s) => s._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SocietyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(societyReducer, {
    societies: null,
  });
  return (
    <SocietyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocietyContext.Provider>
  );
};

//Context lets components pass information deep down without explicitly passing props.
//Its able to access app data through 'children' due to 'SocietyContextProvider' being wrapped around index.js

//useReducer is similar to useState. 'state' contains the data
//and dispatch make changes to data by passing in parameters
//1 parameter is the type of change being made (CRUD)
//2 parameter is the new data being passed
//The parameter and arguments are called 'action'
//when dispatch triggers the societyReducer function which will update the documents/website

//QUESTION: Whats ...state? why do we add the dots?
//this SocietyContext sits on top off App.js
