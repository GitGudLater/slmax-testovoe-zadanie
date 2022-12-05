import { TabProps } from "../../models/tab/tab-props.type";
import { TabData } from "../../models/tab/tab.type";
import { ADD_TAB, DELETE_TAB, MODIFY_TAB, SET_TABS } from "./tab-store.action-types";

export const addTab = (tab: TabProps) => {
    return {
        type: ADD_TAB,
        payload: tab,
    }
};

export const deleteTab = (id: string) => {
    return {
        type: DELETE_TAB,
        payload: id,
    }
};

export const modifyTab = (tab: TabData) => {
    return {
        type: MODIFY_TAB,
        payload: tab,
    }
};

export const setTabs = (tabs: TabData[]) => {
    return {
        type: SET_TABS,
        payload: tabs,
    }
};