import React from 'react';
import { View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import ScreenLayout from 'src/components/ScreenLayout';
import { useAuth } from './AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const clientId = '513228754524-22ppal71gd2tjq15qlq2mrs6bh9p0ga0.apps.googleusercontent.com';

    const { setIsAuthenticated } = useAuth();
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId,
        redirectUri: 'https://auth.expo.io/ThisIsNotJustin/crossplatformweatherapp',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;

            console.log(authentication);
            setIsAuthenticated(true);
            router.replace('/');
        }
    }, [response]);

    return (
        <ScreenLayout testID = 'login-screen'>
            <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    title = "Login with Google"
                    onPress = {() => {
                        if (request) {
                            promptAsync();
                        }
                    }}
                />
            </View>
        </ScreenLayout>
    );
}