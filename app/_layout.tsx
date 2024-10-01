import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	ShareIcon,
	GearIcon,
	LogOutIcon,
	DeleteAccountIcon,
} from "../components/atoms/icons";
import { Modal } from "react-native";
import CustomModal from "../components/organisms/CustomModel";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [fontsLoaded, error] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
	});

	const LogOut = () => {};
	const deleteAccount = () => {};

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
								<TouchableOpacity className="ml-4"
									onPress={() => setModalVisible(true)}
								>
									<GearIcon />
								</TouchableOpacity>
							</View>
						),
					}} />

				{/* <Stack.Screen name='/search/[query]' options={{ headerShown: false }} /> */}
			</Stack>

			<CustomModal
				isVisible={isModalVisible}
				onClose={() => setModalVisible(false)}
				title="Account"
				buttons={[
				{
					text: 'Log out',
					icon: <LogOutIcon />,
					onPress: LogOut,
				},
				{
					text: 'Delete',
					icon: <DeleteAccountIcon />,
					onPress: deleteAccount,
				},
				]}
			/>
		</>
	);
}
