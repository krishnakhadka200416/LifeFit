/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const App = () => {
  return (
    <View style = {styles.container} >
       
    </View>
  )
}

const styles = StyleSheet.create ( {
  container: {
    flex:1

  },
  container1:{
    flex:1,
    backgroundColor:"red"
  },
  container2:{
    flex:2,
    backgroundColor:"green"
  },
  text : {
    color : "green",
  
  }
})
export default App;
