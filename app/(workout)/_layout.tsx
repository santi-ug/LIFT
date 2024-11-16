import React from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { CancelIcon, GearIcon, SaveIcon, ShareIcon } from "../../components/atoms/icons";

const WorkoutLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name='newRoutine'
					options={{
						headerTitle: "Workouts",
						headerStyle: { backgroundColor: '#171328' },
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: '#fff',
						headerBackVisible: false,
						headerLeft: () => (
							<View className="flex-row mr-2 ">
								<TouchableOpacity
									onPress={() => router.push("/newworkout")}
								>
									<CancelIcon />
								</TouchableOpacity>
							</View>
						),
						headerRight: () => (
							<View className="flex-row mr-2">
								<ShareIcon />
								<TouchableOpacity className="ml-4"
									onPress={() => router.push("/newworkout")}
								>
									<SaveIcon/>
								</TouchableOpacity>
							</View>
						),
					}}
				/>

			</Stack>
			<StatusBar style='light' />
		</>
	);
};

export default WorkoutLayout;