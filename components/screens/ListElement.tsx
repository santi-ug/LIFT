import { getInfoExercises } from '../../lib/metacritic';
import { View, Text, ScrollView } from 'react-native';
import ExerciseTable from '../molecules/ExerciseTable';
import SearchInput from '../organisms/SearchInput';
import { Exercise } from '../../types/Exercise';
import { useEffect, useState } from 'react';

export default function ListElement() {
  const [lExercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    getInfoExercises().then((data: Exercise[]) => {
      setExercises(data);
    });
  }, []);

  // Convertir la lista de ejercicios
  const listExercises = lExercises.map(exercise => ({
    name: exercise.name,
    gifUrl: exercise.gifUrl,
    target: exercise.target,
  }));

  return (
    <View className="flex-1 bg-background">
      <SearchInput />
      <ScrollView>
        <ExerciseTable
          sectionTitle="Ejercicios Disponibles"
          exercises={listExercises}
        />
      </ScrollView>
    </View>
  );
}
