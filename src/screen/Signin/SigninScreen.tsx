import React, { useState } from "react";
import { Image, View, StyleSheet, Alert, Button, useWindowDimensions } from 'react-native';
import { FirebaseError } from 'firebase/app';
import firebase from '@react-native-firebase/app';
import CustomInput from "../../components/CustomInput";

const log = require('../../assets/images/logo.png');

const SignInScreen = ({ navigation }: any) => {
    const { width: windowWidth } = useWindowDimensions();

    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.replace('Home'); // Navigate to the Home screen after signing in
        } catch (error: any) {
            let errorMessage = 'An unknown error occurred';

            if (error instanceof FirebaseError) {
                errorMessage = error.message; // Extract the error message
            } else if (error && error.message) {
                errorMessage = error.message;
            } 

            Alert.alert('Sign-In Error', errorMessage);
            navigation.replace('SignUp'); // Navigate to the SignUp screen on error
        }
    };

    const handleSignUp = () => {
        navigation.replace('SignUp');
    };

    return (
        <View style={styles.container}>
            <Image source={log} style={styles.logo} />
            <View style={[styles.form, { width: windowWidth - 40 }]}>
                <CustomInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} // To hide the password input
                />
            </View>
            <View style={styles.btnGroup}>
                <Button title="Sign In" onPress={handleSignIn} />
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    form: {
        marginTop: 40,
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 100,
        alignSelf: 'center',
    },
    btnGroup: {
        height: 100,
        padding: 10,
        justifyContent: "space-between",
    },
});

export default SignInScreen;
