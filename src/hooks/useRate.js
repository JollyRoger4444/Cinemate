import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Kimbo/Slice";

export const useRate = () => {
  const guestSessionId = useSelector((state) => state.list.guestSessionId);
  const id = useSelector((state) => state.list.movieId);
  const dispatch = useDispatch();
  const [shouldRate, setShouldRate] = useState(false);

  useEffect(() => {
    if (!shouldRate) return;

    dispatch(actions.loading(true));

    async function rateBySession(guestSessionId, id) {
      try {
        
        const response = await fetch("http://localhost:5000/api/rateMovie",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ guestSessionId, id }),
          }
        );
        if (!response.ok) {
          throw new Error("An error occurred while rating the movie");
        }
      } catch (error) {
        console.error("An error occurred while rating the movie:", error);
      } finally {
        dispatch(actions.loading(false));
      }
    }
    rateBySession(guestSessionId, id);
    setShouldRate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRate, id]);

  return setShouldRate;
};
