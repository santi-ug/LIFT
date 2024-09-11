import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";

import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Main from "../components/screens/Main";

import home from "../assets/images/home.png";
import CustomButton from "../components/atoms/CustomButton";

export default function App() {
	return (
		<>
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
							handlePress={() => router.push("/register")}
							containerStyles='w-full mt-16'
						/>
						{/* alrdy account link */}
						<Text className='text-white text-xs mt-4'>
							Already have an account?
							<Link href='/login' className='text-primary font-ibold'>
								{" "}
								Log in
							</Link>
						</Text>
					</View>
				</ScrollView>
				<StatusBar style='light' />
			</SafeAreaView>
		</>

		// <View className='flex-1 items-center justify-center bg-white'>
		// 	<Text className='text-3xl font-ibold'>LIFT.</Text>
		// 	<Link href='/newworkout' style={{ color: "black" }}>
		// 		Go to new workout
		// 	</Link>
		// </View>
	);
}
