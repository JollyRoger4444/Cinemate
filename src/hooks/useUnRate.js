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
        const options = {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8'
            },
        };

        async function unRateBySession(guestSessionId, id) {
            try {
                await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`, options);
            } catch (error) {
                console.error('An error occurred while unrating the movie:', error);
            } finally {
                dispatch(actions.loading(false));
            }
        }
        unRateBySession(guestSessionId, id);
        setShouldUnRate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldUnRate, id]);
    return setShouldUnRate;

}