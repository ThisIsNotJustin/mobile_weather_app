import React from 'react';
import { Button} from 'react-native';
import styled from 'styled-components/native';
import { useRouter, Stack } from 'expo-router';
import LinkButton from 'src/components/LinkButton';
import ScreenLayout from 'src/components/ScreenLayout';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('./auth/welcome');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <ScreenLayout testID="home-screen-layout">
      <Stack.Screen options={{ title: 'Home Screen' }} />
      <S.Content testID="home-screen-content">
        <S.Title testID="home-screen-title">🏠</S.Title>
        <S.Text testID="home-screen-text">Welcome to the Home Screen!</S.Text>
        
        {user && (
          <S.Text testID="user-email">Logged in as: {user.email}</S.Text>
        )}

        <LinkButton href="/second" text="Go To Second Screen" />
        
        <Button title="Logout" onPress={handleLogout} />
      </S.Content>
    </ScreenLayout>
  )
}

const S = {
  Content: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: helvetica;
    font-weight: 900;
    font-size: ${(p) => p.theme.size(200, 'px')};
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: helvetica;
    font-weight: 700;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `
}
