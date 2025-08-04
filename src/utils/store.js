import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import taskReducer from './taskSlice'

const appStore = configureStore({
    reducer : {
        users: userReducer,
        tasks: taskReducer
    }
})

export default appStore;