import * as React from 'react';
import {  View , StyleSheet, Alert, Image, TouchableOpacity, Linking, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text ,Button, Layout, Card } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient'
import CircularProgress from 'react-native-circular-progress-indicator';
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Auth, API} from 'aws-amplify'
import * as queries from '../graphql/queries'

const UserInfo = createStackNavigator();

const HealthScore = () => {
    const [userId, setUserId] = React.useState('')
    const [userHealthData, setUserHealthData] = React.useState('')
    const [score, setScore] = React.useState(0);

    
    const getUserId = async () =>{
        await Auth.currentUserInfo().then((data) =>{
            if(data){
                setUserId(data.attributes.sub)
                console.log(userId)
            }
        })
    }
    React.useEffect(()=>{
        getUserId()
    
        if(userId !== "") 
        {
            doQuerry(userId)
        }
    },[userId])

    async function doQuerry(userId)
    {
        const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: userId}});
        console.log(userDetails)
        if (userDetails.data.getUserDetails) {
             console.log(userDetails.data.getUserDetails.score);
             setScore(userDetails.data.getUserDetails.score)
        }       
        else
        {
            console.log("Error occured while querrying for score.")
        }
    }

    return (
        <ScrollView>

        
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
                            value={score}
                            radius={40}
                            maxValue={10}
                            initialValue={0}
                            activeStrokeColor = {score > 5 ? "green" : "red"}
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
                    <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                        <View style ={{width:70, margin:5, alignItems:"center"}}>
                        <TouchableOpacity>

                            <CircularProgress
                                value={1500}
                                radius={35}
                                maxValue={10000}
                                initialValue={0}
                                activeStrokeColor =  {1500 > 5000 ? "green" : "red"}
                                textColor={'black'}
                                duration={1000}
                                />
                                <View style= {{flexDirection:"row", marginTop:5}}>
                                <Foundation name="foot" color= "grey" size={20} />
                                <Text>  Steps</Text>

                                </View>
                        </TouchableOpacity>
                        </View>
                        <View style ={{width:70, margin:5, alignItems:"center"}}>
                        <TouchableOpacity>
                            <CircularProgress
                                value={3}
                                radius={35}
                                maxValue={5}
                                initialValue={0}
                                activeStrokeColor = {3 > 2.5 ? "green" : "red"}
                                textColor={'black'}
                                duration={1000}
                                />
                                

                                
                                <View style= {{flexDirection:"row", marginTop:5}}>
                                <FontAwesome name="map-marker" color= "grey" size={20} />
                                <Text>  Miles</Text>
                                </View>
                                </TouchableOpacity>
                        </View>
                        <View style ={{width:70, margin:5, alignItems:"center"}}>
                        <TouchableOpacity>
                            <CircularProgress
                                value={800}
                                radius={35}
                                maxValue={2000}
                                initialValue={0}
                                activeStrokeColor = {  800 > 1000 ? "green" : "red" }
                                                                     
                                    
                                    
                                textColor={'black'}
                                duration={1000}
                                />
                                <View style= {{flexDirection:"row", marginTop:5}}>
                                <FontAwesome5 name="fire" color= "grey" size={20} />
                                <Text>  Calories</Text>
                                </View>

                        </TouchableOpacity>
                        </View>
                    </View>

                    
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
            </ScrollView>
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