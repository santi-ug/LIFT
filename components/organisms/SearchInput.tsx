import { FilterIcon, MagnifyingGlassIcon, ThreeDotsVerticarIcon } from '../atoms/icons';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useSearchStore } from '../../app/storage/searchStorage';
import { router } from 'expo-router';
import  React, { useEffect, useState } from 'react';

export default function SearchInput() {
  const [localText, setLocalText] = useState('');
  const { searchText, setSearchText } = useSearchStore();

  const handleSearch = () => {
    if (localText.trim() !== '') {
      setSearchText(localText.toLowerCase());
      router.replace("/exercises");
    } else {
      setSearchText('');
      Alert.alert("Please enter a search term");
    }
  };

  return (
    <View>
      <View className="flex-row justify-evenly items-center h-1/10 bg-background">
        <TextInput
          className="h-10 my-3 border-search text-search border-2 px-4 w-9/12 rounded-full bg-background"
          onChangeText={setLocalText}
          value={localText}
          placeholder="Search"
          placeholderTextColor="#A0AEC0" 
        />
        
        <TouchableOpacity onPress={handleSearch}>
          <MagnifyingGlassIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/exerciseFilter")} 
        >
          <FilterIcon/> 
        </TouchableOpacity>

        <ThreeDotsVerticarIcon/>
      </View>
      <Text className='font-isemibold text-2xl text-white py-3 pl-3'>Exercises</Text>
    </View>
  );
}