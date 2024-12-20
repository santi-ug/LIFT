import { getInfoExercises, getInfoExercisesbyBodyPart, getInfoExercisesbyEquipment, getInfoExercisesbyName } from '../../lib/rapidapi'; 
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Exercise, ListElementProps } from '../../types/exercise';
import { useSearchStore } from '../../storage/searchStorage';
import ExerciseItem from '../molecules/ExerciseItem';
import SearchInput from '../organisms/SearchInput';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import React from "react";
import { useSelectedExercisesStore } from '../../storage/selectedExerciseStorage';

export default function ListElement({ selectedEquipments, selectedBodyParts, fromRoutine }: ListElementProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { searchText } = useSearchStore(); 
  const { addExercise } = useSelectedExercisesStore();

  const getInfoExercises_ = async (
    limit: number,
    offset: number,
    equipments?: string[],
    bodyParts?: string[]   
  ) => {
    if (equipments && equipments.length > 0 && bodyParts && bodyParts.length > 0) {
      const exercisesFromEquipments = await Promise.all(
        equipments.map((equipment) => getInfoExercisesbyEquipment(equipment, limit, offset))
      );
    
      const exercisesFromBodyParts = await Promise.all(
        bodyParts.map((bodyPart) => getInfoExercisesbyBodyPart(bodyPart, limit, offset))
      );
    
      return [...exercisesFromEquipments.flat(), ...exercisesFromBodyParts.flat()];
    
    } else if (equipments && equipments.length > 0) {

      const exercises = await Promise.all(
        equipments.map((equipment) => getInfoExercisesbyEquipment(equipment, limit, offset))
      );
      return exercises.flat();

    } else if (bodyParts && bodyParts.length > 0) {

      const exercises = await Promise.all(
        bodyParts.map((bodyPart) => getInfoExercisesbyBodyPart(bodyPart, limit, offset))
      );
      return exercises.flat();
      
    } else if (searchText && searchText.length > 0) {
      return getInfoExercisesbyName(limit, offset, searchText); 
    } else {
      return getInfoExercises(limit, offset);
    }
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
      onPress={() => {
        if (fromRoutine) {
          addExercise(item);
          router.back(); 
        } else {
          router.push({
            pathname: '/exerciseDetail',
            params: {
              name: item.name,
              gifUrl: item.gifUrl,
              bodyPart: item.bodyPart,
              instructions: item.instructions,
              equipment: item.equipment,
            },
          });
        }
      }}
    />
  );

  const renderSection = ({ sectionKey, data }: { sectionKey: string, data: Exercise[] }) => (
    <View key={sectionKey}>
      <Text className='text-base text-white font-medium ml-6 mt-4 mb-2'>{sectionKey}</Text>
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