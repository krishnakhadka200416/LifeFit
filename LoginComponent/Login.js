import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Input ,Button, Layout } from '@ui-kitten/components';
import {Auth} from 'aws-amplify';

const Login = ({navigation}) => {
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    async function signIn() {
        try {
            const user = await Auth.signIn(userName, password);
            console.log(user)
            navigation.navigate('Home')
        } catch (error) {
            Alert.alert(error.message)
            console.log('error signing in', error);
        }
    }
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <Image resizeMode= "contain" style = {{ width:120, height: 120} } source = {require ('../assets/state_farm_logo.png')}></Image>
        <Text style = {{color: "white", fontSize:25, fontWeight: "bold", marginBottom: 50}}> STATE FARM FIT </Text>
         <Input
         placeholder='Username'
         value={userName}
         style = {styles.inputBox}
         onChangeText={nextValue => setUsername(nextValue)}
        />
        <Input
         placeholder='Password'
         
         value={password}
         secureTextEntry 
         style = {styles.inputBox}
         onChangeText={nextValue => setPassword(nextValue)}
        />
        
        <Button onPress = {signIn} style = {{marginTop: 30 , width:120, height : 45}} appearance = "outline" status = 'danger' size= 'medium' >
                LOGIN
        </Button>
        <View style = {{flexDirection: "row", marginTop:20}}> 
            <Text style = {styles.text}>Don't have an account?</Text>
            <TouchableOpacity onPress = {() => navigation.navigate('SignUp')}>
                <Text  style = {styles.text1}>  Sign Up</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
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
    text : {
        color:"white"
    },
    text1 : {
        color:"red",
    }
  })

export default Login;