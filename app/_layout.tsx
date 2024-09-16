import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

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
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				{/* <Stack.Screen name='/search/[query]' options={{ headerShown: false }} /> */}
			</Stack>
		</>
	);
}
