import { SplashScreen, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import {
	CancelIcon,
	DeleteAccountIcon,
	EditIcon,
	GearIcon,
	LogOutIcon,
	ShareIcon,
} from "../components/atoms/icons";
import CustomModal from "../components/organisms/CustomModel";
import NoticeModal from "../components/organisms/NoticeModal";
import { deleteUser, logout } from "../lib/api_backend";

export default function Layout() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const hideSplashScreen = async () => {
			await SplashScreen.preventAutoHideAsync();
			setLoading(false);
			await SplashScreen.hideAsync();
		};

		hideSplashScreen();
	}, []);

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
		router.push("/editProfile");
	};

	if (loading) {
		return <ActivityIndicator size='large' color='#0000ff' />; // Muestra un indicador de carga
	}

	return (
		<>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />

				<Stack.Screen
					name='(user)'
					options={{
						headerTitle: "LIFT",
						headerStyle: { backgroundColor: "#171328" },
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: "#fff",
						headerBackVisible: false,
						headerLeft: () => (
							<View className='flex-row mr-2'>
								<TouchableOpacity
									className='ml-4'
									onPress={() => router.push("/profile")}
								>
									<CancelIcon />
								</TouchableOpacity>
							</View>
						),
					}}
				/>

				<Stack.Screen
					name='(exercise)'
					options={{
						headerTitle: "Exercise Details",
						headerStyle: { backgroundColor: "#171328" },
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: "#fff",
						headerBackVisible: false,
						headerLeft: () => (
							<View className='flex-row mr-2 '>
								<TouchableOpacity onPress={() => router.push("/exercises")}>
									<CancelIcon />
								</TouchableOpacity>
							</View>
						),
					}}
				/>

				<Stack.Screen
					name='(workout)'
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name='(tabs)'
					options={{
						headerTitle: "LIFT",
						headerStyle: { backgroundColor: "#171328" },
						headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
						headerTintColor: "#fff",
						headerBackVisible: false,
						headerRight: () => (
							<View className='flex-row mr-2'>
								<ShareIcon />
								<TouchableOpacity
									className='ml-4'
									onPress={() => setModalVisible(true)}
								>
									<GearIcon />
								</TouchableOpacity>
							</View>
						),
					}}
				/>
			</Stack>

			<CustomModal
				isVisible={isModalVisible}
				onClose={() => setModalVisible(false)}
				title='Account'
				buttons={[
					{
						text: "Log out",
						icon: <LogOutIcon />,
						onPress: LogOut,
					},
					{
						text: "Delete",
						icon: <DeleteAccountIcon />,
						onPress: () => setDeleteModalVisible(true),
					},
					{
						text: "Edit",
						icon: <EditIcon />,
						onPress: updateAccount,
					},
				]}
			/>

			<NoticeModal
				isVisible={isDeleteModalVisible}
				onClose={() => setDeleteModalVisible(false)}
				title='Delete Account'
				description='This action is irreversible and will delete all your data. Please enter your password to continue.'
				confirmButtonColor='#dc2626'
				confirmButtonText='Delete Account'
				onConfirm={() => {
					deleteAccount();
					setDeleteModalVisible(false);
				}}
			/>
		</>
	);
}
