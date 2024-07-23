import { createSlice } from "@reduxjs/toolkit";

const isLocalStorageAvailable = typeof localStorage !== 'undefined';

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: isLocalStorageAvailable ? localStorage.getItem("accessToken") ? true : false : false,
        status: "",
        error: "",
        token: isLocalStorageAvailable ? localStorage.getItem("accessToken") || '' : ''
    },
    reducers: {
        loginuser: (state, actions) => {
            localStorage.setItem("accessToken", actions.payload);
            state.token = actions.payload;
            state.isLogin = true;
            state.status = 'succeeded';
            state.error = null;
        },
        logout: (state, actions) => {
            localStorage.removeItem('accessToken')
            state.user = [];
            state.isLogin = false;
            state.status = "";
            state.error = "";
            state.token = "";
        }
    }

})

export const { loginuser, logout } = loginSlice.actions;

export default loginSlice.reducer