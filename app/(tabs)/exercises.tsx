import ListElement from "../../components/screens/ListElement";
import { useExerciseFilterStore } from "../../storage/exerciseStorage";
import { useSearchParams } from 'expo-router/build/hooks';
import React from "react";

export default function Exercises() {
  const { selectedEquipments, selectedBodyParts } = useExerciseFilterStore();

  const searchParams = useSearchParams(); 
  const fromRoutine = searchParams.get('fromRoutine') === 'true'; 

	return (
		<ListElement 
			selectedEquipments={selectedEquipments} 
			selectedBodyParts={selectedBodyParts} 
			fromRoutine={ fromRoutine }
		/>
	);
}
