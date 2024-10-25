export async function getInfoExercises(limit: number, offset: number) {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=${offset}`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': '0fcb129f17mshc7ab99c79ac8533p1b0e7bjsnbc6a86487664'
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

export async function getInfoExercisesbyEquipment(equipment: String, limit: number, offset: number) {
  const EXERCISES_API = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=${limit}&offset=${offset}`;
  
  const headers = {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': '0fcb129f17mshc7ab99c79ac8533p1b0e7bjsnbc6a86487664'
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
    'x-rapidapi-key': '0fcb129f17mshc7ab99c79ac8533p1b0e7bjsnbc6a86487664'
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
    'x-rapidapi-key': '0fcb129f17mshc7ab99c79ac8533p1b0e7bjsnbc6a86487664'
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
    'x-rapidapi-key': '0fcb129f17mshc7ab99c79ac8533p1b0e7bjsnbc6a86487664'
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