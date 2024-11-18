import { useState } from 'react';
import { WeatherData } from '../app/services/types';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  return { weather, setWeather };
}