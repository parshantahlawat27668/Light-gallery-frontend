import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUser: null,
};



const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.activeUser = action.payload
        },
        removeUser: (state) => {
            state.activeUser = null;
        }
    }
});
export const {setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;