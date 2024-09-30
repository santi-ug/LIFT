import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

interface DropdownProps {
    options: { label: string; value: string }[]; 
    placeholder?: string; 
    value: string | null; 
    otherStyles?: string; 
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    value,
    otherStyles,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(null);
    return (
        <View className={`space-y-2 ml-14 w-5/12 ${otherStyles}`}>
            <View className='w-full'>
                <RNPickerSelect
                    placeholder={{ label: placeholder, value: null }}
                    items={options}
                    onValueChange={(value) => setSelectedValue(value)}
                    value={value}
                    style={{
                        inputIOS: { color: "#5F48D9" },
                        inputAndroid: { color: "#5F48D9" },
                        placeholder: { color: "#5F48D9" },
                    }}
                    {...props}
                />
            </View>
        </View>
    );
};

export default Dropdown;
