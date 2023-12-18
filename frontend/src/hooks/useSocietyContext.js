import { SocietyContext } from "../context/SocietyContext";
import { useContext } from "react";

export const useSocietyContext = () => {
  const context = useContext(SocietyContext);
  if (!context) {
    throw Error(
      "useSocietyContext must be used inside an SocietyContextProvider"
    );
  }
  return context;
};
