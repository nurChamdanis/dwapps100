import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Alert, AppState, Text, Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { checkMultiple, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import SignInScreen from './screen/Signin/SigninScreen';
import SignUpScreen from './screen/Signup/SignupScreen';

const log = require('./assets/images/logo.png');

interface UserData {
  name: string;
  [key: string]: any;
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const permissions =
        Platform.OS === 'android'
          ? [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]
          : [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.MEDIA_LIBRARY];

      const statuses = await checkMultiple(permissions);

      const allPermissionsGranted = Object.values(statuses).every(
        status => status === RESULTS.GRANTED
      );

      if (!allPermissionsGranted) {
        const requestResults = await requestMultiple(permissions);
        const allRequestedGranted = Object.values(requestResults).every(
          status => status === RESULTS.GRANTED
        );

        if (!allRequestedGranted) {
          Alert.alert('Permission Denied', 'Storage permissions are required to proceed.');
          AppState.currentState = 'inactive';
          return false;
        }
      }
      return true;
    };

    const initializeFirebase = async () => {
      try {
        if (!firebase.apps.length) {
          await firebase.initializeApp({
            apiKey: "AIzaSyCHrH99trKSrufs-HoKFXyZ2MHre1k97SU",
            authDomain: "sekolahku-9e4b7.firebaseapp.com",
            projectId: "sekolahku-9e4b7",
            storageBucket: "sekolahku-9e4b7.appspot.com",
            messagingSenderId: "469371191227",
            appId: "1:469371191227:web:af37309023b984b3264e9e",
            measurementId: "G-SPFXJ48KH9"
          });
        }
        setIsFirebaseConnected(true);
        console.log("Firebase initialized successfully");
      } catch (error) {
        console.error("Firebase initialization failed", error);
        setIsFirebaseConnected(false);
      }
    };

    const checkUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          setIsUserSignedIn(true);
          const userRef = database().ref(`/users/${user.uid}`);
          const snapshot = await userRef.once('value');
          setUserData(snapshot.val() as UserData);
          console.log("User data retrieved successfully");
        } else {
          setIsUserSignedIn(false);
          setUserData(null);
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error retrieving user data", error);
      }
    };

    const handleAppStart = async () => {
      const permissionsGranted = await checkPermissions();
      if (!permissionsGranted) {
        return;
      }

      await initializeFirebase();
      if (isFirebaseConnected) {
        await checkUserData();
        if (!isUserSignedIn) {
          navigation.navigate('SignIn'); // Navigate to SignIn screen if user is not signed in
        }
      } else {
        Alert.alert("Firebase Error", "Failed to connect to Firebase.", [
          { text: "OK", onPress: () => AppState.currentState = 'inactive' }
        ]);
      }
    };

    handleAppStart();
  }, [isFirebaseConnected]);

  return (
    <View style={styles.container}>
      {isUserSignedIn ? (
        <Text>Welcome {userData?.name}</Text>
      ) : (
        <Image source={log} style={styles.logo} />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default App;
