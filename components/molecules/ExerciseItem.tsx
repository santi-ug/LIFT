import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TrendLineIcon } from "../../components/atoms/icons"; 
import CircleButton from '../atoms/CirculeButton';
import React from 'react';

type ExerciseItemProps = {
  name: string;
  gifUrl: string;
  bodyPart: string;
  onPress: () => void;
};

export default function ExerciseItem({ name, gifUrl, bodyPart, onPress }: ExerciseItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="relative p-2 flex-row items-center">
        
        <View className="w-14 h-14 rounded-full overflow-hidden">
          <Image 
            source={{ uri: gifUrl }} 
            className="w-full h-full" 
            alt={name}
          />
        </View>

        <View className="flex-1 pl-4"> 
          <Text className="text-white font-imedium text-base capitalize pb-1 pr-12">{name}</Text>
          <Text className="text-gray-400 font-iregular capitalize">{bodyPart}</Text>
        </View>

        <View className="absolute top-0 right-0 mt-7 mr-4">
          <CircleButton
            icon={TrendLineIcon}
            onPress={onPress}
            containerStyle='w-6 h-6 rounded-full border-2 border-white'
          />
        </View>
        
      </View>
    </TouchableOpacity>
  );
}
