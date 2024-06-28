import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { API_ACCESS_TOKEN } from '@env';
import { Genre } from '../../types/app';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/app';

type CategorySearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategorySearch'
>;

const CategorySearch = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const navigation = useNavigation<CategorySearchScreenNavigationProp>();

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
      params: {
        language: 'en-US',
      },
    })
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleSearchPress = () => {
    if (!selectedGenre) return;

    axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
      params: {
        language: 'en-US',
        with_genres: selectedGenre.id,
      },
    })
      .then(response => {
        navigation.navigate('CategorySearchResult', {
          genreName: selectedGenre.name,
          movies: response.data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.genreButton,
              selectedGenre?.id === item.id && styles.selectedGenreButton,
            ]}
            onPress={() => handleGenreSelect(item)}
          >
            <Text style={styles.genreText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.genreContainer}
        ListFooterComponent={
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
  },
  genreButton: {
    backgroundColor: '#E6E6FA',
    margin: 5,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    maxWidth: '48%',
  },
  selectedGenreButton: {
    backgroundColor: '#9370DB',
  },
  genreText: {
    color: '#000',
    textAlign: 'center',
  },
  genreContainer: {
    justifyContent: 'center',
    paddingBottom: 30,
  },
  searchButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default CategorySearch;
