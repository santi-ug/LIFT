import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Set {
	id: string;
	weight: number;
	reps: number;
	rpe: string;
	checked: boolean;
}

interface SetRowProps {
	set: Set;
	handleSetChange: (id: string, field: string, value: string) => void;
	toggleSetComplete: (id: string) => void;
}

const SetRow: React.FC<SetRowProps> = ({
	set,
	handleSetChange,
	toggleSetComplete,
}) => {
	return (
		<View
			key={set.id}
			className={`flex-row items-center justify-between py-1 rounded-md mb-2 ${
				set.checked ? "bg-green-500" : "bg-background-4"
			}`}
		>
			{/* Set ID */}
			<Text className='text-white w-10 text-center font-bold'>{set.id}</Text>

			{/* Weight Input */}
			<TextInput
				className='text-white w-20 text-center rounded-md'
				placeholder='Weight'
				placeholderTextColor='#646464'
				keyboardType='numeric'
				value={set.weight.toString()}
				onChangeText={(value) => handleSetChange(set.id, "weight", value)}
			/>

			{/* Reps Input */}
			<TextInput
				className='text-white w-10 text-center rounded-md'
				placeholder='Reps'
				placeholderTextColor='#646464'
				keyboardType='numeric'
				value={set.reps.toString()}
				onChangeText={(value) => handleSetChange(set.id, "reps", value)}
			/>

			{/* RPE Input */}
			<TextInput
				className='text-white w-10 text-center rounded-md'
				placeholder='RPE'
				placeholderTextColor='#646464'
				value={set.rpe}
				onChangeText={(value) => handleSetChange(set.id, "rpe", value)}
			/>

			{/* Completion Button */}
			<TouchableOpacity onPress={() => toggleSetComplete(set.id)}>
				<Text
					className={`text-center text-lg ${
						set.checked ? "text-green-700" : "text-gray-400"
					}`}
				>
					{set.checked ? "✔" : "✖"}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SetRow;
