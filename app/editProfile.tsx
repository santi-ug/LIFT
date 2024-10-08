import CustomButton from "../components/atoms/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert } from "react-native";
import FormField from "../components/atoms/FormField";
import { update } from "../lib/api_backend";
import { UserData } from "../types/Api";
import { router } from "expo-router";
import { useState } from "react";
import {
	EmailIcon,
	PasswordIcon,
	UserIcon,
} from "../components/atoms/icons";

export default function editProfile() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const submit = async () => {
		const { email, name, password, confirmPassword } = form;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email && !emailRegex.test(email)){
			Alert.alert("Error", "Please enter a valid email.");
			return;
		}

		if (password && password.length < 8) {
			Alert.alert("Error", "Password must be at least 8 characters long.");
			return;
		}

		if (password && password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match.");
			return;
		}

		if (name && name.length < 4){
			Alert.alert("Error", "Username must be at least 4 characters long.");
			return;
		}

        const updatedData: UserData = {};

        if (email) updatedData.email = email; // Agrega email solo si está definido
        if (name) updatedData.name = name; // Agrega nombre solo si está definido
        if (password) updatedData.password = password; // Agrega password solo si está definido

		setIsSubmitting(true);
		
		try {
			const response = await update(updatedData); 
			if (response.success) {
				Alert.alert("Success", "Profile updated successfully!");
                router.push("/profile");
			} else {
				const errorMessage = response.message || "Unknown error occurred";
      			Alert.alert("Error", errorMessage); 
			}
		} catch (error) {
			Alert.alert("Error", "An error occurred while updating the profile.");
			console.error(error); 
		} finally {
			setIsSubmitting(false); 
		}
	};

	return (
		<>
			<SafeAreaView className='bg-background h-full'>
				<ScrollView>

					<View className='w-full justify-center min-h-[90vh] px-8 pb-20'>
                        
                            <Text className='text-4xl text-white font-ibold'>
                                Edit profile in LIFT.
                            </Text>

                            <FormField
                                icon={EmailIcon}
                                title='Email'
                                placeholder='Email'
                                value={form.email}
                                handleChangeText={(e) => setForm({ ...form, email: e })}
                                otherStyles='mt-7'
                                keyboardType='email-address'
                            />
                            <FormField
                                icon={UserIcon}
                                title='Username'
                                placeholder='Username'
                                value={form.name}
                                handleChangeText={(e) => setForm({ ...form, name: e })}
                                otherStyles='mt-7'
                            />
                            <FormField
                                icon={PasswordIcon}
                                title='Password'
                                placeholder='Password'
                                value={form.password}
                                handleChangeText={(e) => setForm({ ...form, password: e })}
                                otherStyles='mt-7'
                            />
                            <FormField
                                icon={PasswordIcon}
                                title="Password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                                otherStyles="mt-7"
                            />

                            <View className="my-4">
                                <CustomButton
                                    title='Continue'
                                    handlePress={submit}
                                    containerStyles='mt-6'
                                    isLoading={isSubmitting}
                                />
                            </View>
                        
					</View>

				</ScrollView>
			</SafeAreaView>
		</>
	);
}
