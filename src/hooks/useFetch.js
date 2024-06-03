import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Kimbo/Slice";
import { useNavigate, useLocation } from "react-router-dom";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const list = useSelector((state) => state.list.list); // replace with your actual selector

  useEffect(() => {
    dispatch(actions.loading(true));
    async function fetchMovies() {
      try {
        const response = await fetch(url);
        if (!response.ok && response.status !== 404) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 404) {
          nav("*", { state: { fromWatchlist: true } });
        dispatch(actions.loading(false));
        return;
        }
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.error("An error occurred while fetching the movies:", error);
        nav("/"); // Navigate back to home path if an error occurs
      } finally {
        dispatch(actions.loading(false));
      }
    }
    if (location.pathname === "/movies/watchlist") {
      // Introduce a delay of 1 second before re-fetching the data
      setTimeout(fetchMovies, 1800);
    } else {
      fetchMovies();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, nav, list]);
  return { data };
};
