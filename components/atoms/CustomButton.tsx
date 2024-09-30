import React from "react";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

interface CustomButtonProps {
	title: string;
	icon?: React.ElementType;
	handlePress: () => void;
	iconColor?: string;
	containerStyles?: string; // Optional container styles
	textStyles?: string; // Optional text styles
	isLoading?: boolean; // Loading state is optional
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	icon: IconComponent,
	handlePress,
	containerStyles,
	textStyles,
	iconColor,
	isLoading = false, // Default to false if not provided
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-primary rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
			disabled={isLoading}
		>
			<View className='flex-row items-center justify-center gap-x-3'>
				{IconComponent && <IconComponent color={iconColor}/>}
				<Text className={`text-white font-isemibold text-sm ${textStyles}`}>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;
