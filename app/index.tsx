import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack"; 
import { RootStackParamList } from "../types/Rutas";
import { useNavigation } from "@react-navigation/native"; 

import home from "../assets/images/home.png";
import CustomButton from "../components/atoms/CustomButton";

export default function App() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	return (
		<View>
			<Image source={home} className='w-full h-full bg-background ' />
			<SafeAreaView className='w-full h-full absolute'>

				<ScrollView contentContainerStyle={{ height: "100%" }}>

					<View className='w-full justify-center items-center min-h-[125vh] px-8'>
						<Text className='text-8xl font-ibold text-white items-start'>
							LIFT.
						</Text>
						<Text className='text-white text-xs text-center'>
							Track workouts effortlessly, {"\n"} achieve progress with purpose.
						</Text>
						{/* button */}
						<CustomButton
							title='GET STARTED'
							handlePress={() => navigation.navigate("(auth)", { screen: "register" })}
							containerStyles='w-full mt-16'
						/>
						{/* alrdy account link */}
						<View className='justify-center pt-5 flex-row gap-2'>
							<Text className='text-white '>Already have an account?</Text>
							<Text
								className='text-primary font-ibold'
								onPress={() => navigation.navigate("(auth)", { screen: "login" })}
							>
								Login
							</Text>
						</View>

						{/* TEMPORARY LINK TO GO TO MAIN SCREEN WHEN LOGGED IN -- NEW WORKOUT  */}
						<Text
							className='text-primary font-ibold mt-5'
							onPress={() => navigation.navigate("(tabs)")} 
						>
							NEW WORKOUT [TEMP]
						</Text>
						
					</View>

				</ScrollView>
				<StatusBar style='light' />
				
			</SafeAreaView>
		</View>
	);
}
