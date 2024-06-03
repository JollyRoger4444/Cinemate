import { Link, useLocation } from "react-router-dom";
import Backup from "../assets/images/backup.png"
import { useDispatch,useSelector } from "react-redux";
import { actions } from "../Kimbo/Slice";
import { useRate} from '../hooks/useRate';
import { useUnRate } from '../hooks/useUnRate';

export const Card = ({ movie }) => {
  const { id, original_title, overview, poster_path } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup;
  const dispatch = useDispatch();
  const setShouldRate = useRate();
  const setShouldUnRate = useUnRate();
  const list = useSelector((state) => state.list.list);
  const isAdded = list.includes(id);
  const location = useLocation();
  const isWatchlistPage = location.pathname === "/movies/watchlist";


  const handleAdd = () => {
    dispatch(actions.add(id));
    setShouldRate(true);
    };

  const handleRemove = () => {
    dispatch(actions.remove(id));
    setShouldUnRate(true);
  };

    let cardClass =
      "max-w-sm bg-white border border-gray-200 shadow-md dark:bg-gray-800 m-3 flex flex-col max-w-sm rounded-lg dark:border-gray-700";
    if (isWatchlistPage && !isAdded) {
      cardClass += " hidden";
    }

  return (
    <div className={cardClass}>
      <div className="flex-grow">
        <Link to={`/movie/${id}`}>
          <img className="rounded-t-lg" src={image} alt="" />
        </Link>
        <div className="p-5">
          <Link to={`/movie/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {original_title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {overview}
          </p>
        </div>
      </div>
      <div className="p-5 flex justify-center items-center space-x-4">
        {isAdded ? (
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
          >
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );};