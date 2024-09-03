import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Main from "./components/screens/Main";

export default function App() {
	const insets = useSafeAreaInsets();
	return (
		<View style={{}}>
			<Main />
			<StatusBar style='auto' />
		</View>
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
