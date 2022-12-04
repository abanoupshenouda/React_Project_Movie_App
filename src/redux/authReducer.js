import { createSlice } from "@reduxjs/toolkit"

const loggedInUser = sessionStorage.getItem('user-details')
    ? JSON.parse(sessionStorage.getItem('user-details'))
    : null;
const accessToken = sessionStorage.getItem('access-token')
    ? sessionStorage.getItem('access-token')
    : null;

const initialState = {
    user_details: loggedInUser,
    accessToken: accessToken,
    isLoggedIn:accessToken?true:false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user_details = action.payload;
            state.isLoggedIn = true;
            sessionStorage.setItem('user-details', action.payload);
            
        },
        logoutSuccess: (state) => {
            state.user_details = null;
            state.isLoggedIn = false;
            sessionStorage.removeItem('user-details');
            sessionStorage.removeItem('access-token');
        },
        signupSuccess: (state,action) =>{
            state.isRegistered = true;
        }
    }
});

export const { loginSuccess, logoutSuccess, signupSuccess } = authSlice.actions;

export default authSlice.reducer;