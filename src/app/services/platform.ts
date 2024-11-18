import { Platform } from 'react-native';
import { authService as webAuth } from './web';
import { authService as nativeAuth } from './native';
import { IAuthService } from './authTypes';

export const authService = Platform.select({
    web: webAuth,
    default: nativeAuth
}) as IAuthService;