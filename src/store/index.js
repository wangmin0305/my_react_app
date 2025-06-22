import { configureStore } from "@reduxjs/toolkit"
import TabReducers from "./reducers/tab"

export default configureStore({
    reducer: {
        tab: TabReducers
    }
})