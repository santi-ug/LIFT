import CustomButton from "../../components/atoms/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert } from "react-native";
import { registerScheme } from "../../schemes/registerScheme";
import FormField from "../../components/atoms/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../lib/api_backend";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  AppleIcon,
  EmailIcon,
  PasswordIcon,
  UserIcon,
} from "../../components/atoms/icons";

export default function Register() {
	const [isSubmittingApple, setIsSubmittingApple] = useState(false);
	const { 
		control, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(registerScheme),
	});

	const submitApple = async () => {};

	const onError = (errors: any) => {
		if (Object.keys(errors).length > 0) {
			Object.values(errors).forEach((error) => {
				if (error && typeof error === "object" && "message" in error) {
					Alert.alert("Error", error.message as string);
				}
			});
		}
	};

	const onSubmit = async (data: any) => {

		try {
			const response = await registerUser({
				email: data.email,
				name: data.name,
				password: data.password,
			});

			if (response.success) {
				Alert.alert("Success", "Registration successful!");
				router.push("/profile");
			} else {
				const errorMessage = response.message || "Unknown error occurred";
				Alert.alert("Error", errorMessage);
			}
		} catch (error) {
			Alert.alert("Error", "An error occurred during registration.");
			console.error(error);
		}
	};

  	return (
		<SafeAreaView className='bg-background h-full'>
			<ScrollView>

				<View className='w-full justify-center min-h-[90vh] px-8 my-6'>
					
					<Text className='text-4xl text-white'>
						Sign up with LIFT.
					</Text>

					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<FormField
								icon={EmailIcon}
								title="Email"
								placeholder="Email"
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
								placeholder="Username"
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

					<View className='justify-center pt-4 flex-row gap-2 my-2'>
						<Text className='text-white text-center text-xs'>
						By signing up, you're agreeing to our{" "}
						<Text className='text-primary'>Terms & Conditions</Text> 
						and{" "}
						<Text className='text-primary'>Privacy Policy</Text>.
						</Text>
					</View>

					<CustomButton
						title="Continue"
						handlePress={handleSubmit(onSubmit, onError)} 
						onSubmit={onSubmit}
						containerStyles="mt-6"
						isLoading={isSubmitting}
					/>

					<View className='w-full justify-center items-center mt-7 flex-row'>
						<View className='flex-1 bg-white h-px ml-1'></View>
						<Text className='text-white mx-4'>OR</Text>
						<View className='flex-1 bg-white h-px mr-1'></View>
					</View>

					<CustomButton
						title='Sign up with Apple ID'
						icon={AppleIcon}
						handlePress={submitApple}
						containerStyles='mt-6 !bg-white'
						textStyles='!text-black'
						isLoading={isSubmittingApple}
					/>

					<View className='justify-center pt-7 flex-row gap-2'>
						<Text className='text-white text-center'>Joined us before?</Text>
						<Link href='/login' className='text-primary'>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
  	);
}