import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Kimbo/Slice";

export const useUnRate = () => {
  const guestSessionId = useSelector((state) => state.list.guestSessionId);
  const id = useSelector((state) => state.list.movieId);
  const dispatch = useDispatch();
  const [shouldUnRate, setShouldUnRate] = useState(false);

  useEffect(() => {
    if (!shouldUnRate) return;

    dispatch(actions.loading(true));

    async function unRateBySession(guestSessionId, id) {
      try {
        const response = await fetch("http://localhost:5000/api/unrateMovie", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guestSessionId, id }),
        });
        if (!response.ok) {
          throw new Error("An error occurred while unrating the movie");
        }
      } catch (error) {
        console.error("An error occurred while unrating the movie:", error);
      } finally {
        dispatch(actions.loading(false));
      }
    }
    unRateBySession(guestSessionId, id);
    setShouldUnRate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUnRate, id]);
  return setShouldUnRate;
};
