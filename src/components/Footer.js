import { useSession } from "../hooks";
import { Link } from "react-router-dom";

export const Footer = () => {
    useSession();
    return (
        <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="/" className="hover:underline">Cinemate by ShubhamSarda and Shon Malka using The Movie Database (TMDB)  </Link>. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/shonmalka/" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">LinkedIn - Shon Malka</a>
                </li>
            </ul>
        </footer>
    )
}
