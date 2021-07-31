import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Input ,Button, Layout } from '@ui-kitten/components';

const SignUp = () =>{
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [streetAddress, setStreetAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [gender, setGender] = React.useState('');
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <Text style = {{color:"white", fontSize: 20, fontWeight:"bold"}}>REGISTER</Text>
        <Input
         placeholder='Username'
         value={userName}
         style = {styles.inputBox}
         onChangeText={nextValue => setUsername(nextValue)}
        />
        <Input
         placeholder='Password'
         value={password}
         style = {styles.inputBox}
         secureTextEntry
         onChangeText={nextValue => setPassword(nextValue)}
        />
         <Input
         placeholder='First Name'
         value={firstName}
         style = {styles.inputBox}
         onChangeText={nextValue => setFirstName(nextValue)}
        />
        <Input
         placeholder='Last Name'
         value={lastName}
         style = {styles.inputBox}
         onChangeText={nextValue => setLastName(nextValue)}
        />
        <Input
         placeholder='Phone Number'
         value={phoneNumber}
         style = {styles.inputBox}
         onChangeText={nextValue => setPhoneNumber(nextValue)}
        />
        <Input
         placeholder='Email'
         value={email}
         style = {styles.inputBox}
         onChangeText={nextValue => setEmail(nextValue)}
        />

        <Input
         placeholder='Street Address'
         value={streetAddress}
         style = {styles.inputBox}
         onChangeText={nextValue => setStreetAddress(nextValue)}
        />
        <Input
         placeholder='City'
         value={city}
         style = {styles.inputBox}
         onChangeText={nextValue => setCity(nextValue)}
        />
        <Input
         placeholder='State'
         value={state}
         style = {styles.inputBox}
         onChangeText={nextValue => setState(nextValue)}
        />
        <Input
         placeholder='ZipCode'
         value={zipCode}
         style = {styles.inputBox}
         onChangeText={nextValue => setZipCode(nextValue)}
        />
         <Input
         placeholder='Gender'
         value={gender}
         style = {styles.inputBox}
         onChangeText={nextValue => setGender(nextValue)}
        />
       
        <Button style = {{marginTop: 30 , width:120, height : 45}} appearance = "outline" status = 'danger' size= 'medium' >SUBMIT</Button>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:10      
    },

})


export default SignUp