import React from "react";
import { View } from "react-native";
import { TabCommentResponse } from "../../models/tab/tab-comments-response.type";
import { TabCommentResponseListElement } from "./TabCommentResponseListElement";

export const TabCommentResponseList: React.FC<TabCommentResponse[]> = (props) => {
    return (
        <View>
            {props.map && props.map((comment) =>    
                <TabCommentResponseListElement key={comment.id} {...comment} ></TabCommentResponseListElement>
            )}
        </View>
    );
}