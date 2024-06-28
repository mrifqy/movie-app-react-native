import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import MovieList from '../components/movies/MovieList';
import { API_ACCESS_TOKEN } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Movie } from '../../src/types/app';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${API_ACCESS_TOKEN}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const checkIsFavorite = async (id: number): Promise<boolean> => {
      try {
        const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
        if (initialData !== null) {
          const favMovieList: Movie[] = JSON.parse(initialData);
          return favMovieList.some(movie => movie.id === id);
        }
        return false;
      } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
      }
    };

    const checkFavoriteStatus = async () => {
      const isFav = await checkIsFavorite(id);
      setIsFavorite(isFav);
    };

    fetchMovieData();
    checkFavoriteStatus();
  }, [id]);

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      // console.log('Initial Data:'); 

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
      console.log(favMovieList);
    } catch (error) {
      console.log(error);
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      if (initialData !== null) {
        let favMovieList: Movie[] = JSON.parse(initialData);
        favMovieList = favMovieList.filter(movie => movie.id !== id);

        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
        setIsFavorite(false);
        console.log([]);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(movie);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.favoriteContainer}>
          <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoItem}>Original Language:</Text>
            <Text>{movie.original_language}</Text>
            <Text style={styles.infoItem}>Popularity:</Text>
            <Text>{movie.popularity}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoItem}>Release Date:</Text>
            <Text>{new Date(movie.release_date).toDateString()}</Text>
            <Text style={styles.infoItem}>Vote Count:</Text>
            <Text>{movie.vote_count}</Text>
          </View>
        </View>
        <View style={styles.recommendationContainer}>
          <MovieList
            title="Recommendation"
            path={`movie/${id}/recommendations`}
            coverType="poster"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: 32,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 8,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  overview: {
    fontSize: 16,
    marginVertical: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    width: '100%',
  },
  infoColumn: {
    flex: 1,
  },
  infoItem: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  recommendationContainer: {
    marginVertical: 16,
    width: '100%',
  },
});

export default MovieDetail;
