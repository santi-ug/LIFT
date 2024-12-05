import { create } from "zustand";

// Define Workout Interface
interface Workout {
	id?: number; // Optional for draft
	title: string;
	notes: string;
	date: string; // ISO date string
	draft: boolean;
	user_id: number;
	start_time: string; // ISO date string
	end_time: string; // ISO date string
	duration: number; // Duration in seconds
	total_sets: number;
	activities: Activity[]; // Linked activities
}

interface Activity {
	id?: number;
	title: string;
	sets: Set[];
	workout_id?: number; // Optional until saved to the backend
}

interface Set {
	id?: number;
	weight: number;
	reps: number;
	rpe: string;
	checked: boolean;
	activity_id?: number; // Optional until saved to the backend
}

// Zustand Store Interface
interface WorkoutStore {
	workout: Workout;
	timerRef: { current: NodeJS.Timeout | null }; // Timer reference
	setWorkout: (data: Partial<Workout>) => void; // Update workout fields
	addActivity: (activity: Omit<Activity, "id">) => void; // Add new activity
	deleteActivity: (activityId: number) => void; // Delete activity by ID
	updateActivity: (activityId: number, updates: Partial<Activity>) => void; // Update activity
	resetWorkout: () => void; // Reset workout state
	saveWorkout: () => Promise<void>; // Save workout to backend
	clearActivities: () => void; // Clear all activities
	clearWorkoutDetails: () => void; // Clear workout-specific fields
	setTimerRef: (timer: NodeJS.Timeout | null) => void;
}

// Default Workout State
const defaultWorkout: Workout = {
	title: "",
	notes: "",
	date: new Date().toISOString(),
	draft: true,
	user_id: 0, // Placeholder until assigned dynamically
	start_time: new Date().toISOString(),
	end_time: new Date().toISOString(),
	duration: 0,
	total_sets: 0,
	activities: [],
};

// Zustand Store Implementation
export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
	workout: { ...defaultWorkout },
	timerRef: { current: null },

	setWorkout: (data) =>
		set((state) => ({
			workout: {
				...state.workout,
				...data,
			},
		})),

	setTimerRef: (timer: any) =>
		set((state) => ({
			...state,
			timerRef: { current: timer },
		})),

	addActivity: (activity) =>
		set((state) => ({
			workout: {
				...state.workout,
				activities: [
					...state.workout.activities,
					{ ...activity, id: state.workout.activities.length + 1 },
				],
				total_sets: state.workout.total_sets + 1, // Increment total sets for the default set
			},
		})),

	deleteActivity: (activityId) =>
		set((state) => ({
			workout: {
				...state.workout,
				activities: state.workout.activities.filter(
					(activity) => activity.id !== activityId
				),
			},
		})),

	updateActivity: (activityId, updates) =>
		set((state) => ({
			workout: {
				...state.workout,
				activities: state.workout.activities.map((activity) =>
					activity.id === activityId ? { ...activity, ...updates } : activity
				),
			},
		})),

	// Clear all activities
	clearActivities: () =>
		set((state) => ({
			workout: {
				...state.workout,
				activities: [],
				total_sets: 0, // Reset total sets
			},
		})),

	// Clear workout-specific fields (title, notes, duration, etc.)
	clearWorkoutDetails: () =>
		set(() => ({
			workout: {
				...defaultWorkout, // Reset to default state
				activities: [], // Explicitly clear activities
			},
		})),

	// Reset entire workout state to the default
	resetWorkout: () => {
		const timerRef = get().timerRef;

		// Clear any running timer
		if (timerRef) {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
			set({ timerRef: { current: null } });
		}

		// Reset workout state
		set(() => ({
			workout: {
				...defaultWorkout,
				activities: [], // Explicitly clear activities
				total_sets: 0, // Reset total sets
				duration: 0, // Reset duration
			},
		}));
	},

	saveWorkout: async () => {
		const workout = get().workout;

		try {
			const response = await fetch("https://your-api-url.com/workouts", {
				method: workout.id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(workout),
			});

			if (!response.ok) {
				throw new Error("Failed to save workout");
			}

			const savedWorkout = await response.json();

			set(() => ({
				workout: { ...savedWorkout },
			}));

			console.log("Workout saved successfully!");
		} catch (error) {
			console.error("Error saving workout:", error);
		}
	},
}));
