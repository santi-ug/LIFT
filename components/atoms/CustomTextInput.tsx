import React from "react";
import { TextInput } from "react-native";

interface CustomTextInputProps {
	value: string;
	placeholder: string;
	handleChange: (text: string) => void;
	inputStyles?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
	value,
	placeholder,
	handleChange,
	inputStyles,
}) => {
	return (
		<TextInput
			className={inputStyles}
			placeholder={placeholder}
			placeholderTextColor='#646464'
			value={value}
			onChangeText={handleChange}
		/>
	);
};

export default CustomTextInput;
