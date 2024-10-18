import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../(auth)/login';
import Register from '../(auth)/register'; 

const Stack = createStackNavigator();

const AuthLayout = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="register"
				component={Register}
				options={{ headerShown: false }} 
			/>
		</Stack.Navigator>
	);
};

export default AuthLayout;
