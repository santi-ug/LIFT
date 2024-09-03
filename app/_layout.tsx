import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
	return (
		<SafeAreaProvider>
			<View>
				<Slot />
			</View>
		</SafeAreaProvider>
	);
}
