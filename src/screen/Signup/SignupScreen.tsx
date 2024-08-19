import React, { useState } from "react";
import { useWindowDimensions, View, StyleSheet, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';
import CustomInput from "../../components/CustomInput";
import { UserCircle } from 'phosphor-react-native';

const SignUpScreen = ({ navigation }: any) => {
    const { width: windowWidth } = useWindowDimensions();

    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addUser = async () => {
        try {
            await firestore().collection('users').add({
                email: email,
                password: password,
                createdAt: firestore.FieldValue.serverTimestamp(), // Use firestore.FieldValue
            });
            console.log('User added!');
            // Optionally navigate to another screen or reset the form
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <UserCircle size={32} />
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
            <Button title="Add User" onPress={addUser} />
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
        alignSelf: 'center'
    },
    btnGroup: {
        height: 100,
        padding: 10,
        justifyContent: "space-between"
    }
});

export default SignUpScreen;
