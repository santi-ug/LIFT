import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownProps {
    options: { label: string; value: string }[];
    placeholder?: string;
    value: string | null;
    otherStyles?: string;
    setValue: (value: string | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    value,
    setValue,
    otherStyles,
    ...props
}) => {
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Picker
                selectedValue={value}
                onValueChange={(value) => setValue(value)}
                style={{ color: "#5F48D9" }}
                {...props}
            >
                {placeholder && <Picker.Item label={placeholder} value={null} />}
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
            </Picker>
        </View>
    );
};

export default Dropdown;
