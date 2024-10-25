import React from "react";
import { View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

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
            <View className='w-full'>
                <RNPickerSelect
                    placeholder={{ label: placeholder, value: null }}
                    onValueChange={(value) => setValue(value)}  
                    items={options}
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
