import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0e1529' },
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome to our weather app!',
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack>
  );
}