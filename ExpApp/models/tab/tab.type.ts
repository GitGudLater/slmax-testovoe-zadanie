import { TabComment } from "./tab-comments.type";

export interface TabData {
    id: string;
    head: string;
    description: string;
    time: string;
    comments: TabComment[];
}