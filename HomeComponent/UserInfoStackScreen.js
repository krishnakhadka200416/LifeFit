import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const UserInfo = createStackNavigator();

const HealthScore = () => {
    return (
        <View>
            <Text>
                Health Score
            </Text>
        </View>
    )
}

const Sleep = () => {
    return (
        <View>
            <Text>
                Sleep Screen
            </Text>
        </View>
    )
}


const  ProfileStackScreen = () => {

    

        return (
            <UserInfo.Navigator>
              <UserInfo.Screen name="Profile" component={HealthScore} options = {{headerShown: false}} />
              <UserInfo.Screen name="Sleep" component={Sleep} options = {{headerShown: false}} />
            </UserInfo.Navigator>
          );
  
  
  }
  export default ProfileStackScreen