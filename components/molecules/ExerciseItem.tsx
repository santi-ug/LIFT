import React from 'react';
import { View, Text, Image } from 'react-native';

type ExerciseItemProps = {
  name: string;
  gifUrl: string;
  target: string;
};

export default function ExerciseItem({ name, gifUrl, target }: ExerciseItemProps) {
  return (
    <View className="flex-row p-2">
     
      <Image 
        source={{ uri: gifUrl }} 
        className="w-48 h-48 rounded-lg"
        alt={name}
      />
      <View className="flex-1 justify-center items-center">
        <Text className="text-center text-white">{name}</Text>
        <Text className="text-center text-white">{target}</Text>
      </View>

    </View>
  );
}
