// 1. Cargamos el polyfill que creó Antigravity
import './polyfills';
// 2. Cargamos el polyfill de URLs (Obligatorio para Supabase en React Native)
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// 3. Forzamos la lectura estricta del .env sin links de relleno
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);