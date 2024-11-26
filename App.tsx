import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { usePushNotifications } from "./usePushNotifications";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import messaging from '@react-native-firebase/messaging';

// @ts-ignore
import home from "./assets/home.png";
import CustomButton from "./components/atoms/CustomButton";

export default function App() {
	const { expoPushToken, notification } = usePushNotifications();
	console.log(expoPushToken?.data);
	console.log(notification?.date)

	const requestUserPermission = async () =>  {
		const authStatus = await messaging().requestPermission();
		const enabled =
		  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		  authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	  
		if (enabled) {
		  console.log('Authorization status:', authStatus);
		}
	}

	useEffect(() => {
		requestUserPermission();

		messaging().getInitialNotification().then( async (remoteMessage:any) => {
			if (remoteMessage){
				console.log(
					'Notification caused app to open from quit state: ',
					remoteMessage.notification,
				); 
			}
		});

		messaging().onNotificationOpenedApp(async (remoteMessage:any) => {
			console.log(
				'Notification caused app to from background: ',
				remoteMessage.notification,
			); 
		}) 

		// Register background handler
		messaging().setBackgroundMessageHandler(async (remoteMessage:any) => {
			console.log('Message handled in the background!', remoteMessage);
		});

		const unsubscribe = messaging().onMessage(async (remoteMessage:any) => {
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});
	  
		return unsubscribe;  
	}, []);

	return (
		<>
			<Image source={home} className='w-full h-full bg-background ' />
			<SafeAreaView className='w-full h-full absolute'>

				<ScrollView contentContainerStyle={{ height: "100%" }}>

					<View className='w-full justify-center items-center min-h-[125vh] px-8'>
						<Text className='text-8xl text-white items-start'>
							LIFT.
						</Text>
						<Text className='text-white text-xs text-center'>
							Track workouts effortlessly, {"\n"} achieve progress with purpose.
						</Text>

						{/* Mostrar el token de notificación */}
						<Text> Token: {expoPushToken?.data || ""} </Text>

						{/* button */}
						<CustomButton
							title='GET STARTED'
							handlePress={() => router.push("/register")}
							containerStyles='w-full mt-16'
						/>
						{/* alrdy account link */}
						<View className='justify-center pt-5 flex-row gap-2'>
							<Text className='text-white '>Already have an account?</Text>
							<Link href='/login' className='text-primary'>
								Login
							</Link>
						</View>

						{/* TEMPORARY LINK TO GO TO MAIN SCREEN WHEN LOGGED IN -- NEW WORKOUT  */}
						<Link href='/profile' className='text-primary mt-5'>
							NEW WORKOUT [TEMP]
						</Link>
						
						
					</View>

				</ScrollView>
				<StatusBar style='light' />
				
			</SafeAreaView>
		</>
	);
}