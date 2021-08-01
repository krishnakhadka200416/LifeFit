import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text ,Button, Layout } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
//import ProfileScreen from './ProfileScreen'
import SyncScreen from './SyncScreen';
import {Auth} from 'aws-amplify'

const Profile = createStackNavigator();

const ProfileScreen = (props) => {
    const {navigation} = props; 
    const [userName, setUserName] = React.useState()
    
    return (
        <View style = {styles.container}>

            <Text category ="h4">
                Hello , {userName}
            </Text>
            <Button onPress ={ ()=> {
              
               Auth.signOut()
               navigation.navigate('Login')
             }}>
                Logout
            </Button>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:20      

    },
   
  })

const  ProfileStackScreen = ( props ) => {

    

        return (
            <Profile.Navigator>
              <Profile.Screen name="Profile" component={ProfileScreen} options = {{headerShown: false}} />
              <Profile.Screen name="SyncScreen" component={SyncScreen} options = {{headerShown: false}} />
            </Profile.Navigator>
          );
  
  
  }
  export default ProfileStackScreen