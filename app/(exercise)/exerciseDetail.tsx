import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import InstructionsList from '../../components/atoms/InstructionsItems';

export default function ExerciseDetail() {
  const { name, gifUrl, bodyPart, instructions, equipment } = useLocalSearchParams();
  const validGifUrl = Array.isArray(gifUrl) ? gifUrl[0] : gifUrl;

  return (
    <View className="flex-1 bg-background px-2">
      <ScrollView>
        <View className="py-2 items-center"> 
          <Text className="text-white font-ibold text-lg capitalize pb-1 ">{name}</Text>
          <Text className="text-gray-400 font-iregular capitalize">{bodyPart}</Text>
        </View>

        {validGifUrl && typeof validGifUrl === 'string' && (
          <Image 
            source={{ uri: validGifUrl }} 
            className="w-full h-72" 
        />
        )}

        <Text className="text-gray-400 font-iregular capitalize pt-2">Equipment: {equipment}</Text>
        <Text className="text-white font-isemibold text-lg capitalize pt-3">Instructions</Text>
        <InstructionsList
          instructions={instructions}
        />
      </ScrollView>
    </View>
  );
}