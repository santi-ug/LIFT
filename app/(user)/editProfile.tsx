import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import { editUserScheme } from "../../schemes/editUserScheme";
import { useUserStore } from "../../storage/userStorage";
import FormField from "../../components/atoms/FormField";
import { infoUser, update } from "../../lib/api_backend";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserData } from "../../types/Api";
import { router } from "expo-router";
import React from "react";
import {
	EmailIcon,
	PasswordIcon,
	UserIcon,
} from "../../components/atoms/icons";

export default function editProfile() {
	const { userData } = useUserStore(); 
	const { 
		control, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(editUserScheme),
	});

	const onError = (errors: any) => {
		if (Object.keys(errors).length > 0) {
			Object.values(errors).forEach((error) => {
				if (error && typeof error === "object" && "message" in error) {
					Alert.alert("Error e", error.message as string);
				}
			});
		}
	};

	const onSubmit = async (data: any) => {

        const updatedData: UserData = {};

        if (data.email) updatedData.email = data.email; 
        if (data.name) updatedData.name = data.name; 
        if (data.password) updatedData.password = data.password; 
		
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
		} 
	};

	return (
		<>
			<SafeAreaView className='bg-background h-full'>
				<ScrollView>

					<View className='w-full justify-center min-h-[90vh] px-8 pb-20'>
                        
						<Text className='text-4xl text-white font-bold'>
							Edit profile in LIFT.
						</Text>

						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
								<FormField
									icon={EmailIcon}
									title="Email"
									placeholder={userData?.email || "Email"}
									value={value}
									handleChangeText={onChange}
									otherStyles="mt-7"
									keyboardType="email-address"
								/>
							)}
						/>

						<Controller
							control={control}
							name="name"
							render={({ field: { onChange, value } }) => (
								<FormField
									icon={UserIcon}
									title="Username"
									placeholder={userData?.name || "Username"}
									value={value}
									handleChangeText={onChange}
									otherStyles="mt-7"
								/>
							)}
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value } }) => (
								<FormField
									icon={PasswordIcon}
									title="Password"
									placeholder="Password"
									value={value}
									handleChangeText={onChange}
									otherStyles="mt-7"
								/>
							)}
						/>
						<Controller
							control={control}
							name="confirmPassword"
							render={({ field: { onChange, value } }) => (
								<FormField
									icon={PasswordIcon}
									title="Password"
									placeholder="Confirm Password"
									value={value}
									handleChangeText={onChange}
									otherStyles="mt-7"
								/>
							)}
						/>

						<View className="my-4">
							<CustomButton
								title='Continue'
								handlePress={handleSubmit(onSubmit, onError)} 
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