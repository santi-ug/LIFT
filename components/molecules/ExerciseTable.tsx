import React from 'react';
import { View, Text } from 'react-native';
import ExerciseItem from './ExerciseItem';

type ExerciseTableProps = {
  sectionTitle: string;
  exercises: { 
    name: string;
    gifUrl: string;
    target: string; 
  }[];
};

export default function ExerciseTable({ sectionTitle, exercises }: ExerciseTableProps) {
  return (

    <View className="mb-5">
      
      <Text className="text-xl font-bold mb-4">{sectionTitle}</Text>
      {exercises.map((item, index) => (
        <ExerciseItem 
          key={index}
          name={item.name}
          gifUrl={item.gifUrl}
          target={item.target}
        />
      ))}

    </View>
  );
}
