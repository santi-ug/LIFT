export async function getInfoExercises(limit: number, offset: number) {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=${offset}`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  try{
    const rawData = await fetch(EXERCISES_API, { headers });
    const json = await rawData.json();

    if (!Array.isArray(json)) {
      console.error("API response is not an array:", json);
      return [];
    }

    return json.map((exercise: any) => {
      const { bodyPart, equipment, gifUrl, id, name, target, secondaryMuscles, instructions } = exercise;

      return {
        bodyPart,
        equipment,
        gifUrl,
        id,
        name,
        target,
        secondaryMuscles: secondaryMuscles || [],  
        instructions: instructions || []  
      };
    });

  }catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}

export async function getInfoExercisesbyName(limit: number, offset: number, name: string) {
  const encodedName = encodeURIComponent(name);
  console.log("Encoded name:", encodedName); 

  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/name/${encodedName}?limit=${limit}&offset=${offset}`;

  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  try {
    const rawData = await fetch(EXERCISES_API, { headers });
    const json = await rawData.json();

    if (!Array.isArray(json)) {
      console.error("API response is not an array:", json);
      return [];
    }

    return json.map((exercise: any) => {
      const { bodyPart, equipment, gifUrl, id, name, target, secondaryMuscles, instructions } = exercise;

      return {
        bodyPart,
        equipment,
        gifUrl,
        id,
        name,
        target,
        secondaryMuscles: secondaryMuscles || [],
        instructions: instructions || []
      };
    });

  } catch (error) {
    console.error("Error fetching exercises by name:", error);
    return [];
  }
}

export async function getInfoExercisesbyEquipment(equipment: String, limit: number, offset: number) {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=${limit}&offset=${offset}`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  const rawData = await fetch(EXERCISES_API, { headers });
  const json = await rawData.json();

  return json.map((exercise: any) => {
    const { bodyPart, equipment, gifUrl, id, name, target, secondaryMuscles, instructions } = exercise;

    return {
      bodyPart,
      equipment,
      gifUrl,
      id,
      name,
      target,
      secondaryMuscles: secondaryMuscles || [],  
      instructions: instructions || []  
    };
  });
}

export async function getInfoExercisesbyBodyPart(bodyPart: String, limit: number, offset: number) {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=${limit}&offset=${offset}`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  const rawData = await fetch(EXERCISES_API, { headers });
  const json = await rawData.json();

  return json.map((exercise: any) => {
    const { bodyPart, equipment, gifUrl, id, name, target, secondaryMuscles, instructions } = exercise;

    return {
      bodyPart,
      equipment,
      gifUrl,
      id,
      name,
      target,
      secondaryMuscles: secondaryMuscles || [],  
      instructions: instructions || []  
    };
  });
}

export async function getListEquipment(): Promise<string[]> {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/equipmentList`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  try{
    const rawData = await fetch(EXERCISES_API, { headers });
    const json = await rawData.json();

    const equipmentList = Object.values(json);

    return equipmentList as string[]; 

  }catch (error) {
    console.error("Error fetching equipment list:", error);
    return [];
  }
}

export async function getListBodyPart(): Promise<string[]> {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_RAPIDAPI}`
  };

  try{
    const rawData = await fetch(EXERCISES_API, { headers });
    const json = await rawData.json();

    const bodyPartList = Object.values(json);

    return bodyPartList as string[];

  }catch (error) {
    console.error("Error fetching body part list:", error);
    return [];
  }
}