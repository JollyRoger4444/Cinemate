import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Loader.css";
import { Link} from "react-router-dom";
import PageNotFoundImage from "../assets/images/pagenotfound.png";
import { actions } from "../Kimbo/Slice";


export const Error = () => {
  const err = useSelector((state) => state.list.err);
  const dispatch = useDispatch();

  if (!err) return null;
  
  return (
    <div className="loader-overlay">
      <section className="flex flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
            <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">
              {err}, Oops!
            </p>
          <div className="max-w-lg">
            <img
              className="rounded"
              src={PageNotFoundImage}
              alt="404 Page Not Found"
            />
          </div>
        </div>
        <div className="flex justify-center my-4">
          <Link to="/">
            <button onClick={() => dispatch(actions.error(null))} className="w-64 text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg px-5 py-2.5 mr-2 mb-2 font-medium">
              Back to Cinemate
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};