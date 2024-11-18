import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'
import ScreenLayout from 'src/components/ScreenLayout';
import { useAuth } from '../hooks/useAuth';
import { fetchWeather, showWeather } from './services/weatherApi';
import { WeatherData, CallProps } from './services/types';
import { getCurrentLocation } from './services/location';
import { WEATHER_API_KEY } from '@env';
import { useWeather } from './context/WeatherContext';


export default function HomeScreen() {
  const { logOut } = useAuth();
  const router = useRouter();
  const { weather, setWeather } = useWeather();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!weather) {
      loadCurrentLocationWeather();
    } else {
      setLoading(false);
    }
  }, [weather]);

  const loadCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      setLocationError(null);

      const { location, error: locError } = await getCurrentLocation();
      if (locError) {
        setLocationError(locError.message);
        return;
      }

      if (location) {
        const args: CallProps = {
          key: WEATHER_API_KEY,
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          unit: 'imperial' as const,
          lang: 'en'
        };

        const weatherReponse = await fetchWeather(args);
        const weatherData = {} as WeatherData;
        showWeather.call(weatherData, weatherReponse);
        setWeather(weatherData);
      }

    } catch (err) {
      setError("Failed to load weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('./auth/welcome');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSearchPress = () => {
    router.push('/second');
  };

  return (
    <ScreenLayout testID="weather-screen-layout">
      <S.Container>
        <S.TopBar>
          <S.IconButton onPress={handleLogout}>
            <MaterialIcons name="logout" size={28} color="white" />
          </S.IconButton>
          <S.SearchIconContainer onPress={handleSearchPress}>
            <MaterialIcons name="search" size={30} color="white" />
          </S.SearchIconContainer>
        </S.TopBar>
        
        {loading ? (
          <ActivityIndicator size="large" color="#00A3FF" />
        ) : locationError || error ? (
          <S.ErrorText>{locationError || error}</S.ErrorText>
        ) : weather ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <S.WeatherContent>
              <S.LocationRow>
                <S.CityName>{weather.name}</S.CityName>
              </S.LocationRow>

              <S.WeatherIcon source={{ uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` }} />
              
              <S.Temperature>{Math.round(weather.main.temp)}°F</S.Temperature>
              <S.Description>{weather.weather[0].description}</S.Description>

              <S.WeatherDetailsCard>
                <S.DetailRow>
                  <S.DetailItem>
                    <Feather name="thermometer" size={24} color="#FFF" />
                    <S.DetailText>Feels like</S.DetailText>
                    <S.DetailValue>{Math.round(weather.main.feels_like)}°F</S.DetailValue>
                  </S.DetailItem>

                  <S.DetailItem>
                    <Ionicons name="water-outline" size={24} color="#FFF" />
                    <S.DetailText>Humidity</S.DetailText>
                    <S.DetailValue>{weather.main.humidity}%</S.DetailValue>
                  </S.DetailItem>
                </S.DetailRow>

                <S.DetailRow>
                  <S.DetailItem>
                    <Feather name="wind" size={24} color="#FFF" />
                    <S.DetailText>Wind Speed</S.DetailText>
                    <S.DetailValue>{weather.wind.speed} mph</S.DetailValue>
                  </S.DetailItem>

                  <S.DetailItem>
                    <MaterialIcons name="compress" size={24} color="#FFF" />
                    <S.DetailText>Pressure</S.DetailText>
                    <S.DetailValue>{weather.main.pressure} hPa</S.DetailValue>
                  </S.DetailItem>
                </S.DetailRow>
              </S.WeatherDetailsCard>

              <S.RefreshButton onPress={loadCurrentLocationWeather}>
                <Feather name="refresh-cw" size={20} color="#FFF" />
                <S.RefreshText>Refresh</S.RefreshText>
              </S.RefreshButton>
            </S.WeatherContent>
          </ScrollView>
        ) : null}
      </S.Container>
    </ScreenLayout>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
    background-color: #1e1e1e;
  `,
  TopBar: styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    z-index: 1;
  `,
  SearchIconContainer: styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #C0C0C0;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    elevation: 5;
    shadow-color: #fff;
    shadow-offset: 0px 0px;
    shadow-opacity: 0.5;
    shadow-radius: 5px;
  `,
  IconButton: styled.TouchableOpacity`
    padding: 10px;
  `,
  WeatherContent: styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 20px;
  `,
  LocationRow: styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  `,
  CityName: styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 8px;
  `,
  WeatherIcon: styled.Image`
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
  `,
  Temperature: styled.Text`
    font-size: 60px;
    font-weight: bold;
    color: #ffdd57;
    margin-bottom: 10px;
  `,
  Description: styled.Text`
    font-size: 22px;
    color: #a0a0a0;
    text-transform: capitalzie;
    margin-bottom: 30px;
  `,
  WeatherDetailsCard: styled.View`
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
  `,
  DetailRow: styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  `,
  DetailItem: styled.View`
    align-items: center;
    flex: 1;
  `,
  DetailText: styled.Text`
    color: #a0a0a0;
    font-size: 14px;
    margin-top: 5px;
  `,
  DetailValue: styled.Text`
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
  `,
  RefreshButton: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 12px 24px;
    border-radius: 30px;
  `,
  RefreshText: styled.Text`
    color: #ffffff;
    font-size: 16px;
    margin-left: 8px;
  `,
  ErrorText: styled.Text`
    color: #ff4c4c;
    font-size: 18px;
    text-align: center;
    margin-top: 100px;
  `,
};