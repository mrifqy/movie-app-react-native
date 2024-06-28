import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem from '../components/movies/MovieItem';
import type { Movie } from '../../src/types/app';
import { useIsFocused } from '@react-navigation/native';

export default function Favorite(): JSX.Element {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const data: string | null = await AsyncStorage.getItem('@FavoriteList');
        if (data !== null) {
          const movies: Movie[] = JSON.parse(data);
          setFavoriteMovies(movies);
        }
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favoriteMovies.length > 0 ? (
        <View style={styles.grid}>
          {favoriteMovies.map(movie => (
            <View key={movie.id} style={styles.gridItem}>
              <MovieItem
                movie={movie}
                size={{ width: 100, height: 200 }}
                coverType="poster"
              />
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noFavoritesText}>No favorite movies found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridItem: {
    margin: 8,
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'gray',
  },
});
