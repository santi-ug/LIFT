import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import Login from "../components/screens/Login";

export default function login() {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider>
			<View
				style={{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					backgroundColor: "black",
				}}
			>
				<Login />
			</View>
		</SafeAreaProvider>
	);
}
