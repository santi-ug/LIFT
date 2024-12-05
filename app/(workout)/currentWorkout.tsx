import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import Exercise from "../../components/organisms/Exercise";
import { useSelectedExercisesStore } from "../../storage/selectedExerciseStorage";
import { useWorkoutStore } from "../../storage/workoutStorage";

interface WorkoutSet {
	id: number;
	weight: number;
	reps: number;
	rpe: string;
	checked: boolean;
}

interface Exercise {
	id: number;
	title: string;
	restTime: string;
	sets: WorkoutSet[];
}

interface WorkoutData {
	name: string;
	duration: number;
	notes: string;
	sets: WorkoutSet[];
	exercises: Exercise[];
}

const CurrentWorkout = () => {
	const { selectedExercises, clearSelectedExercises } =
		useSelectedExercisesStore();
	const { workout, resetWorkout, setWorkout, addActivity, setTimerRef } =
		useWorkoutStore();
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const [workoutData, setWorkoutData] = useState<WorkoutData>({
		name: workout.title || "",
		duration: workout.duration || 0,
		notes: workout.notes || "",
		sets: [],
		exercises: [],
	});

	// Start the timer
	useEffect(() => {
		timerRef.current = setInterval(() => {
			setWorkoutData((prevData) => {
				const newDuration = prevData.duration + 1;
				setWorkout({ duration: newDuration });
				return { ...prevData, duration: newDuration };
			});
		}, 1000);

		setTimerRef(timerRef.current);

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
			setTimerRef(null);
		};
	}, [setWorkout, setTimerRef]);

	// Sync exercises with the store's activities
	useEffect(() => {
		setWorkoutData((prevData) => ({
			...prevData,
			exercises: workout.activities.map((activity, index) => ({
				id: index + 1,
				title: activity.title,
				restTime: "2min 30s",
				sets: (activity.sets as WorkoutSet[]) || [],
			})),
		}));
	}, [workout.activities]);

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
						rpe: "RPE",
						checked: false,
					},
				] as WorkoutSet[],
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
	const handleWorkoutNameChange = useCallback(
		(value: string) => {
			setWorkoutData((prevData) => ({
				...prevData,
				name: value,
			}));
			setWorkout({ title: value });
		},
		[setWorkout]
	);

	// Handle workout notes change
	const handleNotesChange = useCallback(
		(value: string) => {
			setWorkoutData((prevData) => ({
				...prevData,
				notes: value,
			}));
			setWorkout({ notes: value });
		},
		[setWorkout]
	);

	// Add a new activity to the workout storage
	const handleAddActivity = useCallback(() => {
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
	}, [addActivity, workoutData.exercises]);

	// Add a new set to an exercise
	const handleAddSet = useCallback(
		(exerciseId: number) => {
			setWorkoutData((prevData) => {
				const updatedExercises = prevData.exercises.map((exercise) =>
					exercise.id === exerciseId
						? {
								...exercise,
								sets: [
									...exercise.sets,
									{
										id: exercise.sets.length + 1,
										weight: 0,
										reps: 0,
										rpe: "RPE",
										checked: false,
									},
								],
						  }
						: exercise
				);

				setWorkout({ total_sets: workout.total_sets + 1 });

				return { ...prevData, exercises: updatedExercises };
			});
		},
		[setWorkout, workout.total_sets]
	);

	// Handle changes to a set
	const handleSetChange = useCallback(
		(exerciseId: number, setId: number, field: string, value: any) => {
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
		},
		[]
	);

	// Toggle set completion
	const toggleSetComplete = useCallback((exerciseId: number, setId: number) => {
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
	}, []);

	// Cancel workout functionality
	const handleCancelWorkout = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			console.log(timerRef.current);

			timerRef.current = null;
		}
		resetWorkout();
		clearSelectedExercises();
		router.push("/newworkout");
	};

	return (
		<View className='flex-1 bg-background px-4'>
			<TextInput
				className='text-white text-2xl font-bold mt-2'
				value={workoutData.name}
				onChangeText={handleWorkoutNameChange}
				placeholder='Workout Name'
				placeholderTextColor='#646464'
			/>
			<Text className='text-primary mt-1'>
				{formatDuration(workoutData.duration)}
			</Text>
			<TextInput
				className='mt-2 mb-4 rounded-md py-2 text-white'
				value={workoutData.notes}
				onChangeText={handleNotesChange}
				placeholder='Add workout notes...'
				placeholderTextColor='#646464'
				multiline
			/>
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
			<View className='my-4'>
				<CustomButton
					title='+ Add Activity'
					handlePress={handleAddActivity}
					containerStyles='bg-[#5F48D950] mb-2'
					textStyles='text-[#5F48D9] font-bold'
				/>
				<CustomButton
					title='Cancel Workout'
					handlePress={handleCancelWorkout}
					containerStyles='bg-[#FF596430]'
					textStyles='text-[#FF5964] font-bold'
				/>
			</View>
		</View>
	);
};

export default CurrentWorkout;
