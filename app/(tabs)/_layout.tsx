import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import {
	ExerciseActiveIcon,
	ExerciseIcon,
	NewWorkoutActiveIcon,
	NewWorkoutIcon,
	UserActiveIcon,
	UserIcon,
} from "../../components/atoms/icons";

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
		<View className='items-center justify-center gap-2'>
			<IconComponent color={color} />
			<Text
				className={`${focused ? "font-isemibold" : "font-iregular"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#5F48D9",
					tabBarInactiveTintColor: "#E5E4ED",
					tabBarStyle: {
						backgroundColor: "#171328",
						borderTopWidth: 1,
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
								iconProps={color}
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
								iconProps={color}
								color={color}
								name={"Profile"}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;