import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const UserLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name='biometricHistory'
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name='editProfile'
					options={{
						headerShown: false,
					}}
				/>

                <Stack.Screen
					name='measures'
					options={{
						headerShown: false,
					}}
				/>

			</Stack>
			<StatusBar style='light' />
		</>
	);
};

export default UserLayout;