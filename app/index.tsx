import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <View className="items-center mb-20">
          <View className="w-28 h-28 bg-indigo-600 rounded-3xl justify-center items-center mb-8">
            <Text className="text-white text-5xl font-extrabold">V</Text>
          </View>
          <Text className="text-5xl font-extrabold text-white tracking-tight">
            Vanator
          </Text>
          <Text className="text-slate-400 text-lg mt-3 font-medium tracking-widest uppercase">
            Smart Parking System
          </Text>
        </View>
      </View>

      {/* Botones de Acción — fijados en la parte inferior */}
      <View className="px-8 pb-6">
        <TouchableOpacity
          className="w-full bg-indigo-600 py-4 rounded-2xl mb-4"
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-lg">
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full py-4 rounded-2xl border border-slate-700"
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text className="text-slate-300 text-center font-bold text-lg">
            Crear Cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}