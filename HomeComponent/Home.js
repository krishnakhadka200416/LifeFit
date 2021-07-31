import React from 'react';
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import UserInfoStackScreen from './UserInfoStackScreen'
import ProfileStackScreen from './ProfileStackScreen'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const Home = (props) => {

    return (
         <Tab.Navigator 
         tabBarOptions={{
             activeTintColor: "white",
             inactiveTintColor: "black",
              style: {
                 backgroundColor: 'red',
                 paddingBottom: 7,
           }
         }}>
            <Tab.Screen name="Home" component={UserInfoStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen}  />
        </Tab.Navigator>
        
   
    )
}
export default Home;