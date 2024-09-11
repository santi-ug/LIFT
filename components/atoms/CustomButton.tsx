import React from "react";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	ViewStyle,
} from "react-native";

interface CustomButtonProps {
	title: string;
	handlePress: () => void;
	containerStyles?: string; // Optional container styles
	textStyles?: string; // Optional text styles
	isLoading?: boolean; // Loading state is optional
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading = false, // Default to false if not provided
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-primary rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
			disabled={isLoading}
		>
			<Text className={`text-white font-isemibold text-xs ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
