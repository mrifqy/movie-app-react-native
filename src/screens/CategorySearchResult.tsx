import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../src/types/app';
import MovieItem from '../components/movies/MovieItem';

type CategorySearchResultRouteProp = RouteProp<RootStackParamList, 'CategorySearchResult'>;

const CategorySearchResult = () => {
    const route = useRoute<CategorySearchResultRouteProp>();
    const { genreName, movies } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Result of {genreName} Genre</Text>
            <ScrollView>
                {movies.length > 0 ? (
                    <View style={styles.grid}>
                        {movies.map(movie => (
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
                    <Text style={styles.noSearchText}>No movies found.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    grid: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    gridItem: {
        margin: 8,
    },
    noSearchText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default CategorySearchResult;
