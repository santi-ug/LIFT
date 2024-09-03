import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseItem from '../atoms/ExerciseItem';

type ExerciseTableProps = {
  sectionTitle: string;
  exercises: { exercise: string; series: number; repetitions: number }[];
};

export default function ExerciseTable({ sectionTitle, exercises }: ExerciseTableProps) {
  return (
    <View style={styles.container}>
        <text>{sectionTitle}</text>
        {exercises.map((item, index) => (
            <ExerciseItem 
                key={index}
                exercise={item.exercise}
                series={item.series}
                repetitions={item.repetitions}
            />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
