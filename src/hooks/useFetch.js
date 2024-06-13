import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Kimbo/Slice";
import { useNavigate, useLocation } from "react-router-dom";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const url = `http://localhost:5000/api/fetch/${apiPath}?query=${queryTerm}`;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const list = useSelector((state) => state.list.list); 

  useEffect(() => {
    dispatch(actions.loading(true));
    async function fetchMovies() {
      try {
        dispatch(actions.error(null));
        const response = await fetch(url);
        if (!response.ok && response.status !== 404) {
          dispatch(actions.loading(false));
          dispatch(actions.error(response.status));
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.error("An error occurred while fetching the movies:", error);
        nav("/"); 
      } finally {
        dispatch(actions.loading(false));
      }
    }
    if (location.pathname === "/movies/watchlist") {
      setTimeout(fetchMovies, 1800);
    } else {
      fetchMovies();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, nav, list]);
      if (!data) {
        dispatch(actions.error("Nothing to see here!"));
      }
  return { data };
};
