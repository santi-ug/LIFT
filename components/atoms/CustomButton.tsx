import React from "react";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SubmitHandler, FieldValues, UseFormHandleSubmit } from "react-hook-form";

interface CustomButtonProps {
	title: string;
	icon?: React.ElementType;
	handlePress: (e?: React.BaseSyntheticEvent) => void | Promise<void>;  // Acepta cualquier función
	onSubmit?: SubmitHandler<FieldValues>;  // Opcional si se usa con react-hook-form
	iconColor?: string;
	containerStyles?: string; // Optional container styles
	textStyles?: string; // Optional text styles
	isLoading?: boolean; // Loading state is optional
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	icon: IconComponent,
	handlePress,
	onSubmit,
	containerStyles,
	textStyles,
	iconColor,
	isLoading = false, // Default to false if not provided
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
				<Text className={`text-white font-semibold text-sm ${textStyles}`}>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;
