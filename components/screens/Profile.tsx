import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, View} from "react-native";
import Footer from "../organisms/Footer";

export default function Profile() {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
            <Footer/>
		</View>
	);
}

const styles = StyleSheet.create({

	container: {
		backgroundColor: "#171328",
		padding: 10,
		paddingTop: 430,
		paddingBottom: 80
	}, 
})
