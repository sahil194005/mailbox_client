
import { createSlice } from '@reduxjs/toolkit'
let intiState;
if (localStorage.getItem('isLogin')) {

    intiState = {
        isAuth: localStorage.getItem('isLogin'),
        receivedMails: []
    }
}
else {
    intiState = {
        isAuth: false,
        receivedMails: []
    }
}
const globalSlice = createSlice({
    name: 'global',
    initialState: intiState,
    reducers: {
        toggleAuth(state) {
            return { ...state, isAuth: !state.isAuth }

        },
        InboxFill(state, action) {

            return { ...state, receivedMails: action.payload };


        }
    }

})

export const globalActions = globalSlice.actions;
export default globalSlice;
