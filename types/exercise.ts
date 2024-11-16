export type Game = {
    description: string, 
    releaseDate: string, 
    score: number,
    slug: string, 
    title: string, 
    image: string
}

export type Exercise = {
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: string;
    name: string;
    target: string;
    secondaryMuscles: string[]; 
    instructions: string[];  
};

export interface ListElementProps {
    selectedEquipments: string[];
    selectedBodyParts: string[];
    fromRoutine?: boolean;
};
  
export type ExerciseFilterStore = {
    selectedEquipments: string[];
    selectedBodyParts: string[];
    addEquipment: (equipment: string) => void;
    removeEquipment: (equipment: string) => void;
    addBodyPart: (bodyPart: string) => void;
    removeBodyPart: (bodyPart: string) => void;
    clearFilters: () => void;
};

export interface SearchState {
    searchText: string;
    setSearchText: (text: string) => void;
};
  