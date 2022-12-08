import { TabCommentResponse } from "./tab-comments-response.type";

export interface TabCommentPayload {
    tabId: string;
    head: string;
    description: string;
}