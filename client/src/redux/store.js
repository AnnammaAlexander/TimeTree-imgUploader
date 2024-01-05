import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slice';
import adminSlice from './adminSlice'
import projectslice from "./projectslice";
const store = configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        project:projectslice
    }
})
export default store