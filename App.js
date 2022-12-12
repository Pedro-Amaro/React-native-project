import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from '@react-native-material/core';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {useState, useEffect } from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

import {getData } from "./utils/storage"
import { authLogout } from './utils/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyC2sV1wt0htouX3oE1OlD00AAM1O_N9HYs",
  authDomain: "pomodoro-d6ced.firebaseapp.com",
  projectId: "pomodoro-d6ced",
  storageBucket: "pomodoro-d6ced.appspot.com",
  messagingSenderId: "141160920193",
  appId: "1:141160920193:web:d9968b714663d11e1a8980",
  measurementId: "G-9JDM2X8KYQ"
};

const firebaseApp = initializeApp(firebaseConfig)
//const analytics = getAnalytics(firebaseapp);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const verifyLogin = async () => {
    const user =  await getData("user"); 
        if(user !== null){
          setIsLoggedIn(true)
        }
  }

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={( {route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let icon = ""

              switch (route.name) {
                case "Home":
                  icon= "home";
                  break

                case "Profile":
                  icon= "account";
                  break;
              }
              return <Icon name={icon} size={size} color={color}/>;
            },
             // tabBarActiveTintColor: 'orange',
              tabBarInactiveTintColor:'green'
          })} 
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title:"Meu Pomodoro",
              headerRight: () => {
                return <IconButton 
                onPress={() => {
                  authLogout();
                  setIsLoggedIn(false);
                }}
                icon={(props) => (
                  <Icon
                    name='logout'
                    {...props}
                    />
                )
                } 
                />
              }
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            initialParams={{
              firebaseApp,
            }}
            options={{
              title:"Perfil",
              headerRight: () => {
                return <IconButton 
                onPress={() => {
                  authLogout();
                  setIsLoggedIn(false);
                }}
                icon={(props) => (
                  <Icon
                    name='logout'
                    {...props}
                    />
                )
                } 
                />
              }
            }}
          />
        </Tab.Navigator>
      ) : (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{headerShown:false}}
          initialParams={{
            firebaseApp,
            setIsLoggedIn,
          }}
          />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{
            headerShown:false
        }}
          initialParams={{
            firebaseApp,
            setIsLoggedIn,
          }}
        />
      </Stack.Navigator> 
      )}
    </NavigationContainer>
  );
}

