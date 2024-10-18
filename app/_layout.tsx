import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from "@react-navigation/stack"; // Importa StackNavigationProp
import { RootStackParamList } from "../types/Rutas";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation

import * as SplashScreen from 'expo-splash-screen';
import CustomModal from "../components/organisms/CustomModel";
import { TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import {
	ShareIcon,
	GearIcon,
	LogOutIcon,
	DeleteAccountIcon,
	EditIcon,
	CheckIcon,
	CancelIcon,
} from "../components/atoms/icons";
import { logout } from "../lib/api_backend";

import App from './index';
import AuthLayout from './(auth)/_layout';
import TabsLayout from './(tabs)/_layout';
import EditProfile from './editProfile';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [isModalVisible, setModalVisible] = useState(false);
	const [fontsLoaded, error] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
	});

	const LogOut = async () => {
		await logout();

		setModalVisible(false);
		navigation.navigate("index")
	};

	const deleteAccount = () => {};
	
	const updateAccount = () => {
		
		setModalVisible(false);
		navigation.navigate("editProfile")
	};

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={App}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="(auth)"
                    component={AuthLayout}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="editProfile"
                    component={EditProfile}
                    options={{
                        headerTitle: "Edit Profile",
                        headerStyle: { backgroundColor: '#171328' },
                        headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
                        headerTintColor: '#fff',
                        headerLeft: () => (
                            <View style={{ flexDirection: 'row', marginRight: 8 }}>
                                <TouchableOpacity
                                    style={{ marginLeft: 16 }}
                                    onPress={() => navigation.navigate("(tabs)")}
                                >
                                    <CancelIcon />
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />

                <Stack.Screen
                    name="(tabs)"
                    component={TabsLayout}
                    options={{
                        headerTitle: "Edit Profile",
                        headerStyle: { backgroundColor: '#171328' },
                        headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
                        headerTintColor: '#fff',
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 8 }}>
                                <ShareIcon />
                                <TouchableOpacity
                                    style={{ marginLeft: 16 }}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <GearIcon />
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
            </Stack.Navigator>

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