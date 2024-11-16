import { View, Text, ScrollView } from 'react-native';
import FormField from '../../components/atoms/FormField';
import { useState } from 'react';
import CustomButton from '../../components/atoms/CustomButton';
import { router } from 'expo-router';
import { useSelectedExercisesStore } from '../../storage/selectedExerciseStorage';

export default function NewRoutine() {
  const [title, setTitle] = useState('');
  const { selectedExercises } = useSelectedExercisesStore(); 

  return (
    <View className="flex-1 bg-background">

      <FormField
        title="Routine Title"
        placeholder="Routine Title"
        value={title}
        handleChangeText={setTitle}
        otherStyles="mt-5 pl-10"
        otherStylesText="text-3xl"
        keyboardType="default"
      />

      <ScrollView>

        <View className="pl-12 pt-6">
          <Text className="text-white text-xl font-bold mt-5">Selected Exercises:</Text>

          {selectedExercises.length > 0 ? (
            selectedExercises.map((exercise, index) => (
              <View key={index} className="mt-4 p-3 border-b border-gray-600">
                <Text className="text-white text-lg">{exercise.name}</Text>
                <Text className="text-gray-400 text-sm">Body Part: {exercise.bodyPart}</Text>
                <Text className="text-gray-400 text-sm">Equipment: {exercise.equipment}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-400 mt-4">No exercises selected yet.</Text>
          )}

          <CustomButton 
            title="Add Exercise"
            handlePress={() => router.push({
              pathname: '/exercises',
              params: { fromRoutine: 'true' } 
            })}
            containerStyles="w-10/12 mt-16"
          />
        </View>

      </ScrollView>
    </View>
  );
}
