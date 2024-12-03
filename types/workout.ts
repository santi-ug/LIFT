export interface Workout {
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

export interface Activity {
	id?: number;
	title: string;
	sets: Set[];
	workout_id?: number; // Optional until saved to the backend
}

export interface Set {
	id?: number;
	weight: number;
	reps: number;
	rpe: string;
	checked: boolean;
	activity_id?: number; // Optional until saved to the backend
}
