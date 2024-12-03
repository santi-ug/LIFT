import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import {
	AddIcon,
	ClipboardIcon,
	MagnifyingGlassIcon,
} from "../../components/atoms/icons";

export default function NewWorkout() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const onSubmit = () => {
		router.push("/currentWorkout");
	};

	return (
		<View className='flex-1 bg-background'>
			<Text className='font-semibold text-xl ml-1 text-white pt-5 pl-3'>
				Quick start
			</Text>

			<CustomButton
				title='New Workout'
				icon={AddIcon}
				handlePress={onSubmit}
				containerStyles='h-10 m-3 border-search text-search border-2 w-12/12 rounded-full bg-background'
				isLoading={isSubmitting}
			/>

			<Text className='font-semibold text-xl ml-1 text-white pt-5 pl-3'>
				Routines
			</Text>

			<View className='flex-row my-5 mx-2'>
				<TouchableOpacity
					className='flex-1 pv-10 justify-center border-2 border-search items-center bg-background mx-2 p-2 rounded-xl'
					onPress={() => router.push("/newRoutine")}
				>
					<View className='pt-2 items-center'>
						<ClipboardIcon />
						<Text className='text-base text-white font-medium py-2'>
							New Routine
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity className='flex-1 pv-10 justify-center border-2 border-search items-center bg-background mx-2 p-2 rounded-xl'>
					<View className='pt-2 items-center'>
						<MagnifyingGlassIcon />
						<Text className='text-base text-white font-medium py-2'>
							Explore Routines
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
