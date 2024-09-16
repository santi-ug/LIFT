import CustomButton from "../../components/atoms/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert } from "react-native";
import FormField from "../../components/atoms/FormField";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
	AppleIcon,
	EmailIcon,
	// GoogleIcon,
	PasswordIcon,
} from "../../components/atoms/icons";

export default function login() {
	const [isSubmittingApple, setIsSubmittingApple] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const submit = () => {
		const { email, password } = form;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)){
			Alert.alert("Error", "Please enter a valid email.");
			return;
		}

		if (password.length < 8) {
			Alert.alert("Error", "Password must be at least 6 characters long.");
			return;
		}

		setIsSubmitting(true);
		router.push("/profile")
	};

	return (
		<>
			<SafeAreaView className='bg-background h-full'>
				<ScrollView>

					<View className='w-full justify-center min-h-[90vh] px-8 my-6'>
						<Text className='text-4xl text-white font-ibold'>
							Login to LIFT.
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
							icon={PasswordIcon}
							title='Password'
							placeholder='Password'
							value={form.password}
							handleChangeText={(e) => setForm({ ...form, password: e })}
							otherStyles='mt-7'
						/>

						<View className='justify-end pt-4 flex-row gap-2'>
							<Link
								href='/forgot-password'
								className='text-primary text-sm font-isemibold'
							>
								Forgot password?
							</Link>
						</View>

						<CustomButton
							title='Login'
							handlePress={submit}
							containerStyles='mt-6'
							isLoading={isSubmitting}
						/>

						<View className='w-full justify-center items-center mt-7 flex-row'>
							<View className='flex-1 bg-white h-px ml-1'></View>
							<Text className='text-white text mx-4 '>OR</Text>
							<View className='flex-1 bg-white h-px mr-1'></View>
						</View>

						<CustomButton
							title='Login with Apple ID'
							icon={AppleIcon}
							handlePress={submit}
							containerStyles='mt-6 !bg-white'
							textStyles='!text-black'
							isLoading={isSubmittingApple}
						/>

						{/* NO GOOGLE ICON YET SO NOT BEING USED */}
						{/* <CustomButton
							title='Login with Google'
							icon={GoogleIcon}
							handlePress={submit}
							containerStyles='mt-6 !bg-white'
							textStyles='!text-black'
							isLoading={isSubmiting}
						/> */}

						<View className=' justify-center pt-7 flex-row gap-2'>
							<Text className='text-white text-center'>New to LIFT?</Text>
							<Link href='/register' className='text-primary font-isemibold'>
								Register
							</Link>
						</View>
					</View>

				</ScrollView>
			</SafeAreaView>

			{/* <Login /> */}
		</>
	);
}
