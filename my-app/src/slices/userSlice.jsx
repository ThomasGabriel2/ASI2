import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
        name: 'AuthUser',
        initialState :{
            authUser: null,
        },
        reducers: {
            update_auth_user: (state, action) => {
                state.authUser = action.payload
            },
        }
    }
)

export const {update_auth_user} = userSlice.actions
export default userSlice.reducer