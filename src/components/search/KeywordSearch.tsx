import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
import MovieItem from '../movies/MovieItem';
import { API_ACCESS_TOKEN } from '@env';
import { Movie } from '../../types/app';

const KeywordSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<Movie[]>([]);

    const searchMovieByTitle = async (title: string) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
            params: {
                query: title,
            },
        };

        try {
            const response = await axios.request(options);
            setResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() !== '') {
            await searchMovieByTitle(keyword);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Input Title Movie Here"
                    value={keyword}
                    onChangeText={(text) => setKeyword(text)}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Feather name="search" size={20} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {results.length > 0 ? (
                    <View style={styles.grid}>
                        {results.map(movie => (
                            <View key={movie.id} style={styles.gridItem}>
                                <MovieItem
                                    movie={movie}
                                    size={{ width: 100, height: 200 }}
                                    coverType="poster"
                                />
                            </View>
                        ))}
                    </View>
                )
                    : (
                        <Text style={styles.noSearchText}></Text>
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
        
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#F1E6E4',
        height: 70,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    grid: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    gridItem: {
        margin: 8,
    },
    noSearchText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default KeywordSearch;
