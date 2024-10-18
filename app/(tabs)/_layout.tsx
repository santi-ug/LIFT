import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {
	ExerciseIcon,
	NewWorkoutIcon,
	UserIcon,
} from "../../components/atoms/icons";

import Profile from "./profile"
import Exercises from "./exercises"; 
import Newworkout from "./newworkout"; 

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
		<View className='items-center justify-center gap-2 py-1'>
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

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
	return (
		<Tab.Navigator
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
			<Tab.Screen
				name='Profile'
				component={Profile} 
				options={{
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
			<Tab.Screen
				name='exercises'
				component={Exercises} 
				options={{
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
			<Tab.Screen
				name='newworkout'
				component={Newworkout} 
				options={{
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
		</Tab.Navigator>
	);
};

export default TabsLayout;
