import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import Main from "./components/screens/Main";

export default function App() {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}>
			<View style={{}}>
				<Main />
				<StatusBar style='auto' />
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: "black",
		color: "white",
	},
	text: {
		color: "white",
		fontSize: 20,
	},
});
