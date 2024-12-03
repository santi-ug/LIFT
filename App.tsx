import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
import home from "./assets/home.png";
import CustomButton from "./components/atoms/CustomButton";

export default function App() {
	return (
		<>
			<Image source={home} className='w-full h-full bg-background ' />
			<SafeAreaView className='w-full h-full absolute'>
				<ScrollView contentContainerStyle={{ height: "100%" }}>
					<View className='w-full justify-center items-center min-h-[125vh] px-8'>
						<Text className='text-8xl text-white items-start'>LIFT</Text>
						<Text className='text-white text-xs text-center'>
							Track workouts effortlessly, {"\n"} achieve progress with purpose.
						</Text>
						{/* button */}
						<CustomButton
							title='GET STARTED'
							handlePress={() => router.push("/register")}
							containerStyles='w-full mt-16'
						/>
						{/* alrdy account link */}
						<View className='justify-center pt-5 flex-row gap-2'>
							<Text className='text-white '>Already have an account?</Text>
							<Link href='/login' className='text-primary'>
								Login
							</Link>
						</View>
						{/* TEMPORARY LINK TO GO TO MAIN SCREEN WHEN LOGGED IN -- NEW WORKOUT */}
						<Link href='/profile' className='text-primary mt-5'>
							NEW WORKOUT [TEMP]
						</Link>
					</View>
				</ScrollView>
				<StatusBar style='light' />
			</SafeAreaView>
		</>
	);
}
