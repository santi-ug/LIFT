import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { Timer } from "../atoms/icons";
import SetRow from "../molecules/SetRow";

interface ExerciseProps {
	exercise: {
	  id: number;
	  title: string;
	  restTime: string;
	  sets: {
		id: number;
		weight: number;
		reps: number;
		rpe: string; // Cambiar a string
		checked: boolean;
	  }[];
	};
	onAddSet: (exerciseId: number) => void;
	onSetChange: (
	  exerciseId: number,
	  setId: number,
	  field: string, // Cambiar field a string
	  value: any
	) => void;
	onToggleSetComplete: (exerciseId: number, setId: number) => void;
}  

const Exercise: React.FC<ExerciseProps> = ({
	exercise,
	onAddSet,
	onSetChange,
	onToggleSetComplete,
}) => {
	const renderSet = ({
		item,
	}: {
		item: {
			id: number;
			weight: number;
			reps: number;
			rpe: number;
			checked: boolean;
		};
	}) => (
		<SetRow
			set={{
				...item,
				id: item.id.toString(),
				rpe: item.rpe.toString(), // Conversión a string
			}}
			handleSetChange={(setId: string, field: string, value) =>
				onSetChange(exercise.id, parseInt(setId), field, value)
			}
			toggleSetComplete={(setId: string) =>
				onToggleSetComplete(exercise.id, parseInt(setId))
			}
		/>
	);	

	return (
		<View className='bg-background-4 mb-6 rounded-lg py-4'>
			<View>
				<Text className='text-lg text-white mb-2 font-semibold'>
					{exercise.title}
				</Text>
			</View>
			<TextInput
				className='text-white rounded-md py-2 mb-4'
				placeholder='Add notes here...'
				placeholderTextColor='#646464'
			/>
			<View className='flex-row'>
				<Timer />
				<Text className='text-primary mb-4'>
					{" "}
					Rest Timer: {exercise.restTime}
				</Text>
			</View>

			{/* Column Headers */}
			<View className='flex-row justify-between border-b border-[#313131] pb-1 mb-2'>
				<Text className='text-gray-400 w-10 text-center text-xs'>SET</Text>
				<Text className='text-gray-400 w-20 text-center text-xs'>KG</Text>
				<Text className='text-gray-400 w-10 text-center text-xs'>REPS</Text>
				<Text className='text-gray-400 w-10 text-center text-xs'>RPE</Text>
				<Text className='text-gray-400 text-center'>✔</Text>
			</View>

			{/* Render Sets */}
			<FlatList
				data={exercise.sets.map((set) => ({
					...set,
					rpe: parseFloat(set.rpe), // Convertir a número
				}))}
				
				renderItem={renderSet}
				keyExtractor={(item) => item.id.toString()}
			/>


			{/* Add Set Button */}
			<View className='mt-4'>
				<CustomButton
					title='+ Add Set'
					handlePress={() => onAddSet(exercise.id)}
					containerStyles='bg-[#232332]'
					textStyles='font-bold'
				/>
			</View>
		</View>
	);
};

export default Exercise;
