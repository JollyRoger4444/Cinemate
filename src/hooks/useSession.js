import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../Kimbo/Slice";

export const useSession = () => {
    
    const dispatch = useDispatch();
    dispatch(actions.list(sessionStorage.getItem('list')));

    useEffect(() => {
        const session = window.sessionStorage.getItem('session');
        const list = window.sessionStorage.getItem('list');
        if (list) dispatch(actions.list(list));

        dispatch(actions.setGuestSession(session));

        if (!session) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8'
                }
            };

            async function getGuestSession() {
                try {
                    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    dispatch(actions.setGuestSession(data.guest_session_id));
                    dispatch(actions.loading(false));
                    window.sessionStorage.setItem('session', data.guest_session_id);
                } catch (error) {
                    console.error('An error occurred while getting the guest session:', error);
                }
            }
            getGuestSession();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};