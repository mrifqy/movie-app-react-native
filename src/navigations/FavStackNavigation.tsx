import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import MovieDetail from '../screens/MovieDetail';

const FavStack = createNativeStackNavigator();

const FavStackNavigation = () => (
  <FavStack.Navigator>
    <FavStack.Screen name="Favorite" component={Favorite} />
    <FavStack.Screen name="MovieDetail" component={MovieDetail} />
  </FavStack.Navigator>
);

export default FavStackNavigation;