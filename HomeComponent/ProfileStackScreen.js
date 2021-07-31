import * as React from 'react';
import {Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Input ,Button, Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

const Profile = createStackNavigator();

const ProfileScreen = (props) => {
    const {navigation} = props; 
    return (
        <View>
            <Text>
                Profile Screen
            </Text>
            <Button onPress ={()=> {
                navigation.navigate('Login')
            }}>
                Logout
            </Button>
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


const  ProfileStackScreen = ( props ) => {

    

        return (
            <Profile.Navigator>
              <Profile.Screen name="Profile" component={ProfileScreen} options = {{headerShown: false}} />
              <Profile.Screen name="FitbitSync" component={SyncScreen} options = {{headerShown: false}} />
            </Profile.Navigator>
          );
  
  
  }
  export default ProfileStackScreen