import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';
import { useAuth } from '../../hooks/useAuth';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.replace('/');
    } catch (err) {
      setError('Failed to Sign Up');
    }
  };

  return (
    <ScreenLayout testID="signup-screen">
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </ScreenLayout>
  );
}