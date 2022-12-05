import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteTab } from "../../store/tab-store/tab-store.actions";
import { Tab } from "./Tab.component";

export const TabList = (props: any) => {
    const tabs = useSelector((state: RootState) => state.tabReducer);
    return (
      <View style={styles.list}>
            {tabs.tabs.map((mappedTab) =>    
                <Tab key={mappedTab.id} {...mappedTab} ></Tab>
            )}
      </View>
    );
}

const styles = StyleSheet.create({
    list: {
      flex: 9,
      padding: 2,
      margin: 5,
      alignItems:"center",
      overflow: "scroll",
      flexShrink: 1,
    },
  });
  