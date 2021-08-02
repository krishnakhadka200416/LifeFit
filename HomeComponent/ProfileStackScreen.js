import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text ,Button, Layout, Card } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'
//import ProfileScreen from './ProfileScreen'
import SyncScreen from './SyncScreen';
import {Auth} from 'aws-amplify'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "react-native-vector-icons/AntDesign";

const Profile = createStackNavigator();

const ProfileScreen = (props) => {
    const {navigation} = props; 
    const [userName, setUserName] = React.useState('')

    React.useEffect (() => {
        getUserName()
    }, [])

    const getUserName = async () =>{
        try {

            const usersName = await AsyncStorage.getItem('@username')
            
            setUserName(JSON.parse(usersName).username)
        }
        catch(e){
            setUserName('N/A')
        }
    }
    const signOut = async () =>{
        await AsyncStorage.setItem('@loginStatus', 'n')
        console.log('user is signed out')
    }
    
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.24 }}
        >
            <View style = {styles.container1}>
                <View style = {{marginLeft: 10, flexDirection: 'row', marginTop:8}}>
               
                    <Text style ={{marginLeft:7, color: "white"}} category ="h4" >
                         Profile
                    </Text>
                </View>
                <Button 
                appearance = "outline"
                status = "control"
                style = {{height:50}}
                onPress ={ ()=> {
                
                Auth.signOut()
                signOut()
                navigation.navigate('Login')
                }}>
                    Logout
                </Button>

            </View>
            <View style = {styles.container2}>
                <View style = {{alignItems: "center", marginBottom:20}}>
                    <View style = {{width:70, height: 70, backgroundColor:"red", alignItems:"center", justifyContent:"center", borderRadius:35}}>
                        <Text category = "h3" status ="control">{userName[0]}</Text>
                    </View>
                    <Text style = {{marginTop:10}}>{userName}</Text>
                    

                </View>

                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>User Info</Text>
                    <Text>Krishna Khadka</Text>
                    <Text>21, M</Text>
                    <Text>3100 E PArk Row Dr</Text>
                    <Text>Arlington, TX, 76010</Text>
                </Card>
                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>Sync with Fitbit</Text>
                    <View flexDirection="row">
                        <Text category = "p1">Status: </Text>
                        <Text category = "p1">  Not Synced </Text>
                    </View>
                    <View style = {{marginHorizontal: 90, marginTop: 20}}>
                        <Button 
                            appearance = "outline"
                            status = "danger" >
                            Sync Now
                        </Button>
                    </View>

                </Card>
                
               
            </View>
        </LinearGradient>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:20      

    },
    container1:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
        
     
    },
    container2:{
        flex:5,
        //alignItems: "center"
    },
    card: {
        margin: 10,
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