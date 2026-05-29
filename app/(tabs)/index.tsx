import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuthStore } from '../../store/useAuthStore';

// Mock parking spaces data
const parkingSlots = [
  { id: 'A-101', status: 'available', type: 'General' },
  { id: 'A-102', status: 'occupied', type: 'General' },
  { id: 'A-103', status: 'reserved', type: 'Electric' },
  { id: 'B-201', status: 'available', type: 'Disabled' },
  { id: 'B-202', status: 'available', type: 'General' },
  { id: 'B-203', status: 'occupied', type: 'General' },
];

export default function SmartParkingDashboard() {
  const { userPlate, clearSession } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.replace('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400';
      case 'occupied':
        return 'bg-rose-500/10 border-rose-500/25 text-rose-400';
      case 'reserved':
        return 'bg-amber-500/10 border-amber-500/25 text-amber-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Top Header Section */}
        <View className="flex-row justify-between items-center mb-8 mt-2">
          <View>
            <Text className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
              Vanator
            </Text>
            <Text className="text-2xl font-bold text-white">
              Smart Parking
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full justify-center items-center"
            activeOpacity={0.7}
          >
            <FontAwesome name="sign-out" size={18} color="#f43f5e" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl justify-center items-center mr-4">
                <FontAwesome name="car" size={20} color="#6366f1" />
              </View>
              <View>
                <Text className="text-slate-400 text-xs font-medium">Vehículo Activo</Text>
                <Text className="text-white font-bold text-lg">{userPlate || 'SIN REGISTRAR'}</Text>
              </View>
            </View>
            <View className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Text className="text-emerald-400 text-xs font-semibold">Conectado</Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-800 my-2" />
          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-slate-500 text-xs">Piso</Text>
              <Text className="text-slate-300 font-semibold text-sm">Planta Baja</Text>
            </View>
            <View className="items-end">
              <Text className="text-slate-500 text-xs">Tarifa / hora</Text>
              <Text className="text-indigo-400 font-bold text-sm">$2.50 USD</Text>
            </View>
          </View>
        </View>

        {/* Summary Stats */}
        <Text className="text-lg font-bold text-white mb-4">Estado del Estacionamiento</Text>
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
            <Text className="text-emerald-400 font-extrabold text-2xl">12</Text>
            <Text className="text-slate-400 text-xs mt-1">Disponibles</Text>
          </View>
          <View className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <Text className="text-white font-extrabold text-2xl">40</Text>
            <Text className="text-slate-400 text-xs mt-1">Total Plazas</Text>
          </View>
        </View>

        {/* Parking Slots Title */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-white">Plazas Disponibles</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-indigo-400 text-sm font-semibold mr-1">Filtrar</Text>
            <FontAwesome name="sliders" size={14} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Slots Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-12">
          {parkingSlots.map((slot) => (
            <View
              key={slot.id}
              className={`w-[48%] border rounded-2xl p-4 ${getStatusColor(slot.status)}`}
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="font-extrabold text-lg text-white">{slot.id}</Text>
                <View className="w-2 h-2 rounded-full bg-current" />
              </View>
              <Text className="text-xs text-slate-400 mb-1">{slot.type}</Text>
              <Text className="text-xs font-semibold uppercase tracking-wider">
                {slot.status === 'available' ? 'Disponible' : slot.status === 'occupied' ? 'Ocupado' : 'Reservado'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
