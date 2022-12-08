import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { TabCommentPayload } from "../../models/tab/tab-comment-action-payload.type";
import { TabData } from "../../models/tab/tab.type";
import { deleteTab, setComment } from "../../store/tab-store/tab-store.actions";
import { TabCommentList } from "./TabCommentList";

export const Tab: React.FC<TabData> = (props) => {
    const dispatch = useDispatch();

    const [isModalVisible, showModal] = useState<boolean>(false);
    const [responseHead, setResponseHead] = useState<string>('');
    const [responseDescription, setResponseDescription] = useState<string>('');

    const [isDetailed, changeIsDetailedStatus] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(5);
    const [startedTimerState, changeSTState] = useState<boolean>(false);

    const createResponse = () => {
      showModal(false);
      dispatch(setComment({
        tabId: props.id,
        head: responseHead,
        description: responseDescription,
      } as TabCommentPayload));
    };

    const timerVisualization = () => {
      changeSTState(true);
      const interval = setInterval(() => {
        setTimer(timer => {
          if(timer > 0) {
            return timer-1;
          }
          else {
            clearInterval(interval);
            dispatch(deleteTab(props.id));
            return timer;
          }
        });
      },1000);
    };

    const viewDetailedTab = () => {
      isDetailed ? changeIsDetailedStatus(false) : changeIsDetailedStatus(true);
    };

    return (
      <View style={[styles.tabContainer, styles.tab]}>
        
        <Pressable style={styles.pressableArea} onPress={() => viewDetailedTab()} onLongPress={() => dispatch(deleteTab(props.id))}>
            <Text style={styles.textElement}>
              {props.head}
            </Text>
            <Text style={styles.textElement}>
              {props.description.slice(0,20)+"..."}
            </Text>
            <View>
              {startedTimerState ? <Text onPress={() => changeSTState(false)} style={styles.timer}>{timer + " X"}</Text> : 
                                  <Text onPress={() => timerVisualization()} style={styles.delete}>{'X'}</Text>}
            </View>
        </Pressable>
        <View>
            { isDetailed && 
              <View>
                <View>
                  <Text style={styles.detailed}>{props.description}</Text>
                  <Pressable onPress={() => showModal(true)}>
                    <Text>Ответить</Text>
                  </Pressable>
                </View>
                <View>
                  <TabCommentList {...props.comments}></TabCommentList>
                </View>
              </View>
            }
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
      </View>
    );
}

const styles = StyleSheet.create({
  tab: {
    /*flex: 1,
    width: '100%',
    padding: '2%',
    margin: '5%',
    flexDirection: "column",
    borderColor: "black",
    borderRadius: 3,
    flexShrink: 0,
    flexWrap: "nowrap",
    gap: 10,*/
  },
  tabContainer: {
   /* padding: '2%',
    margin: '5%',
    borderWidth: 1,
    width: '100%',
    maxHeight: 50,
    minHeight: 50,*/
  },
  pressed: {
    //backgroundColor: pressed ? 'rgb(210,230,255)' : '#fff',
  },
  pressableArea: {
    /*flexDirection: "column",
    justifyContent: "flex-start",
    width: '100%',
    flexWrap: 'wrap',*/
  },
  textElement: {
    //marginLeft: 10, 
  },
  timer: {/*alignSelf: 'flex-end', fontWeight: "bold", color: "red", width: 20*/},
  delete: {/*alignSelf: 'flex-end', width: 20*/},
  detailed: {/*paddingTop: 10, paddingBottom: 10*/},
});
