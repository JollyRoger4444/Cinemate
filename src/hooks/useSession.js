import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../Kimbo/Slice";

export const useSession = () => {
  const dispatch = useDispatch();
  dispatch(actions.list(sessionStorage.getItem("list")));

  useEffect(() => {
    const session = window.sessionStorage.getItem("session");
    const list = window.sessionStorage.getItem("list");
    if (list) dispatch(actions.list(list));

    dispatch(actions.setGuestSession(session));

    if (!session) {
      async function getGuestSession() {
        try {
          const response = await fetch("http://localhost:5000/api/guest_session/new"
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          dispatch(actions.setGuestSession(data.guest_session_id));
          dispatch(actions.loading(false));
          window.sessionStorage.setItem("session", data.guest_session_id);
        } catch (error) {
          console.error(
            "An error occurred while getting the guest session:",
            error
          );
        }
      }
      getGuestSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
