import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ExerciseItemProps = {
  exercise: string;
  series: number;
  repetitions: number;
};

export default function ExerciseItem({ exercise, series, repetitions }: ExerciseItemProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{exercise}</Text>
      <Text style={styles.cell}>{series}</Text>
      <Text style={styles.cell}>{repetitions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
