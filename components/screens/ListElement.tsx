import { getInfoExercises, getInfoExercisesbyBodyPart, getInfoExercisesbyEquipment, getInfoExercisesbyName } from '../../lib/rapidapi'; 
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Exercise, ListElementProps } from '../../types/exercise';
import { useSearchStore } from '../../storage/searchStorage';
import ExerciseItem from '../molecules/ExerciseItem';
import SearchInput from '../organisms/SearchInput';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import React from "react";

export default function ListElement({ selectedEquipments, selectedBodyParts }: ListElementProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { searchText } = useSearchStore(); 

  const getInfoExercises_ = async (
    limit: number,
    offset: number,
    equipments?: string[],
    bodyParts?: string[]
  ) => {
    if (searchText && searchText.length > 0) {
      const exercisesByName = await getInfoExercisesbyName(limit, offset, searchText);
  
      if (equipments && equipments.length > 0 || bodyParts && bodyParts.length > 0) {
        const filteredExercises = await getFilteredExercises(limit, offset, equipments, bodyParts);
        return mergeUniqueExercises(exercisesByName, filteredExercises);
      }
  
      return exercisesByName;
    }
  
    if (equipments && equipments.length > 0 || bodyParts && bodyParts.length > 0) {
      return getFilteredExercises(limit, offset, equipments, bodyParts);
    }
  
    return getInfoExercises(limit, offset);
  };
  
  const getFilteredExercises = async (
    limit: number,
    offset: number,
    equipments?: string[],
    bodyParts?: string[]
  ) => {
    const exercisesFromEquipments = equipments && equipments.length > 0
      ? await Promise.all(equipments.map((equipment) => getInfoExercisesbyEquipment(equipment, limit, offset)))
      : [];
    
    const exercisesFromBodyParts = bodyParts && bodyParts.length > 0
      ? await Promise.all(bodyParts.map((bodyPart) => getInfoExercisesbyBodyPart(bodyPart, limit, offset)))
      : [];
  
    return [...exercisesFromEquipments.flat(), ...exercisesFromBodyParts.flat()];
  };
  
  const mergeUniqueExercises = (
    list1: Exercise[], 
    list2: Exercise[]
  ) => {
    const merged = [...list1, ...list2];
    const unique = new Map(); 

    merged.forEach((exercise) => {
      unique.set(exercise.id, exercise); 
    });

    return Array.from(unique.values());
  };
  

  const fetchExercises = async () => {
    setLoading(true);

    try {
      const limit = 10;
      const offset = (currentPage - 1) * limit;
      const newExercises = await getInfoExercises_(limit, offset, selectedEquipments, selectedBodyParts);

      if (newExercises.length > 0) {
        if (currentPage === 1) {
          setExercises(newExercises);  
        } else {
          setExercises(prevExercises => [...prevExercises, ...newExercises]);  
        }
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); 
    fetchExercises();
  }, [searchText]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchExercises();
    }
  }, [currentPage]);

  const groupedExercises = exercises.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as { [key: string]: Exercise[] });

  const renderItem = ({ item, index }: { item: Exercise, index: number }) => (
    <ExerciseItem 
      key={index}
      name={item.name}
      gifUrl={item.gifUrl}
      bodyPart={item.bodyPart}
      onPress={() => router.push({
        pathname: '/exerciseDetail',
        params: { 
          name: item.name,
          gifUrl: item.gifUrl,
          bodyPart: item.bodyPart,
          instructions: item.instructions,
          equipment: item.equipment
        }
      })}
    />
  );

  const renderSection = ({ sectionKey, data }: { sectionKey: string, data: Exercise[] }) => (
    <View key={sectionKey}>
      <Text className='text-base text-white font-imedium ml-6 mt-4 mb-2'>{sectionKey}</Text>
      {data.map((exercise, index) => renderItem({ item: exercise, index }))}
    </View>
  );

  const renderLoader = () => {
    return loading ? (
      <View className="p-4 items-center">
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItems = () => {
    if (hasMore && !loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <SearchInput />
      <FlatList
        key={searchText}
        data={Object.keys(groupedExercises)}
        renderItem={({ item }) => renderSection({ sectionKey: item, data: groupedExercises[item] })}
        keyExtractor={item => item}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}