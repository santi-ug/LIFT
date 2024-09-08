import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Game } from '../../types/exercise'

type ExerciseItemProps = {
  exercise: Game
};

export default function ExerciseItem({ exercise}: ExerciseItemProps) {
  return (
    <View style={styles.row}>
      <Image style={styles.cell} source={{uri: exercise.image}}/>
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
