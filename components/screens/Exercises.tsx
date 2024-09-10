import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, View} from "react-native";
import React from 'react';

export default function Exercises() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exercises</Text>
		</View>
	);
}

const styles = StyleSheet.create({

	title: {
		fontSize: 45,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 20,
		marginLeft: 9
	},

	container: {
		backgroundColor: "#171328",
		padding: 10,
		paddingTop: 100
	},
})
