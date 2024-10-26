import ListElement from "../../components/screens/ListElement";
import { useExerciseFilterStore } from "../storage/exerciseStorage";

export default function Exercises() {
	const { selectedEquipments, selectedBodyParts } = useExerciseFilterStore();

	return <ListElement selectedEquipments={selectedEquipments} selectedBodyParts={selectedBodyParts} />;
}

