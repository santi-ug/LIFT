import { Tabs, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	ExerciseIcon,
	NewWorkoutIcon,
	UserIcon,
} from "../../components/atoms/icons";
import { useWorkoutStore } from "../../storage/workoutStorage"; // Import workout storage

interface TabIconProps {
	icon: React.ElementType;
	color: string;
	name: string;
	focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({
	icon: IconComponent,
	color,
	name,
	focused,
}) => {
	return (
		<View className='items-center justify-center w-28 pt-3'>
			<IconComponent color={color} />
			<Text
				className={`${focused ? "font-semibold" : "font-normal"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	const { workout } = useWorkoutStore(); // Access the workout state

	// Format duration (HH:MM:SS)
	const formatDuration = (durationInSeconds: number) => {
		const hours = Math.floor(durationInSeconds / 3600);
		const minutes = Math.floor((durationInSeconds % 3600) / 60);
		const seconds = durationInSeconds % 60;
		return `${hours > 0 ? `${hours}h ` : ""}${minutes}min ${seconds}s`;
	};

	return (
		<>
			{/* Tabs and Homebar */}
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#5F48D9",
					tabBarInactiveTintColor: "#E5E4ED",
					tabBarStyle: {
						height: 60,
						backgroundColor: "#171328",
						borderTopWidth: 2,
						borderTopColor: "#151124",
					},
				}}
			>
				<Tabs.Screen
					name='exercises'
					options={{
						title: "Exercises",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={ExerciseIcon}
								color={color}
								name={"Exercises"}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='newworkout'
					options={{
						title: "New Workout",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={NewWorkoutIcon}
								color={color}
								name={"New Workout"}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={UserIcon}
								color={color}
								name={"Profile"}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>

			{/* Ongoing Workout Bar */}
			{workout.duration > 0 && (
				<TouchableOpacity
					className='absolute bottom-16 left-0 right-0 bg-primary p-3 flex-row justify-between items-center'
					onPress={() => router.push("/currentWorkout")}
				>
					<Text className='text-white font-bold'>
						Ongoing Workout - {formatDuration(workout.duration)}
					</Text>
					<Text className='text-white underline'>Continue</Text>
				</TouchableOpacity>
			)}
		</>
	);
};

export default TabsLayout;
