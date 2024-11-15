import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ExerciseLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name='exerciseDetail'
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name='exerciseFilter'
					options={{
						headerShown: false,
					}}
				/>

			</Stack>
			<StatusBar style='light' />
		</>
	);
};

export default ExerciseLayout;