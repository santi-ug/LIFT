import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import {
	ArrowDownIcon,
	CancelIcon,
	ShareIcon,
} from "../../components/atoms/icons";
import { finishWorkout } from "../../lib/api_backend";
import { useSelectedExercisesStore } from "../../storage/selectedExerciseStorage";
import { useWorkoutStore } from "../../storage/workoutStorage"; // Assume you store the workout data here

const WorkoutLayout = () => {
	const { workout, resetWorkout } = useWorkoutStore(); // Fetch workout data and a reset function
	const { selectedExercises, clearSelectedExercises } =
		useSelectedExercisesStore(); // Fetch selected exercises

	const finishedWorkout = async () => {
		try {
			const res = await finishWorkout(workout);

			// Reset the workout state in the store
			resetWorkout();
			clearSelectedExercises(); // Clear selected exercises

			console.log(workout.duration);
		} catch (e) {
			console.log(e);
		}
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
									handlePress={finishedWorkout} // Calls the finishWorkout function
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
								<Text className='text-white text-xs'>Current Workout</Text>
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
									handlePress={finishedWorkout} // Calls the finishWorkout function
									containerStyles='px-6 ml-2 min-h-[35px]' // Override height and padding
									textStyles='text-white text-xs font-bold'
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
