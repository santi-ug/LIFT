import CustomButton from "../../components/atoms/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert, KeyboardAvoidingView } from "react-native";
import FormField from "../../components/atoms/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../lib/api_backend";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
	AppleIcon,
	EmailIcon,
	// GoogleIcon,
	PasswordIcon,
} from "../../components/atoms/icons";
import { loginScheme } from "../../schemes/loginScheme";
import NoticeModal from "../../components/organisms/NoticeModal";

export default function Login() {
	const [isSubmittingApple, setIsSubmittingApple] = useState(false);
	const [isNoticeVisible, setNoticeVisible] = useState(false);
    const [noticeContent, setNoticeContent] = useState({
        title: "",
        description: "",
		confirmButtonText: "",
		confirmButtonColor: "",
    }); 

	const { 
		control, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(loginScheme),
	});

	const submitApple = async () => {};

	const onError = (errors: any) => {
		if (Object.keys(errors).length > 0) {
			Object.values(errors).forEach((error) => {
				if (error && typeof error === "object" && "message" in error) {
					setNoticeContent({
                        title: "Error",
                        description: error.message as string,
						confirmButtonColor: "#dc2626",
						confirmButtonText: "Accept"
                    });

                    setNoticeVisible(true);
				}
			});
		}
	};

	const onSubmit = async (data: any) => {

		try {
			const response = await loginUser({
				email: data.email,
				password: data.password,
			});

			if (response.success) {
				setNoticeContent({
                    title: "Success",
                    description: "Login successful!",
					confirmButtonColor: "#4caf50",
					confirmButtonText: "Accept"
				});

                setNoticeVisible(true);
			} else {
				const errorMessage = response.message || "Unknown error occurred";
				setNoticeContent({
                    title: "Error",
                    description: errorMessage,
					confirmButtonColor: "#dc2626",
					confirmButtonText: "Accept"
                });

                setNoticeVisible(true);
			}
		} catch (error) {
			setNoticeContent({
                title: "Error",
                description: "An error occurred during login.",
				confirmButtonColor: "#dc2626",
				confirmButtonText: "Accept"
			});

            setNoticeVisible(true);
			console.error(error);
		}
	};

	return (
		<>
			<SafeAreaView className='bg-background h-full'>
				<KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={20} style={{ flex: 1 }}>
					<ScrollView>

						<View className='w-full justify-center min-h-[90vh] px-8 my-6'>
							<Text className='text-4xl text-white font-bold'>
								Login to LIFT.
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

							<View className='justify-end pt-4 flex-row gap-2'>
								<Link
									href='/forgot-password'
									className='text-primary text-sm'
								>
									Forgot password?
								</Link>
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
								<Text className='text-white text mx-4 '>OR</Text>
								<View className='flex-1 bg-white h-px mr-1'></View>
							</View>

							<CustomButton
								title='Login with Apple ID'
								icon={AppleIcon}
								handlePress={submitApple}
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
								<Link href='/register' className='text-primary'>
									Register
								</Link>
							</View>
						</View>

					</ScrollView>
				</KeyboardAvoidingView>

				<NoticeModal
					isVisible={isNoticeVisible}
					onClose={() => setNoticeVisible(false)}
					title={noticeContent.title}
					description={noticeContent.description}
					confirmButtonColor = {noticeContent.confirmButtonColor}
					confirmButtonText = {noticeContent.confirmButtonText}
					onConfirm={() => {
						setNoticeVisible(false);
						if (noticeContent.title === "Success") {
							router.push("/profile"); 
						}
					}}
				/>

			</SafeAreaView>

			{/* <Login /> */}
		</>
	);
}