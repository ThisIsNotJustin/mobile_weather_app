import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenLayout testID="welcome-screen">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the App!</Text>
        <Button title="Sign In" onPress={() => router.push('/auth/signin')} />
        <Button title="Sign Up" onPress={() => router.push('/auth/signup')} />
      </View>
    </ScreenLayout>
  );
}