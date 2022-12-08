import React, { useState } from "react";
import { View, Text, Pressable, Modal, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { TabCommentResponsePayload } from "../../models/tab/tab-comment-response-action-payload.type";
import { TabComment } from "../../models/tab/tab-comments.type";
import { setCommentResponse } from "../../store/tab-store/tab-store.actions";
import { TabCommentResponseList } from "./TabCommentResponseList";

export const TabCommentElement: React.FC<TabComment> = (props) => {
    const dispatch = useDispatch();

    const [isModalVisible, showModal] = useState<boolean>(false);
    const [responseHead, setResponseHead] = useState<string>('');
    const [responseDescription, setResponseDescription] = useState<string>('');

    const createResponse = () => {
        showModal(false);
        dispatch(setCommentResponse({
            tabId: props.tabId,
            commentId: props.id,
            head: responseHead,
            description: responseDescription,
        } as TabCommentResponsePayload));
        //creating comment response;
    };
    
    return (
        <View>
            <View>
                <Text>{props.commentHead}</Text>
                <Text>{props.description}</Text>
                <Text>{props.time}</Text>
                <Pressable onPress={() => showModal(true)}>
                    <Text>Ответить</Text>
                </Pressable>
            </View>
            <View>
                <TabCommentResponseList {...props.response}></TabCommentResponseList>
            </View>
            <View>
                <Modal animationType="slide" visible={isModalVisible} onRequestClose={() => showModal(false)}>
                    <TextInput placeholder="" onChangeText={setResponseHead} value={responseHead}></TextInput>
                    <TextInput placeholder="" onChangeText={setResponseDescription} value={responseDescription}></TextInput>
                    <Pressable onPress={() => createResponse()}>
                        <Text>{'>'}</Text>
                    </Pressable>
                </Modal>
            </View>
        </View>
    );
}