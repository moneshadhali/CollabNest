import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    //remove user form the local storage
    localStorage.removeItem("user");
    //dispatch logout action - refresh page and remove user fate
    dispatch({ type: "LOGOUT", payload: null });
  };
  return { logout };
};
