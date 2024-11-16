import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Dropdown from '../../components/molecules/Dropdown';
import CustomButton from '../../components/atoms/CustomButton';
import { useExerciseFilterStore } from '../../storage/exerciseStorage';
import SelectedFilters from '../../components/atoms/SelectedFilter'; 
import { getListBodyPart, getListEquipment } from '../../lib/rapidapi';
import { router } from 'expo-router';

export default function ExerciseFilter() {
  const [equipmentList, setEquipmentList] = useState<string[]>([]);
  const [bodyPartList, setBodyPartList] = useState<string[]>([]);
  
  const {
    selectedEquipments,
    selectedBodyParts,
    addEquipment,
    removeEquipment,
    addBodyPart,
    removeBodyPart,
    clearFilters,
  } = useExerciseFilterStore();

  useEffect(() => {
    const fetchData = async () => {
      const equipment = await getListEquipment();
      const bodyParts = await getListBodyPart();
      setEquipmentList(equipment);
      setBodyPartList(bodyParts);
    };
        
    fetchData();
  }, []);

  const equipmentOptions = equipmentList
    .filter(item => !selectedEquipments.includes(item)) 
    .map(item => ({
        label: item,
        value: item,
    }));

  const bodyPartOptions = bodyPartList
    .filter(item => !selectedBodyParts.includes(item)) 
    .map(item => ({
        label: item,
        value: item,
    }));

  const handleEquipmentSelect = (value: string | null) => {
    if (value && !selectedEquipments.includes(value)) {
      addEquipment(value);
    }
  };
  
  const handleBodyPartSelect = (value: string | null) => {
    if (value && !selectedBodyParts.includes(value)) {
      addBodyPart(value);
    }
  };
  
  const handleFilterPress = () => {
    clearFilters();
  };

  return (
    <View className="flex-1 bg-background px-4">
      <ScrollView>

        <View className="rounded-md my-4">
          <Text className="text-white font-semibold text-lg">Selected Filters:</Text>
          <SelectedFilters filters={selectedEquipments} onRemove={removeEquipment} />
          <SelectedFilters filters={selectedBodyParts} onRemove={removeBodyPart} />
        </View>

        <Text className="text-gray-400 font-semibold pt-2 text-base">
          Filter by equipment
        </Text>

        <Dropdown
          options={equipmentOptions}
          placeholder="Select an equipment"
          value={null} 
          setValue={handleEquipmentSelect} 
        />

        <Text className="text-gray-400 font-semibold pt-2 text-base">
          Filer by body part
        </Text>

        <Dropdown
          options={bodyPartOptions} 
          placeholder="Select a body part"
          value={null}
          setValue={handleBodyPartSelect} 
          otherStyles='w-12/12'
        />

        <CustomButton
          title="Eliminar Filtros"
          handlePress={handleFilterPress}
          containerStyles="mt-4" 
          isLoading={false}
        />

      </ScrollView>
    </View>
  );
}