import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import Exercise from "../../components/organisms/Exercise";
import { useSelectedExercisesStore } from "../../storage/selectedExerciseStorage";
import { useWorkoutStore } from "../../storage/workoutStorage"; // Import workout storage

const CurrentWorkout = () => {
	const { selectedExercises } = useSelectedExercisesStore();
	const { workout, setWorkout, addActivity } = useWorkoutStore(); // Access workout storage

	interface Set {
		id: number;
		weight: number;
		reps: number;
		previous: string;
		rpe: string;
		checked: boolean;
	}

	interface Exercise {
		id: number;
		title: string;
		restTime: string;
		sets: Set[];
	}

	interface WorkoutData {
		name: string;
		duration: number;
		notes: string;
		exercises: Exercise[];
	}

	const [workoutData, setWorkoutData] = useState<WorkoutData>({
		name: workout.title || "",
		duration: workout.duration || 0,
		notes: workout.notes || "",
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
	const formatDuration = (durationInSeconds: number) => {
		const hours = Math.floor(durationInSeconds / 3600);
		const minutes = Math.floor((durationInSeconds % 3600) / 60);
		const seconds = durationInSeconds % 60;
		return `${hours > 0 ? `${hours}h ` : ""}${minutes}min ${seconds}s`;
	};

	// Handle workout name change
	const handleWorkoutNameChange = (value: string) => {
		setWorkoutData((prevData) => ({
			...prevData,
			name: value,
		}));
		setWorkout({ title: value }); // Update storage
	};

	// Handle workout notes change
	const handleNotesChange = (value: string) => {
		setWorkoutData((prevData) => ({
			...prevData,
			notes: value,
		}));
		setWorkout({ notes: value }); // Update storage
	};

	// Add a new activity to the workout storage
	const handleAddActivity = () => {
		workoutData.exercises.forEach((exercise) => {
			addActivity({
				title: exercise.title,
				sets: exercise.sets,
			});
		});
		router.push({
			pathname: "/exercises",
			params: { fromRoutine: "true" },
		});
	};

	// Add a new set to an exercise
	const handleAddSet = (exerciseId: number) => {
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
	const handleSetChange = (
		exerciseId: number,
		setId: number,
		field: string,
		value: any
	) => {
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
	const toggleSetComplete = (exerciseId: number, setId: number) => {
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

	return (
		<View className='flex-1 bg-background px-4'>
			{/* Editable Workout Name */}
			<TextInput
				className='text-white text-2xl font-bold mt-2'
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
						onAddSet={(exerciseId: any) => handleAddSet(exerciseId)}
						onSetChange={(
							exerciseId: any,
							setId: any,
							field: any,
							value: any
						) => handleSetChange(exerciseId, setId, field, value)}
						onToggleSetComplete={(exerciseId: any, setId: any) =>
							toggleSetComplete(exerciseId, setId)
						}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>

			{/* Footer Buttons */}
			<View className='my-4'>
				<CustomButton
					title='+ Add Activity'
					handlePress={handleAddActivity}
					containerStyles='bg-[#5F48D950] mb-2'
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
