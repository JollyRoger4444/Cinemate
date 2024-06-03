import { createSlice } from '@reduxjs/toolkit';

export const Slice = createSlice({
    name: "list",
    initialState: {
        list: [],
        guestSessionId: "",
        movieId: "",
        loading:false,
    },
    reducers: {
        add(state, action) {
            state.list = state.list.concat(action.payload);
            sessionStorage.setItem('list', JSON.stringify(state.list));
            state.movieId = action.payload;
        },
        remove(state, action) {
            state.list = state.list.filter(item => item !== action.payload);
            sessionStorage.setItem('list', JSON.stringify(state.list));
            state.movieId = action.payload;
        },
        setGuestSession(state, action) {
            console.log(action.payload);
            state.guestSessionId = action.payload;
        },
        loading(state, action) {
            state.loading=action.payload;
        },
        list(state, action) {
            let storedList = action.payload;
            if (storedList) {
                state.list = JSON.parse(storedList);
            } else {
                state.list = [];
            };
        }
    }
}); 

export const { actions } = Slice;
export default Slice.reducer;