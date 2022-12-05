import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { TabProps } from "../../models/tab/tab-props.type";
import { TabData } from "../../models/tab/tab.type";
import { addTab } from "../../store/tab-store/tab-store.actions";
import uuid from 'react-native-uuid';

export const CreateTab = (props: any) => {
    const dispatch = useDispatch();
    const [head, changeHead] = useState<string>('');
    const [description, changeDescription] = useState<string>('');
    return (
      <View style={styles.createTab}>
        <TextInput maxLength={10} placeholder='Название' onChangeText={changeHead} value={head}></TextInput>
        <TextInput style={styles.detailInput} placeholder='Текст описание' onChangeText={changeDescription} value={description}></TextInput>
        <Text style={styles.button} onPress={() =>  dispatch(addTab({tab:{head: head, description: description}} as TabProps))}>{'>'}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  createTab: {

    flex: 2,
    width: '80%',
    padding: '2%',
    margin: '10%',
    marginBottom: '20%',
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    flexWrap: "nowrap",
    paddingBottom: '5%',
  },
  detailInput: {
    width: '80%',
    marginBottom: 6,
  },
  button: {
    position: 'relative',
    bottom: 30,
    fontSize: 20,
    width: 15,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  }
});
