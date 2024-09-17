import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View } from "react-native";
import {
	ShareIcon,
	GearIcon,
} from "../components/atoms/icons";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [fontsLoaded, error] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) SplashScreen.hideAsync();

		if (!fontsLoaded && !error) return;
	}, [fontsLoaded, error]);

	return (
		<>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='(tabs)' options={{
						headerTitle: "Edit Profile",
						headerStyle: { backgroundColor: '#171328'},
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: '#fff',
						headerBackVisible: false, // Eliminar la flecha de retroceso
						headerRight: () => (
							<View className="flex-row mr-2">
								<ShareIcon />
								<View className="ml-4">
									<GearIcon />
								</View>
							</View>
						),
					}} />

				{/* <Stack.Screen name='/search/[query]' options={{ headerShown: false }} /> */}
			</Stack>
		</>
	);
}
