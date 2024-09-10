import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExerciseIcon, ExerciseActiveIcon, UserIcon, UserActiveIcon, NewWorkoutIcon, NewWorkoutActiveIcon} from '../atoms/icons'; 
import Exercises from "../screens/Exercises";  
import NewWorkout from '../screens/NewWorkout';  
import Profile from '../screens/Profile';  
import { Pressable, Text, StyleSheet, TextStyle} from "react-native";
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Footer() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#171328',
          padding: 4,
          height:65,
          paddingBottom:10
        },

        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Exercises':
              icon = focused ? <ExerciseActiveIcon /> : <ExerciseIcon />;
              break;
            case 'New Workout':
              icon = focused ? <NewWorkoutActiveIcon /> : <NewWorkoutIcon />;
              break;
            case 'Profile':
              icon = focused ? <UserActiveIcon /> : <UserIcon />;
              break;
            default:
              icon = null;
          }
          return icon;
        },

        tabBarLabel: ({ focused }) => {
          const labelColor = focused ? '#5F48D9' : '#FFFFFF'; 
          return (
            <Text style={{ color: labelColor, fontSize: 12 }}>
              {route.name}
            </Text>
          );
        },

      })}

    >

      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Exercises" component={Exercises} />
      <Tab.Screen name="New Workout" component={NewWorkout} />

    </Tab.Navigator>
  );
}
