import { createSlice } from "@reduxjs/toolkit"
import { getUserProfile, getAllUsers, getUserInformation } from "../services/userDetailsService"
import { onError } from "./model"

const user = createSlice({
    name: "user",
    initialState: {
        info: [],
        users: [],
        role: [],
        token: ''
    },
    reducers: {
        isAuth: (user, action) => {
            user.info = action.payload.info,
            user.token = action.payload.token
        },

        userAdmin: (user, action) => {
            user.users = action.payload.users
        },
        
        roleAdmin: (user, action) => {
            user.role = action.payload.role
        },
    }
})

export const Auth = (token) => async ( dispatch ) => {
    try {
        const profile = await getUserProfile(token)
        if(!profile.success) return dispatch(onError({ error: profile.msg }));
        dispatch(isAuth({ info: profile.user, token: token }));

    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
};

export const Users = (token) => async (dispatch) => {
    try {
        const users = await getAllUsers(token)
        if(!users.success) return dispatch(onError({ error: users.msg }));
        dispatch(userAdmin({ users: users.users }));

    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
}

export const Role = (token, id) => async (dispatch) => {
    try {
        const role = await getUserInformation(token, id)
        if(!role.success) return dispatch(onError({ error: role.msg }));
        dispatch(roleAdmin({ role: role.user }));

    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
}


export const deleteData = () => ( dispatch ) => {
    return dispatch(isAuth({ token: '', info: [] }))
}

export const { isAuth, userAdmin, roleAdmin } = user.actions;
export default user.reducer;