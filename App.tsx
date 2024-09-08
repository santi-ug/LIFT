import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import Main from "./components/screens/Main";

export default function App() {
	const insets = useSafeAreaInsets();
	return (
		<View >
			<Main />
			<StatusBar style='auto' />
		</View>
	);
}

