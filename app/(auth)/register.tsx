import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plate, setPlate] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !plate) {
      Alert.alert('Datos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    setLoading(true);

    // 1. Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error al registrar', error.message);
      setLoading(false);
      return;
    }

    // 2. Aquí idealmente harías el insert a tus tablas 'profiles' y 'vehicles'
    // usando data.user.id antes de redirigir.
    
    Alert.alert('¡Éxito!', 'Cuenta creada correctamente. Inicia sesión para continuar.', [
      { text: 'OK', onPress: () => router.replace('/(auth)/login') }
    ]);
    
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-slate-900 px-6 pt-12" showsVerticalScrollIndicator={false}>
      <View className="mb-8">
        <Text className="text-3xl font-bold text-white">Crear Cuenta</Text>
        <Text className="text-slate-400 mt-2">Únete a Vanator Smart Parking</Text>
      </View>

      <View className="space-y-4 mb-6">
        <View>
          <Text className="text-slate-300 mb-1 ml-1">Nombre Completo</Text>
          <TextInput
            className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-700"
            placeholder="Juan Pérez"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />
        </View>

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
          <Text className="text-slate-300 mb-1 ml-1">Placa del Vehículo</Text>
          <TextInput
            className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-700 uppercase"
            placeholder="LPZ-123"
            placeholderTextColor="#64748b"
            autoCapitalize="characters"
            value={plate}
            onChangeText={setPlate}
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
      </View>

      {/* Checkbox de Privacidad Crítico */}
      <TouchableOpacity 
        className="flex-row items-center mb-8" 
        onPress={() => setAcceptedTerms(!acceptedTerms)}
        activeOpacity={0.7}
      >
        <View className={`w-6 h-6 rounded border items-center justify-center mr-3 ${acceptedTerms ? 'bg-indigo-600 border-indigo-600' : 'border-slate-500 bg-slate-800'}`}>
          {acceptedTerms && <FontAwesome name="check" size={12} color="white" />}
        </View>
        <Text className="text-slate-400 flex-1 text-xs">
          Acepto los términos de servicio y autorizo el escaneo automatizado de mi placa mediante Inteligencia Artificial para el ingreso.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className={`w-full rounded-xl p-4 flex-row justify-center items-center mb-4 ${acceptedTerms ? 'bg-indigo-600' : 'bg-slate-700'}`}
        onPress={handleRegister}
        disabled={!acceptedTerms || loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className={`text-center font-bold text-lg ${acceptedTerms ? 'text-white' : 'text-slate-400'}`}>
            Registrar Vehículo
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        className="mb-12 py-2"
        onPress={() => router.back()}
      >
        <Text className="text-slate-400 text-center">
          ¿Ya tienes cuenta? <Text className="text-indigo-400 font-bold">Inicia Sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}