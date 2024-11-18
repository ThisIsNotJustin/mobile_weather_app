import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenLayout testID="welcome-screen">
      <ImageBackground 
        source={require('src/assets/images/retroweather.png')} 
        style={[styles.backgroundImage, { width, height }]}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to SimpleWeather!</Text>
        </View>
      </ImageBackground>

      {/* Buttons as overlay positioned outside ImageBackground */}
      <View style={styles.topRightButtons}>
        <TouchableOpacity style={styles.topButton} onPress={() => router.push('/auth/signin')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.topButton} onPress={() => router.push('/auth/signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 2, // Take 2/3 of the screen
    //resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  topRightButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  topButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});