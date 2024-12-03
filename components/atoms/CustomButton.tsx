import React from "react";
import {
	FieldValues,
	SubmitHandler,
	UseFormHandleSubmit,
} from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
	title: string;
	icon?: React.ElementType;
	handlePress: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
	onSubmit?: SubmitHandler<FieldValues>; // Opcional si se usa con react-hook-form
	iconColor?: string;
	containerStyles?: string;
	textStyles?: string;
	isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	icon: IconComponent,
	handlePress,
	onSubmit,
	containerStyles,
	textStyles,
	iconColor,
	isLoading = false,
}) => {
	return (
		<TouchableOpacity
			onPress={() => handlePress()}
			activeOpacity={0.7}
			className={`bg-primary rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
			disabled={isLoading}
		>
			<View className='flex-row items-center justify-center gap-x-3'>
				{IconComponent && <IconComponent color={iconColor} />}
				<Text className={`text-white text-sm ${textStyles}`}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;
