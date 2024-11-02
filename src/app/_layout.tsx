import 'expo-dev-client';
import React from 'react';
import { ThemeProvider as NavProvider } from '@react-navigation/native';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native';
import { appTheme, navTheme } from 'src/config/theme';
import { useAuth} from '../hooks/useAuth';

export default function AppLayout() {
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
      <StatusBar style="light" />
      <S.AppWrapper>
        <NavProvider value={navTheme}>
          <Slot screenOptions={{ headerShown: false }} />
        </NavProvider>
      </S.AppWrapper>
    </ThemeProvider>
  )
}

const S = {
  AppWrapper: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}
