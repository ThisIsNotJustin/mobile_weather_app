import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Stack, useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';
import { fetchWeather, showWeather } from '../services/weatherApi';
import { getLocationFromAddress } from '../services/location';
import { WeatherData, CallProps } from '../services/types';
import { WEATHER_API_KEY } from '@env';
import { useWeather } from '../context/WeatherContext';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setWeather } = useWeather();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formattedQuery = searchQuery.includes(',') 
        ? searchQuery.trim() 
        : `${searchQuery.trim()}, US`;

      console.log('Searching for:', formattedQuery);
      const locationResponse = await getLocationFromAddress(formattedQuery);

      if (locationResponse.error) {
        setError(locationResponse.error.message);
        return;
      }

      if (locationResponse.location) {
        console.log('Location found:', locationResponse.location);
        const args: CallProps = {
          key: WEATHER_API_KEY,
          lat: locationResponse.location.coords.latitude,
          lon: locationResponse.location.coords.longitude,
          unit: 'imperial' as const,
          lang: 'en'
        };

        const weatherData = {} as WeatherData;
        const weatherResponse = await fetchWeather(args);
        if (weatherResponse) {
          showWeather.call(weatherData, weatherResponse);
          setWeather(weatherData);
          router.push('/');
        }
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout testID="search-screen-layout">
      <Stack.Screen 
        options={{ 
          title: 'Search Location',
          headerShadowVisible: false,
        }} 
      />
      
      <S.Content testID="search-screen-content">
        <S.SearchContainer>
          <S.SearchInput
            testID="search-input"
            placeholder="Enter city name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus
          />
          
          <S.SearchButton 
            onPress={handleSearch}
            disabled={loading}
            testID="search-button"
          >
            <S.SearchButtonText>Search</S.SearchButtonText>
          </S.SearchButton>
        </S.SearchContainer>

        {loading && (
          <S.LoadingContainer>
            <ActivityIndicator size="large" color="#0000ff" />
          </S.LoadingContainer>
        )}

        {error && (
          <S.ErrorText testID="error-text">{error}</S.ErrorText>
        )}

        <S.BackButton 
          onPress={() => router.back()}
          testID="back-button"
        >
          <S.BackButtonText>Back to Weather</S.BackButtonText>
        </S.BackButton>
      </S.Content>
    </ScreenLayout>
  );
}

const S = {
  Content: styled.View`
    flex: 1;
    padding: ${(p) => p.theme.size(20, 'px')};
    background-color: ${(p) => p.theme.background};
  `,
  SearchContainer: styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${(p) => p.theme.size(20, 'px')};
  `,
  SearchInput: styled.TextInput`
    flex: 1;
    height: ${(p) => p.theme.size(50, 'px')};
    background-color: white;
    border-radius: ${(p) => p.theme.size(25, 'px')};
    padding: ${(p) => p.theme.size(15, 'px')};
    font-size: ${(p) => p.theme.size(16, 'px')};
    color: ${(p) => p.theme.primary};
    margin-right: ${(p) => p.theme.size(10, 'px')};
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
    color: black;
  `,
  SearchButton: styled.TouchableOpacity`
    background-color: ${(p) => p.theme.primary};
    height: ${(p) => p.theme.size(50, 'px')};
    padding: ${(p) => p.theme.size(15, 'px')};
    border-radius: ${(p) => p.theme.size(25, 'px')};
    justify-content: center;
    align-items: center;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
  `,
  SearchButtonText: styled.Text`
    color: black;
    font-size: ${(p) => p.theme.size(16, 'px')};
    font-weight: bold;
  `,
  LoadingContainer: styled.View`
    padding: ${(p) => p.theme.size(20, 'px')};
    align-items: center;
  `,
  ErrorText: styled.Text`
    color: red;
    text-align: center;
    margin-top: ${(p) => p.theme.size(10, 'px')};
    font-size: ${(p) => p.theme.size(14, 'px')};
  `,
  BackButton: styled.TouchableOpacity`
    position: absolute;
    bottom: ${(p) => p.theme.size(30, 'px')};
    left: ${(p) => p.theme.size(20, 'px')};
    right: ${(p) => p.theme.size(20, 'px')};
    background-color: ${(p) => p.theme.secondary};
    padding: ${(p) => p.theme.size(15, 'px')};
    border-radius: ${(p) => p.theme.size(25, 'px')};
    align-items: center;
  `,
  BackButtonText: styled.Text`
    color: white;
    font-size: ${(p) => p.theme.size(16, 'px')};
    font-weight: bold;
  `,
};