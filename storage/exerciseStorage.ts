import { create } from "zustand";
import { ExerciseFilterStore } from "../types/exercise";

export const useExerciseFilterStore = create<ExerciseFilterStore>((set) => ({
    selectedEquipments: [],
    selectedBodyParts: [],
  
    addEquipment: (equipment) =>
        set((state) => ({
            selectedEquipments: [...state.selectedEquipments, equipment],
        })
    ),

    removeEquipment: (equipment) =>
        set((state) => ({
            selectedEquipments: state.selectedEquipments.filter((e) => e !== equipment),
        })
    ),

    addBodyPart: (bodyPart) =>
        set((state) => ({
            selectedBodyParts: [...state.selectedBodyParts, bodyPart],
        })
    ),

    removeBodyPart: (bodyPart) =>
        set((state) => ({
            selectedBodyParts: state.selectedBodyParts.filter((bp) => bp !== bodyPart),
        })
    ),

    clearFilters: () =>
        set(() => ({
            selectedEquipments: [],
            selectedBodyParts: [],
        })
    ),
}));