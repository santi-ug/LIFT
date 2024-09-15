import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import ExerciseItem from '../molecules/ExerciseItem';
import { getInfoExercises } from '../../lib/rapidapi';
import SearchInput from '../organisms/SearchInput';
import { Exercise } from '../../types/Exercise';
import { useEffect, useState } from 'react';

export default function ListElement() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const limit = 10;
      const offset = (currentPage - 1) * limit;
      const newExercises = await getInfoExercises(limit, offset);

      if (newExercises.length > 0) {
        setExercises(prevExercises => [...prevExercises, ...newExercises]);
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
    fetchExercises();
  }, [currentPage]);

  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseItem 
      key={item.id}
      name={item.name}
      gifUrl={item.gifUrl}
      bodyPart={item.bodyPart}
    />
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
        data={exercises}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
