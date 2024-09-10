import { EmailIcon, PasswordIcon, PasswordVisibleIcon, PasswordNoVisibleIcon, AppleIcon, UserIcon } from "../atoms/icons";
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import React from 'react';

// Profile.tsx
export default function Profile() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
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
});
  

