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
  