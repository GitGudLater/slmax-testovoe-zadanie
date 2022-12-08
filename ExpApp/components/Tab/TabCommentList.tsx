import React from "react";
import { View } from "react-native";
import { TabComment } from "../../models/tab/tab-comments.type";
import { TabCommentElement } from "./TabCommentEment";

export const TabCommentList: React.FC<TabComment[]> = (props) => {
    return (
        <View>
            {props.map && props.map((comment) =>    
                <TabCommentElement key={comment.id} {...comment} ></TabCommentElement>
            )}
        </View>
    );
}