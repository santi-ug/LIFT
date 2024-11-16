import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";
import {
	ExerciseIcon,
	NewWorkoutIcon,
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
		<View 
			className='items-center justify-center w-28 pt-3'
		>
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
	return (
		<>
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
		</>
	);
};

export default TabsLayout;