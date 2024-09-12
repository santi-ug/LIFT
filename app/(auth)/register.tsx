import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/atoms/CustomButton";
import FormField from "../../components/atoms/FormField";
import {
	AppleIcon,
	EmailIcon,
	// GoogleIcon,
	PasswordIcon,
	UserIcon,
} from "../../components/atoms/icons";
import Login from "../../components/screens/Login";

export default function register() {
	const [form, setForm] = useState({
		email: "",
		username: "",
		password: "",
	});
	const [isSubmiting, setIsSubmiting] = useState(false);

	const submit = () => {};

	return (
		<>
			<SafeAreaView className='bg-background h-full'>
				<ScrollView>
					<View className='w-full justify-center min-h-[90vh] px-8 my-6'>
						<Text className='text-4xl text-white font-ibold'>
							Sign up with LIFT.
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
							value={form.username}
							handleChangeText={(e) => setForm({ ...form, username: e })}
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

						<View className='justify-center pt-4 flex-row gap-2 my-2'>
							<Text className='text-white text-center text-xs'>
								By signing up, you're agreeing to our {""}
								<Text className='text-primary font-isemibold'>
									Terms & Conditions
								</Text>{" "}
								and{" "}
								<Text className='text-primary font-isemibold'>
									Privacy Policy
								</Text>
							</Text>
						</View>

						<CustomButton
							title='Continue'
							handlePress={submit}
							containerStyles='mt-6'
							isLoading={isSubmiting}
						/>

						<View className='w-full justify-center items-center mt-7 flex-row'>
							<View className='flex-1 bg-white h-px ml-1'></View>
							<Text className='text-white text mx-4 '>OR</Text>
							<View className='flex-1 bg-white h-px mr-1'></View>
						</View>

						<CustomButton
							title='Sign up with Apple ID'
							icon={AppleIcon}
							handlePress={submit}
							containerStyles='mt-6 !bg-white'
							textStyles='!text-black'
							isLoading={isSubmiting}
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
							<Text className='text-white text-center'>Joined us before?</Text>
							<Link href='/login' className='text-primary font-isemibold'>
								Login
							</Link>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
			{/* <Login /> */}
		</>
	);
}
