import { TabCommentResponse } from "./tab-comments-response.type";

export interface TabComment {
    id: string;
    tabId: string;
    commentHead: string;
    description: string;
    response: TabCommentResponse[];
    time: string;
}