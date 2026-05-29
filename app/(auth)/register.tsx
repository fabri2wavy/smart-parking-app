import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-3xl font-bold text-white mb-4">Crear Cuenta</Text>
      <Text className="text-slate-400 text-center mb-8">
        Pantalla de registro — próximamente.
      </Text>

      <TouchableOpacity
        className="w-full bg-slate-800 py-4 rounded-2xl border border-slate-700"
        onPress={() => router.back()}
      >
        <Text className="text-slate-200 text-center font-bold text-lg">Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
