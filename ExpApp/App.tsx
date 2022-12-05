import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CreateTab } from './components/Tab/CreateTab.component';
import { Provider } from 'react-redux';
import { Store } from './store/store';
import { TabList } from './components/Tab/TabList.component';

function App(props: any) {
  return (
    <View style={styles.container}>
      <Provider store={Store}>  
        <TabList></TabList>
        <CreateTab></CreateTab>
        <StatusBar style="auto" />
      </Provider>
    </View>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
