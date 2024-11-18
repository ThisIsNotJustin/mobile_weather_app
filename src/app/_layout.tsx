import 'expo-dev-client';
import React from 'react';
import { ThemeProvider as NavProvider } from '@react-navigation/native';
import { Slot, useRouter } from 'expo-router';
import { Platform, StatusBar } from 'react-native';
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native';
import { appTheme, navTheme } from 'src/config/theme';
import { useAuth } from '../hooks/useAuth';
import { WeatherProvider } from './context/WeatherContext';
import { initializeFirebase } from '../config/firebase.init';

function Layout() {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace('/auth/welcome');
    } else {
      router.replace('/');
    }
  }, [user, router]);

  return (
    <ThemeProvider theme={appTheme as DefaultTheme}>
      <WeatherProvider>
        <StatusBar 
          translucent={Platform.OS === 'android'}
        />
        <S.SafeContainer>
          <S.AppWrapper>
            <NavProvider value={navTheme}>
              <Slot 
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: appTheme.background,
                  },
                  ...Platform.select({
                    ios: {
                      fullScreenGestureEnabled: true,
                    },
                  }),
                }} 
              />
            </NavProvider>
          </S.AppWrapper>
        </S.SafeContainer>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default function AppLayout() {
  initializeFirebase();
  return <Layout />;
}

const S = {
  SafeContainer: styled.View`
    flex: 1;
    background-color: ${appTheme.background};
    ${Platform.select({
      android: `padding-top: ${StatusBar.currentHeight}px;`,
      ios: 'padding-top: 0;'
    })}
  `,
  AppWrapper: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
};