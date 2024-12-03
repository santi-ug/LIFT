import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import Exercise from "../../components/organisms/Exercise";
import { useSelectedExercisesStore } from "../../storage/selectedExerciseStorage";

const CurrentWorkout = () => {
	const { selectedExercises } = useSelectedExercisesStore();
	const [workoutData, setWorkoutData] = useState({
		name: "",
		duration: 0,
		notes: "",
		exercises: [],
	});

	// Timer Effect
	useEffect(() => {
		const timer = setInterval(() => {
			setWorkoutData((prevData) => ({
				...prevData,
				duration: prevData.duration + 1,
			}));
		}, 1000);

		return () => clearInterval(timer); // Cleanup timer on unmount
	}, []);

	// Update exercises when selectedExercises changes
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

	// Convert duration to HH:MM:SS format
	const formatDuration = (durationInSeconds) => {
		const hours = Math.floor(durationInSeconds / 3600);
		const minutes = Math.floor((durationInSeconds % 3600) / 60);
		const seconds = durationInSeconds % 60;
		return `${hours > 0 ? `${hours}h ` : ""}${minutes}min ${seconds}s`;
	};

	// Handle workout name change
	const handleWorkoutNameChange = (value) => {
		setWorkoutData((prevData) => ({
			...prevData,
			name: value,
		}));
	};

	// Handle workout notes change
	const handleNotesChange = (value) => {
		setWorkoutData((prevData) => ({
			...prevData,
			notes: value,
		}));
	};

	// Add a new set to an exercise
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

	// Handle changes to a set
	const handleSetChange = (exerciseId, setId, field, value) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.map((exercise) =>
				exercise.id === exerciseId
					? {
							...exercise,
							sets: exercise.sets.map((set) =>
								set.id === setId ? { ...set, [field]: value } : set
							),
					  }
					: exercise
			),
		}));
	};

	// Toggle set completion
	const toggleSetComplete = (exerciseId, setId) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.map((exercise) =>
				exercise.id === exerciseId
					? {
							...exercise,
							sets: exercise.sets.map((set) => {
								if (set.id === setId) {
									if (!set.weight || set.reps <= 0) {
										Alert.alert(
											"Invalid Set",
											"Please enter a valid weight and reps before marking the set as complete."
										);
										return set;
									}
									return { ...set, checked: !set.checked };
								}
								return set;
							}),
					  }
					: exercise
			),
		}));
	};

	// Delete a specific set
	const handleDeleteSet = (exerciseId, setId) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.map((exercise) =>
				exercise.id === exerciseId
					? {
							...exercise,
							sets: exercise.sets.filter((set) => set.id !== setId),
					  }
					: exercise
			),
		}));
	};

	// Delete an entire exercise
	const handleDeleteExercise = (exerciseId) => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: prevData.exercises.filter(
				(exercise) => exercise.id !== exerciseId
			),
		}));
	};

	return (
		<View className='flex-1 bg-background px-4'>
			{/* Editable Workout Name */}
			<TextInput
				className='text-white text-2xl font-bold mt-10'
				value={workoutData.name}
				onChangeText={handleWorkoutNameChange}
				placeholder='Workout Name'
				placeholderTextColor='#646464'
			/>

			{/* Real-time Duration Timer */}
			<Text className='text-primary mt-1'>
				{formatDuration(workoutData.duration)}
			</Text>

			{/* Editable Notes Section */}
			<TextInput
				className='mt-2 mb-4 rounded-md py-2 text-white'
				value={workoutData.notes}
				onChangeText={handleNotesChange}
				placeholder='Add workout notes...'
				placeholderTextColor='#646464'
				multiline
			/>

			{/* Render Exercises */}
			<FlatList
				data={workoutData.exercises}
				renderItem={({ item }) => (
					<Exercise
						exercise={item}
						onAddSet={(exerciseId) => handleAddSet(exerciseId)}
						onSetChange={(exerciseId, setId, field, value) =>
							handleSetChange(exerciseId, setId, field, value)
						}
						onToggleSetComplete={(exerciseId, setId) =>
							toggleSetComplete(exerciseId, setId)
						}
						onDeleteSet={handleDeleteSet}
						onDeleteExercise={() => handleDeleteExercise(item.id)}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>

			{/* Footer Buttons */}
			<View className='mt-4'>
				<CustomButton
					title='+ Add Activity'
					handlePress={() =>
						router.push({
							pathname: "/exercises",
							params: { fromRoutine: "true" },
						})
					}
					containerStyles='bg-[#5F48D950]'
					textStyles='text-[#5F48D9] font-bold'
				/>
				<CustomButton
					title='Cancel Workout'
					handlePress={() => console.log("Cancel Workout Pressed")}
					containerStyles='bg-[#FF596430]'
					textStyles='text-[#FF5964] font-bold'
				/>
			</View>
		</View>
	);
};

export default CurrentWorkout;
