import { combineReducers } from "redux";
import tabReducer from "./tab-store/tab-store.reducer";

const rootReducer = combineReducers({
    tabReducer,
});

export default rootReducer;
