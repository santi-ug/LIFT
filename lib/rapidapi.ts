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