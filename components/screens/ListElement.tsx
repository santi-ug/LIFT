import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import ExerciseTable from '../molecules/ExerciseTable'

import SearchInput from '../organisms/SearchInput'

import { getInfoGames } from '../../lib/metacritic'
import { Game } from '../../types/exercise'

export default function ListElement() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    getInfoGames()
    .then((data: Game[]) => {
      setGames(data)
    })
  }, [])

  // Convertir la lista de juegos en ejercicios
  const exercises = games.map(game => {
     return {
      exercise: game.title,           
      series: new Date(game.releaseDate).getFullYear(),       
      repetitions: game.score, 
    };
  });

  return (
    <View style={{ height: '100%' }}>
      <SearchInput />
      <ScrollView>
        <ExerciseTable
          sectionTitle="Juegos disponibles" 
          exercises={exercises}
        ></ExerciseTable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'black'
  }
})