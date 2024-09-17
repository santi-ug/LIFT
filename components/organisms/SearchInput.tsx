import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { FilterIcon, MagnifyingGlassIcon, ThreeDotsVerticarIcon } from '../atoms/icons';

export default function SearchInput() {
  const [text, setText] = useState('');

  return (
    <View>
      <View className="flex-row justify-evenly items-center h-1/10 bg-background">
        <TextInput
          className="h-10 my-3 border-search text-search border-2 px-4 w-9/12 rounded-full bg-background"
          onChangeText={setText}
          value={text}
          placeholder="Search"
          placeholderTextColor="#A0AEC0" 
        />
        <MagnifyingGlassIcon/>
        <FilterIcon/> 
        <ThreeDotsVerticarIcon/>
      </View>
      <Text className='font-isemibold text-2xl text-white py-3 pl-3'>Exercises</Text>
    </View>
  );
}
