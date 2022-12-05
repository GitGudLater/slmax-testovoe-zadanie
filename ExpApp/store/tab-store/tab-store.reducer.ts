import { TabData } from "../../models/tab/tab.type";
import { ADD_TAB, DELETE_TAB, MODIFY_TAB, SET_TABS } from "./tab-store.action-types";
import { TabAction } from "../../models/tab/tab-action.type";
import { TabState } from "../../models/tab/tab-state.type";
import uuid from 'react-native-uuid';
import moment from 'moment';

const INITIAL_STATE = {
    tabs: [] as TabData[],
} as TabState;
function tabReducer(state = INITIAL_STATE, action: TabAction<any>): TabState {
    switch (action.type) {
        case ADD_TAB:
            state.tabs.push({id: uuid.v4() as string, head: action.payload.tab.head, description: action.payload.tab.description, time: moment().format(' dd:mm:yy ')});
            return {
                ...state,
                tabs: state.tabs,
            };
        case DELETE_TAB:
            return {
                ...state,
                tabs: state.tabs.length != 1 ? state.tabs.splice(state.tabs.findIndex(tab => tab.id === action.payload)) : [] as TabData[] ,
            };
        case MODIFY_TAB:
            return {
                ...state,
                tabs: state.tabs.splice(state.tabs.findIndex(tab => tab.id === action.payload.id),1, action.payload),
            };
        case SET_TABS:
            return {
                ...state,
                tabs: action.payload,
            };
        default:
            return state;
    }
};

export default tabReducer;