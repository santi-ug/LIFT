import React from "react";
import { Button, Text, View } from "react-native";
import { ToDoItem } from "../types/todoitem";

export const ToDoItemComponent: React.FC<{
	todo: ToDoItem;
	deleteItem: Function;
}> = ({ todo: { id, value }, deleteItem }) => {
	return (
		<View className='mt-4 px-6 bg-sky-400 mx-5 rounded-lg border border-black'>
			<View className='flex-row justify-center'>
				<Text className='text-lg font-normal'>{value}</Text>
			</View>
			<Button
				onPress={() => deleteItem(id)}
				title='done'
				color='#841584'
				accessibilityLabel='add todo item'
			/>
		</View>
	);
};
