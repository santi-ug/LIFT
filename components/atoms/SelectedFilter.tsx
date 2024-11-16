import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface SelectedFilterProps {
    filters: string[]; 
    onRemove: (filter: string) => void; 
}

const SelectedFilters: React.FC<SelectedFilterProps> = ({ filters, onRemove }) => {
    return (
        <View className="flex-row flex-wrap mb-4">
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter}
                    onPress={() => onRemove(filter)} 
                    className="py-2 px-4 my-2 mx-1 rounded-md items-center bg-gray-700"
                >
                    <Text className="text-white capitalize font-normal text-sm">{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SelectedFilters;