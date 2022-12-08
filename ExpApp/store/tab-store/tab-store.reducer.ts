import { TabData } from "../../models/tab/tab.type";
import { ADD_TAB, DELETE_TAB, MODIFY_TAB, SET_COMMENT, SET_COMMENT_RESPONSE, SET_RESPONSE_CONVERSATION, SET_TABS } from "./tab-store.action-types";
import { TabAction } from "../../models/tab/tab-action.type";
import { TabState } from "../../models/tab/tab-state.type";
import uuid from 'react-native-uuid';
import moment from 'moment';
import { TabComment } from "../../models/tab/tab-comments.type";
import { TabCommentPayload } from "../../models/tab/tab-comment-action-payload.type";
import { TabCommentResponsePayload } from "../../models/tab/tab-comment-response-action-payload.type";
import { TabCommentResponse } from "../../models/tab/tab-comments-response.type";

const INITIAL_STATE = {
    tabs: [] as TabData[],
} as TabState;
function tabReducer(state = INITIAL_STATE, action: TabAction<any>): TabState {
    switch (action.type) {
        case ADD_TAB:
            state.tabs.push({
                id: uuid.v4() as string, 
                head: action.payload.tab.head, 
                description: action.payload.tab.description, 
                time: moment().format(' dd:mm:yy '), 
                comments: [] as TabComment[]});
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
        case SET_COMMENT:
            return {
                ...state,
                tabs: findTabAndPushComment(state, action.payload),
            };
        case SET_COMMENT_RESPONSE:
            return {
                ...state,
                tabs: findCommentAndPushResponse(state, action.payload),
            };
        default:
            return state;
    }
};

export default tabReducer;

const findTabAndPushComment = (state: TabState, payload: TabCommentPayload): TabData[] => {
    state.tabs[state.tabs.findIndex( tab => tab.id === payload.tabId)].comments.push({
        id: uuid.v4() as string, 
        tabId: payload.tabId,
        commentHead: payload.head, 
        description: payload.description, 
        response: [],
        time: moment().format(' dd:mm:yy '),
    } as TabComment)
    return state.tabs;
}

const findCommentAndPushResponse = (state: TabState, payload: TabCommentResponsePayload): TabData[] => {
    const tabIndex = state.tabs.findIndex(tab => tab.id === payload.tabId);
    const commentIndex = state.tabs[tabIndex].comments.findIndex( comment => comment.id === payload.commentId);
    const comment = {
                    id: uuid.v4() as string, 
                    commentId: payload.commentId,
                    responseCommentHead: payload.head, 
                    description: payload.description, 
                    time: moment().format(' dd:mm:yy '),
                } as TabCommentResponse
    state.tabs[tabIndex].comments[commentIndex].response ? 
        state.tabs[tabIndex].comments[commentIndex].response.push(comment) :
        state.tabs[tabIndex].comments[commentIndex].response = [comment];
    return state.tabs;
}