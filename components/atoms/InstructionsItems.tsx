import React from 'react';
import { View, Text } from 'react-native';

interface InstructionsListProps {
  instructions: string | string[];
}

const InstructionsList: React.FC<InstructionsListProps> = ({ 
    instructions 
}) => {
    const instructionsArray = typeof instructions === 'string'
        ? instructions.split('.').map(instruction => instruction.trim().replace(/^,?\s*/, '')).filter(Boolean) 
        : instructions;

    return (
        <View className='px-1'>
            {instructionsArray.map((instruction: string, index: number) => (
                <View key={index} className='flex flex-row items-center py-1'>
                    <Text className='text-white text-base mr-2'>{index + 1}.</Text>
                    <Text className='text-white text-base flex-1'>{instruction}</Text>
                </View>
            ))}
        </View>
    );
}

export default InstructionsList;