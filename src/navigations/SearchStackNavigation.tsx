import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';
import CategorySearch from '../components/search/CategorySearch';
import CategorySearchResult from '../screens/CategorySearchResult';

const SearchStack = createNativeStackNavigator();

const SearchStackNavigation = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="MovieDetail" component={MovieDetail} />
    <SearchStack.Screen name="CategorySearch" component={CategorySearch} />
    <SearchStack.Screen name="CategorySearchResult" component={CategorySearchResult} />
  </SearchStack.Navigator>
);

export default SearchStackNavigation;
