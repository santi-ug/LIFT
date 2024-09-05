import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import SearchInput from "../organisms/SearchInput";
import CustomButton from "../atoms/CustomButton"; 
import HomeButton from "../molecules/HomeButton";

export default function Main() {
	return (
		<View>
			 <SearchInput />
			 <View style={styles.buttonContainer}>
			 	<HomeButton 
					text="Press me" 
					href="/listItems"
				/>
			 </View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonContainer: {
		alignItems: 'center',  // Centra el botón horizontalmente
		margin: 50,
	},
});
