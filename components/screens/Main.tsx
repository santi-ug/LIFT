import { StyleSheet, Text, View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import LinkButton from "../molecules/LinkButton";
import TextLink from "../molecules/TextLink";

export default function Main() {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LIFT.</Text>

			<LinkButton
				text='GET STARTED'
				href='/index'
				styleLink={{ padding: 16, color: "white", fontSize: 15, height: 55 }}
				styleButton={{
					width: "91%",
					borderRadius: 30,
					marginTop: 25,
					backgroundColor: "#5F48D9",
				}}
			/>

			<TextLink
				text='Already have an account? '
				linkHref='/login'
				textLink=' Log in'
				textStyle={{
					margin: 28,
					color: "white",
					fontSize: 15,
					textAlign: "center",
				}}
				linkStyle={{ width: "91%", marginTop: 30, color: "#5F48D9" }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 75,
		fontWeight: "bold",
		color: "white",
		marginLeft: 15,
	},

	container: {
		backgroundColor: "#171328",
		padding: 10,
		paddingTop: 430,
		paddingBottom: 80,
	},
});
