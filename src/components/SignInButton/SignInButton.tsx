import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type SignInButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
};

const SignInButton: React.FC<SignInButtonProps> = ({ onPress, title }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: 200,
        backgroundColor: '#1E90FF', // Customize background color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Customize text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignInButton;
