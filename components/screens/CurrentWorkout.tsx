import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import Exercise from "../../components/organisms/Exercise";
import { useSelectedExercisesStore } from "../../storage/selectedExerciseStorage";

const CurrentWorkout = () => {
	const { selectedExercises } = useSelectedExercisesStore();
	const [workoutData, setWorkoutData] = useState({
		name: "Workout Name",
		duration: "1h 9min 56s",
		exercises: [],
	});

	useEffect(() => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: selectedExercises.map((exercise, index) => ({
				id: index + 1,
				title: exercise.name,
				restTime: "2min 30s",
				sets: [
					{
						id: 1,
						weight: 0,
						reps: 0,
						previous: "N/A",
						rpe: "RPE",
						checked: false,
					},
				],
			})),
		}));
	}, [selectedExercises]);

	const handleSetChange = (exerciseId, setId, field, value) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.map((exercise) => {
				if (exercise.id === exerciseId) {
					return {
						...exercise,
						sets: exercise.sets.map((set) =>
							set.id === setId ? { ...set, [field]: value } : set
						),
					};
				}
				return exercise;
			}),
		}));
	};

	const handleAddSet = (exerciseId) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.map((exercise) =>
				exercise.id === exerciseId
					? {
							...exercise,
							sets: [
								...exercise.sets,
								{
									id: exercise.sets.length + 1,
									weight: 0,
									reps: 0,
									previous: "N/A",
									rpe: "RPE",
									checked: false,
								},
							],
					  }
					: exercise
			),
		}));
	};

	const saveWorkout = () => {
		console.log("Workout Saved:", workoutData);
		Alert.alert("Workout Saved", "Your workout has been successfully saved!");
	};

	return (
		<View className='flex-1 bg-background px-4'>
			<View className='flex-row justify-between items-center mt-10'>
				<TouchableOpacity onPress={() => router.back()}>
					<Text className='text-gray-400 text-lg'>◀ Current Workout</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={saveWorkout}
					className='bg-purple-600 px-4 py-2 rounded-md'
				>
					<Text className='text-white font-bold'>Finish</Text>
				</TouchableOpacity>
			</View>

			<Text className='text-white text-2xl font-bold mt-4'>
				{workoutData.name}
			</Text>
			<Text className='text-primary mt-1'>{workoutData.duration}</Text>
			<FlatList
				data={workoutData.exercises}
				renderItem={({ item }) => (
					<Exercise
						exercise={item}
						handleSetChange={handleSetChange}
						handleAddSet={handleAddSet}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>
		</View>
	);
};

export default CurrentWorkout;
