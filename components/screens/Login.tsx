import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				paddingTop: 30,
				paddingBottom: insets.bottom,
				// backgroundColor: "black",
			}}
		>
			<Text style={{ color: "white" }}>Here is login</Text>
		</View>
	);
}
