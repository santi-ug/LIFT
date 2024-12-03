import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import {
	ArrowDownIcon,
	CancelIcon,
	ShareIcon,
} from "../../components/atoms/icons";

const WorkoutLayout = () => {
	const finishWorkout = () => {
		console.log("Finished workout");
	};

	return (
		<>
			<Stack>
				{/* First Screen: "newRoutine" */}
				<Stack.Screen
					name='newRoutine'
					options={{
						headerTitle: "Log Workout", // Matches first image's title
						headerStyle: { backgroundColor: "#171328" }, // Dark background
						headerTitleStyle: { fontSize: 14, color: "#FFF" }, // White title
						headerTintColor: "#fff", // Back arrow color
						headerBackVisible: false,
						headerLeft: () => (
							<View style={{ flexDirection: "row", marginLeft: 10 }}>
								<TouchableOpacity onPress={() => router.push("/newworkout")}>
									<ArrowDownIcon />
								</TouchableOpacity>
							</View>
						),
						headerRight: () => (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginRight: 10,
								}}
							>
								<ShareIcon />
								<CustomButton
									title='Finish'
									handlePress={finishWorkout}
									containerStyles='px-6 ml-2 min-h-[35px]' // Override height and padding
									textStyles='text-white'
								/>
							</View>
						),
					}}
				/>

				{/* Second Screen: "currentWorkout" */}
				<Stack.Screen
					name='currentWorkout'
					options={{
						headerTitle: "", // Explicitly set the title
						headerStyle: { backgroundColor: "#171328" },
						headerTintColor: "#fff",
						headerBackVisible: false,

						headerLeft: () => (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginLeft: 10,
								}}
							>
								<TouchableOpacity
									onPress={() => router.push("/newworkout")}
									style={{ marginRight: 10 }}
								>
									<ArrowDownIcon />
								</TouchableOpacity>
								<Text className='text-white text-base'>Current Workout</Text>
							</View>
						),
						headerRight: () => (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginRight: 10,
								}}
							>
								<CustomButton
									title='Finish'
									handlePress={() => console.log("Finished workout")}
									containerStyles='px-6 ml-2 min-h-[35px]' // Override height and padding
									textStyles='text-white text-base'
								/>
							</View>
						),
					}}
				/>
			</Stack>
			<StatusBar style='light' />
		</>
	);
};

export default WorkoutLayout;
