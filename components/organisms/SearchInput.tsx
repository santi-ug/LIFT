import { FilterIcon, MagnifyingGlassIcon, ThreeDotsVerticarIcon } from '../atoms/icons';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useSearchStore } from '../../storage/searchStorage';
import { router } from 'expo-router';
import  React, { useEffect, useState } from 'react';
import NoticeModal from './NoticeModal';

export default function SearchInput() {
  const [localText, setLocalText] = useState('');
  const { searchText, setSearchText } = useSearchStore();
  const [isNoticeVisible, setNoticeVisible] = useState(false);
    const [noticeContent, setNoticeContent] = useState({
        title: "",
        description: "",
		confirmButtonText: "",
		confirmButtonColor: "",
    }); 

  const handleSearch = () => {
    if (localText.trim() !== '') {
      setSearchText(localText.toLowerCase());
      router.replace("/exercises");
    } else {
      setSearchText('');
      setNoticeContent({
        title: "Error",
        description: "Please enter a search term",
        confirmButtonColor: "#dc2626",
        confirmButtonText: "Accept"
      });

      setNoticeVisible(true);
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
      <Text className='font-semibold text-2xl text-white py-3 pl-3'>Exercises</Text>
    
      <NoticeModal
        isVisible={isNoticeVisible}
        onClose={() => setNoticeVisible(false)}
        title={noticeContent.title}
        description={noticeContent.description}
        confirmButtonColor = {noticeContent.confirmButtonColor}
        confirmButtonText = {noticeContent.confirmButtonText}
        onConfirm={() => {
          setNoticeVisible(false);
          if (noticeContent.title === "Success") {
            router.push("/profile"); 
          }
        }}
			/>
    
    </View> 
  );
}