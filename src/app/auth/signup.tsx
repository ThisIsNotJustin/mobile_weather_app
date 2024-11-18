import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';
import { useAuth } from '../../hooks/useAuth';
import { MaterialIcons } from '@expo/vector-icons';

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
      <S.BackButton onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </S.BackButton>
      <S.Container>
        <S.InputContainer>
          <S.Input
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <S.Input
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <S.ErrorText>{error}</S.ErrorText> : null}
          <S.AuthButton onPress={handleSignUp}>
            <S.ButtonText>Sign Up</S.ButtonText>
          </S.AuthButton>
        </S.InputContainer>
      </S.Container>
    </ScreenLayout>
  );
}

const S = {
  BackButton: styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    left: 20px;
    z-index: 1;
  `,
  Container: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${(p) => p.theme.size(20, 'px')};
  `,
  InputContainer: styled.View`
    width: 80%;
    max-width: ${(p) => p.theme.size(300, 'px')};
  `,
  Input: styled.TextInput`
    background-color: rgba(255, 255, 255, 0.1);
    padding: ${(p) => p.theme.size(12, 'px')};
    border-radius: ${(p) => p.theme.size(8, 'px')};
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
    color: white;
    font-size: ${(p) => p.theme.size(16, 'px')};
  `,
  ErrorText: styled.Text`
    color: #ff6b6b;
    text-align: center;
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
  `,
  AuthButton: styled.TouchableOpacity`
    background-color: ${(p) => p.theme.primary};
    padding: ${(p) => p.theme.size(12, 'px')};
    border-radius: ${(p) => p.theme.size(8, 'px')};
    margin-top: ${(p) => p.theme.size(10, 'px')};
  `,
  ButtonText: styled.Text`
    color: black;
    text-align: center;
    font-size: ${(p) => p.theme.size(16, 'px')};
    font-weight: bold;
  `,
};