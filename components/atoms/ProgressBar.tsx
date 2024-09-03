import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View >
      <Text style={styles.label}>Tu perfil está {progress}% terminado</Text>
      <View >
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 14,
  },

  progress: {
    backgroundColor: '#ff8c52',
  },
});
