import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const { userPlate, clearSession } = useAuthStore();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = async () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Salir', 
        style: 'destructive',
        onPress: async () => {
          // Desloguear de Supabase
          await supabase.auth.signOut();
          // Limpiar el estado local de Zustand
          clearSession();
          // Redirigir al login
          router.replace('/(auth)/login');
        }
      }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8 mt-2">
          <Text className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
            Vanator
          </Text>
          <Text className="text-2xl font-bold text-white">
            Mi Cuenta
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8 flex-row items-center shadow-lg shadow-black/40">
          <View className="w-16 h-16 bg-indigo-600 rounded-full justify-center items-center mr-4">
            <FontAwesome name="user" size={28} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">Conductor Prueba</Text>
            <Text className="text-slate-400 text-xs mt-1">Placa: <Text className="font-bold text-indigo-300">{userPlate || 'SIN-PLACA'}</Text></Text>
          </View>
        </View>

        {/* Settings Group 1 */}
        <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-1">
          Preferencias
        </Text>
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-4 mb-6">
          <View className="flex-row items-center justify-between py-3 px-1">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-indigo-500/10 rounded-lg justify-center items-center mr-3">
                <FontAwesome name="bell" size={16} color="#6366f1" />
              </View>
              <Text className="text-slate-200 font-semibold text-sm">Notificaciones</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#334155', true: '#6366f1' }}
              thumbColor={notifications ? '#ffffff' : '#94a3b8'}
            />
          </View>

          <View className="h-[1px] bg-slate-800 my-1" />

          <View className="flex-row items-center justify-between py-3 px-1">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-indigo-500/10 rounded-lg justify-center items-center mr-3">
                <FontAwesome name="moon-o" size={16} color="#6366f1" />
              </View>
              <Text className="text-slate-200 font-semibold text-sm">Modo Oscuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#334155', true: '#6366f1' }}
              thumbColor={darkMode ? '#ffffff' : '#94a3b8'}
            />
          </View>
        </View>

        {/* Settings Group 2 */}
        <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-1">
          Soporte
        </Text>
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-4 mb-8">
          <TouchableOpacity className="flex-row items-center justify-between py-3 px-1" activeOpacity={0.7}>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-indigo-500/10 rounded-lg justify-center items-center mr-3">
                <FontAwesome name="question-circle" size={16} color="#6366f1" />
              </View>
              <Text className="text-slate-200 font-semibold text-sm">Ayuda y Preguntas Frecuentes</Text>
            </View>
            <FontAwesome name="angle-right" size={18} color="#475569" />
          </TouchableOpacity>

          <View className="h-[1px] bg-slate-800 my-1" />

          <TouchableOpacity className="flex-row items-center justify-between py-3 px-1" activeOpacity={0.7}>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-indigo-500/10 rounded-lg justify-center items-center mr-3">
                <FontAwesome name="shield" size={16} color="#6366f1" />
              </View>
              <Text className="text-slate-200 font-semibold text-sm">Política de Privacidad</Text>
            </View>
            <FontAwesome name="angle-right" size={18} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full bg-slate-900 border border-rose-500/30 py-4 rounded-2xl flex-row justify-center items-center mb-12 shadow-sm shadow-rose-900/20"
          activeOpacity={0.8}
        >
          <FontAwesome name="sign-out" size={18} color="#f43f5e" className="mr-2" />
          <Text className="text-rose-500 text-center font-bold text-lg ml-2">
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}