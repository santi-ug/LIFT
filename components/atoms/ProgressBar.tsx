import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowRightIcon } from './icons';

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View className='bg-gray-500 px-3 mx-4 rounded-xl py-4 flex-row'>
      <Text className='text-base text-white font-imedium'>Your profile is {progress}% finished</Text>

      <View className='absolute top-0 right-0 mt-4 mr-4'>
        <ArrowRightIcon/>
      </View>

    </View>
  );
}

