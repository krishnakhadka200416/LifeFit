import  React , {useState, useEffect } from 'react';
import {  View , StyleSheet, Alert, Image, TouchableOpacity, Linking, ScrollView, RefreshControl} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text ,Button, Layout, Card } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient'
import CircularProgress from 'react-native-circular-progress-indicator';
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth, API} from 'aws-amplify'
import { authorize } from 'react-native-app-auth';
import {config} from './config'
import * as queries from '../graphql/queries'
import {
    BarChart,
    LineChart,
   
  } from "react-native-chart-kit";

const UserInfo = createStackNavigator();



const HealthScore = () => {
    const [userId, setUserId] = React.useState('')
    const [refreshing, setRefreshing] = React.useState(false);
    const [userHealthData, setUserHealthData] = React.useState('')
    const [score, setScore] = React.useState(0);
    const [calories, setCalories] = React.useState(0);
    const [miles, setMiles] = React.useState(0);
    const [steps, setSteps] = React.useState(0);
    const [heart, setHeart] = React.useState(0);
    const [mActive, setMactive] = React.useState(0);
    const [sActive, setSactive] = React.useState(0);
    const [vActive, setVactive] = React.useState(0);
    const [heartrateTime, setHeartRateTime] = React.useState([]);
    const [heartrateValue, setHeartRateValue] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [totalheartrate, setTotalHeartRate] = React.useState(0);
    const [sleepHr, setSleepHr] = React.useState(0);
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    
    console.log(today);
  

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      
    const getUserId = async () =>{
        await Auth.currentUserInfo().then((data) =>{
            if(data){
                setUserId(data.attributes.sub)
                //console.log(userId)
            }
        })
    }
    React.useEffect(()=>{
        getUserId()

        getUserActivity()
    
        if(userId !== "") 
        {
            doQuerry(userId)
        }
    },[refreshing, userId])

    const getUserActivity = async () =>
    {
        try 
        {
            const userInfoFitBit = await AsyncStorage.getItem('@fitBitAuth')
            
            console.log(JSON.parse(userInfoFitBit).tokenAdditionalParameters.user_id)
            const ApiUrl = `https://api.fitbit.com/1/user/${JSON.parse(userInfoFitBit).tokenAdditionalParameters.user_id}/activities/date/2021-07-25.json`
            const heartUrl = `https://api.fitbit.com/1/user/${JSON.parse(userInfoFitBit).tokenAdditionalParameters.user_id}/activities/heart/date/2021-07-25/1d/1min/time/00:00/23:59.json`
            const sleepUrl = `https://api.fitbit.com/1.2/user/${JSON.parse(userInfoFitBit).tokenAdditionalParameters.user_id}/sleep/date/2021-07-25.json`
            try{

                const userHealthActivity = await fetch(ApiUrl, {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${JSON.parse(userInfoFitBit).accessToken}` ,
    
                    }
                }).then(res => res.json())
                .then(res => {
                   // console.log(res.summary.lightlyActiveMinutes)
                    setMiles(res.summary.distances[0].distance)
                    setCalories(res.summary.caloriesOut)
                    setSteps(res.summary.steps)
                    setMactive(res.summary.lightlyActiveMinutes)
                    setVactive(res.summary.veryActiveMinutes)
                    setSactive(res.summary.sedentaryMinutes)     
                    AsyncStorage.setItem('@userFitBitHealth', JSON.stringify(res))
                }).
                catch(err=> {
                    Alert.alert("Please sync with fitbit in the profile page")
                })
                //console.log(JSON.stringify(userHealthActivity))
            }
            catch(err)
            {
                console.log(err)
               
            }
            try{

                const userHeartActivity = await fetch(heartUrl, {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${JSON.parse(userInfoFitBit).accessToken}` ,
    
                    }
                }).then(res => res.json())
                .then(res => {
                    //console.log(res.["activities-heart-intraday"].dataset)
                    var timelist = [];
                    var heartratelist = [];
                    var list = res.["activities-heart-intraday"].dataset.length
                    var time = 0;
                    //console.log(list)
                    for (var i = 0; i< list; i= i + 115)
                    {
                        var counter =  res.["activities-heart-intraday"].dataset[i]
                        var time = time + 2
                        var hrate = counter.value
                        timelist.push(time)
                        heartratelist.push(hrate)

                    }
                    //console.log(timelist)
                    setHeartRateTime(timelist)
                    //console.log(heartratelist )
                    setHeartRateValue(heartratelist)


                  
                    setHeart(res.["activities-heart"][0].value)

                    
                    //AsyncStorage.setItem('@userFitBitHealth', JSON.stringify(res))
                }).
                catch(err=> {
                   console.log(err)
                })
                //console.log(JSON.stringify(userHealthActivity))
            }
            catch(err)
            {
                console.log(err)
               
            }

            try{
                const userSleepActivity = await fetch(sleepUrl, {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${JSON.parse(userInfoFitBit).accessToken}` ,
    
                    }
                }).then(res => res.json())
                .then(res => {
                    console.log(res.sleep[0].levels.data[0].level)
                    var sleepData = res.sleep[0].levels.data
                    var light = 0
                    var deep = 0
                    var rem = 0
                    var awake = 0

                    for (var i = 0; i< sleepData.length; i++)
                    {
                        var counter =  res.["activities-heart-intraday"].dataset[i]
                        var time = time + 2
                        var hrate = counter.value
                        timelist.push(time)
                        heartratelist.push(hrate)

                    }

                    setSleepHr(res.summary.totalMinutesAsleep)
                   
                }).
                catch(err=> {
                    Alert.alert("Please sync with fitbit in the profile page")
                })

            }
            catch(err)
            {
                console.log(err)
            }
            
         }
        catch (err)
        { 
            Alert.alert("Please sync with fitbit in the profile page")
            console.log("Couldn't fetch fitbit API")
        }
    }

    async function doQuerry(userId)
    {
        const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: userId}});
       // console.log(userDetails)
        if (userDetails.data.getUserDetails) {
            // console.log(userDetails.data.getUserDetails.score);
             setScore(userDetails.data.getUserDetails.score)
             
        }       
        else
        {
            console.log("Error occured while querrying for score.")
        }
    }

  
    return (
        <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>

        
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.12 }}
        >
            <View style = {styles.container1}>
               

                
                <View style = {{marginLeft: 10, flexDirection: 'row', marginTop:8,   justifyContent: 'space-between'}}>
               
                    <Text style ={{color: "white"}} category ="h4" >
                         User Health
                    </Text>
                    <Button 
                    appearance = "outline"
                    status = "control"
                    style = {{height:50}}
                    onPress = { () => {
                        setRefreshing(true);
                        wait(1500).then(() => setRefreshing(false));
                    } }
                    >
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
                                value={steps}
                                radius={35}
                                maxValue={10000}
                                initialValue={0}
                                activeStrokeColor =  {steps > 5000 ? "green" : "red"}
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
                                value={((miles/1.6)-miles)>0.5 ? math.ceil(miles/1.6) : (miles/1.6)}
                                radius={35}
                                maxValue={5}
                                initialValue={0}
                                activeStrokeColor = {miles > 2.5 ? "green" : "red"}
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
                                value={calories}
                                radius={35}
                                maxValue={3000}
                                initialValue={0}
                                activeStrokeColor = {  calories > 1500 ? "green" : "red" }
                                                                     
                                    
                                    
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
                    <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                    <Text category = "h6" style ={{marginBottom: 8}}>Heart </Text>          
                    <Text category = "h6" style ={{marginBottom: 8, color: "red"}}>{Math.floor(heart)} bpm</Text>          
                        
                    </View>
                    <LineChart
                    data={{
                    labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
                    datasets: [
                        {
                        data:heartrateValue,
                        }
                    ]
                    }}
                    width={335} // from react-native
                    height={230}
                    
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "red",
                    backgroundGradientFrom: "red",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  
                    }}
                    bezier
                    style={{
                    marginVertical: 6,
                    borderRadius: 10
                    }}
                />

                </Card>
                <Card style={styles.card} status='danger'>
                <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                    <Text category = "h6" style ={{marginBottom: 8}}>Sleep </Text>          
                    <Text category = "h6" style ={{marginBottom: 8, color: "red"}}>
                    {Math.floor(sleepHr/60)} hr { Math.floor(((sleepHr/60)- Math.floor(sleepHr/60)) * 60)} min
                   </Text>          
                        
                </View>

                </Card>
                
                <Card style={styles.card} status='danger'>
                <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                    <Text category = "h6" style ={{marginBottom: 8}}>Active</Text>          
                    <Text category = "h6" style ={{marginBottom: 8, color: "red"}}>
                    {Math.floor((sActive+mActive+vActive)/60)} hr { Math.floor((((sActive+mActive+vActive)/60)- Math.floor((sActive+mActive+vActive)/60)) * 60)} min
                   </Text>          
                        
                </View>         
                    <BarChart
                        data = {{
                            labels: ["Inactive", "Moderate", "Active"],
                            datasets: [
                                {
                                   data:[(sActive/60).toFixed(1), (mActive/60).toFixed(1), (vActive/60).toFixed(1)]
                                }
                                ]
                        }}
                        width = {335}
                        showValuesOnTopOfBars
                        height = {230}
                        chartConfig={{
                            backgroundColor: "red",
                            backgroundGradientFrom: "red",
                            backgroundGradientFromOpacity:1,
                            fillShadowGradientOpacity:1,
                            fillShadowGradient:"white",
                            
                            backgroundGradientTo: "#ffa726",  
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        showBarTops
                        bezier
                    style={{
                    marginVertical: 6,
                    borderRadius: 10
                    }}
                        
                    />         
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