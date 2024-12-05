import { create } from "zustand";
import { Exercise } from "../types/exercise";

interface SelectedExercisesStore {
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseName: string) => void;
	clearSelectedExercises: () => void;
}

export const useSelectedExercisesStore = create<SelectedExercisesStore>(
	(set) => ({
		selectedExercises: [],

		addExercise: (exercise) =>
			set((state) => ({
				selectedExercises: [...state.selectedExercises, exercise],
			})),

		removeExercise: (exerciseName) =>
			set((state) => ({
				selectedExercises: state.selectedExercises.filter(
					(ex) => ex.name !== exerciseName
				),
			})),

		// Clear all selected exercises
		clearSelectedExercises: () =>
			set(() => ({
				selectedExercises: [],
			})),
	})
);
