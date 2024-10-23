import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GearIcon, ShareIcon } from "../components/atoms/icons";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [fontsLoaded, error] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
	});
	const [dbLoaded, setDbLoaded] = useState<boolean>(false);

	const loadDB = async () => {
		try {
			const dbName = "liftsqlite.db";
			const dbAsset = require(`../assets/db/${dbName}`);
			const dbUri = Asset.fromModule(dbAsset).uri;
			const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

			const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
			if (!fileInfo.exists) {
				await FileSystem.makeDirectoryAsync(
					FileSystem.documentDirectory + "SQLite",
					{
						intermediates: true,
					}
				);
				await FileSystem.downloadAsync(dbUri, dbFilePath);
			}

			// Set dbLoaded to true when the DB is ready
			setDbLoaded(true);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		loadDB()
			.then(() => setDbLoaded(true))
			.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded && dbLoaded) {
			SplashScreen.hideAsync();
		}

		if (!fontsLoaded && !error) return;
	}, [fontsLoaded, dbLoaded, error]);

	if (!dbLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
				<Text>Loading Database...</Text>
			</View>
		);
	}

	return (
		<>
			<Suspense>
				<SQLiteProvider databaseName='liftsqlite.db' useSuspense>
					<Stack>
						<Stack.Screen name='index' options={{ headerShown: false }} />
						<Stack.Screen name='(auth)' options={{ headerShown: false }} />
						<Stack.Screen
							name='(tabs)'
							options={{
								headerTitle: "Edit Profile",
								headerStyle: { backgroundColor: "#171328" },
								headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
								headerTintColor: "#fff",
								headerBackVisible: false,
								headerRight: () => (
									<View className='flex-row mr-2'>
										<ShareIcon />
										<View className='ml-4'>
											<GearIcon />
										</View>
									</View>
								),
							}}
						/>
					</Stack>
				</SQLiteProvider>
			</Suspense>
		</>
	);
}
