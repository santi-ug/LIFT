import { View, TextInput } from 'react-native';
import { useState } from 'react';

export default function SearchInput() {
  const [text, setText] = useState('');

  return (
    <View className="flex-row justify-evenly items-center h-1/10 bg-black">
      <TextInput
        className="h-10 my-3 border px-4 w-9/12 rounded-full bg-white"
        onChangeText={setText}
        value={text}
        placeholder="Search"
      />
    </View>
  );
}
