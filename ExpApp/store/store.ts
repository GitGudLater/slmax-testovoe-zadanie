import { createStore } from "redux";
import rootReducer from "./reducer";

export const Store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;