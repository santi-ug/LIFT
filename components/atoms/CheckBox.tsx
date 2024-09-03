import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

type CheckBoxProps = {
  label: string;
  onCheck: (checked: boolean) => void;
};

export default function CheckBox({ label, onCheck }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(!checked);
    onCheck(!checked);
  };

  return (
    <Pressable onPress={toggleCheck}> </Pressable>
  );
}
