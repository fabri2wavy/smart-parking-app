import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);

  // Requerimiento: R2 (Iniciar Sesión) y R4 (Validar Campos)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    setLoading(true);

    // Requerimiento: R5 (Validar en BD - Supabase Auth)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error de acceso', error.message);
      setLoading(false);
      return;
    }

    if (data.session && data.user) {
      // 1. Buscamos la placa del conductor en la tabla perfiles/vehículos
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*, vehicles(plate_number)')
        .eq('id', data.user.id)
        .single();

      const userPlate = profileData?.vehicles?.[0]?.plate_number || 'SIN-PLACA';

      // 2. Guardamos la sesión en el estado global (Zustand + MMKV)
      setSession(data.session, userPlate);

      // 3. Redirigimos al mapa de espacios (Ruta protegida)
      router.replace('/(tabs)');
    }
    
    setLoading(false);
  };

  return (
    // Usamos clases genéricas estilo Tailwind/Uniwind para rapidez visual
    <View className="flex-1 justify-center px-6 bg-slate-900">
      <View className="mb-10">
        <Text className="text-4xl font-bold text-white text-center">Vanator</Text>
        <Text className="text-slate-400 text-center mt-2">Smart Parking System</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-slate-300 mb-1 ml-1">Correo Electrónico</Text>
          <TextInput
            className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-700"
            placeholder="conductor@ejemplo.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text className="text-slate-300 mb-1 ml-1">Contraseña</Text>
          <TextInput
            className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-700"
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          className={`w-full rounded-xl p-4 mt-6 flex-row justify-center items-center ${loading ? 'bg-indigo-400' : 'bg-indigo-600'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">Ingresar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="mt-4"
          onPress={() => router.push('/(auth)/register')}
        >
          <Text className="text-indigo-400 text-center">
            ¿No tienes cuenta? <Text className="font-bold">Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}