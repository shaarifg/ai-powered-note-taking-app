import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return [...action.payload];

    case "ADD_NOTE":
      return [...state, action.payload];

    case "UPDATE_NOTE":
      return state.map((note) =>
        note._id === action.payload._id ? { ...note, ...action.payload } : note
      );

    case "UPDATE_POS":
      return state.map((note) =>
        note._id === action.payload.id
          ? { ...note, x: action.payload.x, y: action.payload.y }
          : note
      );

    case "DELETE_NOTE":
      return state.filter((note) => note._id !== action.payload);

    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(reducer, []);
  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
