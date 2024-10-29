import CustomModal from "../components/organisms/CustomModel";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import React from "react";
import {
	ShareIcon,
	GearIcon,
	LogOutIcon,
	DeleteAccountIcon,
	EditIcon,
	CancelIcon,
} from "../components/atoms/icons";
import { deleteUser, logout } from "../lib/api_backend";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [fontsLoaded, error] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
	});

	const router = useRouter();

	const LogOut = async () => {
		await logout();

		setModalVisible(false);
		router.push("/");
	};

	const deleteAccount = async () => {
		await deleteUser();

		setModalVisible(false);
		router.push("/");
	};
	
	const updateAccount = () => {
		
		setModalVisible(false);
		router.push("/editProfile")
	};

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

				<Stack.Screen name='editProfile' options={{
						headerTitle: "Edit Profile",
						headerStyle: { backgroundColor: '#171328'},
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: '#fff',
						headerBackVisible: false, // Eliminar la flecha de retroceso
						headerLeft: () => (
							<View className="flex-row mr-2">
								<TouchableOpacity className="ml-4"
									onPress={() => router.push("/profile")}
								>
									<CancelIcon />
								</TouchableOpacity>
							</View>
						),
					}} />

                <Stack.Screen name='(exercise)' options={{
						headerTitle: "Exercise Details",
						headerStyle: { backgroundColor: '#171328'},
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: '#fff',
						headerBackVisible: false, 
						headerLeft: () => (
							<View className="flex-row mr-2">
								<TouchableOpacity
									onPress={() => router.push("/exercises")}
								>
									<CancelIcon />
								</TouchableOpacity>
							</View>
						),
					}} />
                    
				<Stack.Screen name='(tabs)' options={{
						headerTitle: "Edit Profile",
						headerStyle: { backgroundColor: '#171328'},
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: '#fff',
						headerBackVisible: false, 
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
				{
					text: 'Edit',
					icon: <EditIcon />,
					onPress: updateAccount,
				},
				]}
			/>
		</>
	);
}
