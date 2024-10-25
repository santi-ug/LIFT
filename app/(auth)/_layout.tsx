import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name='login'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='register'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
			<StatusBar style='light' />
		</>
	);
};

export default AuthLayout;
