import CustomModal from "../components/organisms/CustomModel";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import {
    ShareIcon,
    GearIcon,
    LogOutIcon,
    DeleteAccountIcon,
    EditIcon,
    CancelIcon,
} from "../components/atoms/icons";
import { deleteUser , logout } from "../lib/api_backend";

export default function Layout() {
    const [isModalVisible, setModalVisible] = useState(false);
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
        await deleteUser ();
        setModalVisible(false);
        router.push("/");
    };

    const updateAccount = () => {
        setModalVisible(false);
        router.push("/editProfile");
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Muestra un indicador de carga
    }

    return (
        <>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />

                <Stack.Screen name='editProfile' options={{
                    headerTitle: "Edit Profile",
                    headerStyle: { backgroundColor: '#171328' },
                    headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
                    headerTintColor: '#fff',
                    headerBackVisible: false,
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
                    headerStyle: { backgroundColor: '#171328' },
                    headerTitleStyle: { fontSize: 18, color: "#5F48D9" },
                    headerTintColor: '#fff',
                    headerBackVisible: false,
                    headerLeft: () => (
                        <View className="flex-row mr-2 ">
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
                    headerStyle: { backgroundColor: '#171328' },
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