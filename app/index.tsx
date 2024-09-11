import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { Link } from "expo-router";
import Main from "../components/screens/Main";

export default function App() {
	return (
		<View className='flex-1 items-center justify-center bg-white'>
			<Text className='text-3xl font-ibold'>LIFT.</Text>
			<StatusBar style='auto' />
			<Link href='/login' style={{ color: "black" }}>
				Go to Login
			</Link>
		</View>
	);
}
