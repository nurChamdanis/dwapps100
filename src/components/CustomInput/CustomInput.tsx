import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry = false }: any) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#888" // Optional: custom placeholder color
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: { 
        width: '100%',
        marginVertical: 10,
        paddingTop: 0
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderStartEndRadius: 20, 
        borderStartStartRadius: 20, 
    },
});

export default CustomInput;
