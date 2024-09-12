import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { PasswordNoVisibleIcon, PasswordVisibleIcon } from "../atoms/icons";

interface FormFieldProps {
	icon?: React.ElementType;
	title: string;
	value: string;
	placeholder?: string;
	handleChangeText: (e: string) => void;
	otherStyles?: string;
	keyboardType?: string;
}

const FormField: React.FC<FormFieldProps> = ({
	icon: IconComponent,
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	keyboardType,
	...props
}) => {
	const [showPassword, setshowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			{/* <Text className='text-base text-gray-100 font-imedium'>{title}</Text> */}

			<View className='w-full space-x-5 h-14 items-center justify-start flex-row'>
				{IconComponent && <IconComponent color='white' />}
				<View className=' w-[85%] items-center flex-row m-0 p-0 h-12 border-b border-white focus:border-primary'>
					<TextInput
						className='flex-1 text-white font-isemibold text-sm placeholder:font-imedium'
						value={value}
						placeholder={placeholder}
						placeholderTextColor='#E5E4ED'
						onChangeText={handleChangeText}
						secureTextEntry={title === "Password" && !showPassword}
					/>

					{title === "Password" && (
						<TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
							{showPassword ? (
								<PasswordNoVisibleIcon color='white' />
							) : (
								<PasswordVisibleIcon color='white' />
							)}
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

export default FormField;
