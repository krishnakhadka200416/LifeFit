import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../LoginComponent/Login'
import SignUp from '../LoginComponent/SignUp'
const Stack = createStackNavigator();
const Home = () =>{
    return (
        <View>
            <Text>
                Home
            </Text>
        </View>
    )
}

const NavContainer = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options = {{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUp} options = {{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;