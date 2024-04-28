import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducers from "./reducer";
import { userService } from "../services/userService/userService";

const rootReduser = combineReducers(reducers)

export const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userService.middleware,
    )
})