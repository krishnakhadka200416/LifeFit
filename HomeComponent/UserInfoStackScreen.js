import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const UserInfo = createStackNavigator();

const ProfileScreen = () => {
    return (
        <View>
            <Text>
                Profile Screen
            </Text>
        </View>
    )
}

const SyncScreen = () => {
    return (
        <View>
            <Text>
                Profile Screen
            </Text>
        </View>
    )
}


const  ProfileStackScreen = () => {

    

        return (
            <UserInfo.Navigator>
              <UserInfo.Screen name="Profile" component={ProfileScreen} options = {{headerShown: false}} />
              <UserInfo.Screen name="FitbitSync" component={SyncScreen} options = {{headerShown: false}} />
            </UserInfo.Navigator>
          );
  
  
  }
  export default ProfileStackScreen