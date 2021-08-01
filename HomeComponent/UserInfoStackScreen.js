import * as React from 'react';
import {  View , StyleSheet, Alert, Image, TouchableOpacity, Linking} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text ,Button, Layout, Card } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient'
import CircularProgress from 'react-native-circular-progress-indicator';

const UserInfo = createStackNavigator();

const HealthScore = () => {
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.20 }}
        >
            <View style = {styles.container1}>
                <View style = {{marginLeft: 10, flexDirection: 'row', marginTop:8,   justifyContent: 'space-between'}}>
               
                    <Text style ={{color: "white"}} category ="h4" >
                         User Health
                    </Text>
                    <Button 
                    appearance = "outline"
                    status = "control"
                    style = {{height:50}}>
                        Sync
                    </Button>
                </View>
                <View style = {{marginTop:20, marginLeft:20,flexDirection: "row", justifyContent:"space-between" }}>
                    <View style ={{width:80, margin:5, alignItems:"center"}}>
                        <CircularProgress
                            value={7}
                            radius={40}
                            maxValue={10}
                            initialValue={0}
                            activeStrokeColor = {"red"}
                            textColor={'black'}
                          
                            duration={1000}
                            />
                        <Text>Good !</Text>
                    </View>
                    <View style = {{alignItems:"center", marginTop:-10}}>
                        <TouchableOpacity onPress ={() => {
                            Linking.openURL("https://www.statefarm.com/")
                        }}>
                            <Image style= {{width:300, height:120}} resizeMode= "contain"   source = {require ('../assets/State-Farm-Logo.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
            <View style = {styles.container2}>
                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>Today</Text>
                    <Text>Today</Text>
                    
                </Card>
                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>Heart Rate</Text>          

                </Card>
                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}> Sleep </Text>          

                </Card>

                <Card style={styles.card} status='danger' onPress = {()=> {Alert.alert("Pressed")}}>
                    <Text category = "h6" style ={{marginBottom: 8}}>Active</Text>          

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
      
        padding:10,
        
     
    },
    container2:{
        flex:2.5,
        //alignItems: "center"
    },
    card: {
        margin: 10,
      },
   
  })


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