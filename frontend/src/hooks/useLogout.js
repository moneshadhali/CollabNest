import { useAuthContext } from "./useAuthContext";
import { useSocietyContext } from "./useSocietyContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: societyDispatch } = useSocietyContext();
  const logout = async () => {
    //remove user form the local storage
    localStorage.removeItem("user");
    //dispatch logout action - refresh page and remove user fate
    dispatch({ type: "LOGOUT", payload: null });
    societyDispatch({ type: "SET_SOCIETIES", payload: null });
  };
  return { logout };
};
