import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Datos de prueba para simular el historial
const HISTORIAL_MOCK = [
  { id: '1', fecha: '14 May 2026', zona: 'Zona A - A1', duracion: '1h 30m', total: '45.00' },
  { id: '2', fecha: '12 May 2026', zona: 'Zona C - C3', duracion: '45m', total: '22.50' },
  { id: '3', fecha: '10 May 2026', zona: 'Zona B - B2', duracion: '2h 15m', total: '67.50' },
];

export default function HistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-950 px-6 pt-4" showsVerticalScrollIndicator={false}>
      <View className="mb-6 mt-2">
        <Text className="text-slate-400 uppercase tracking-widest text-xs font-bold">Mis Registros</Text>
        <Text className="text-white text-2xl font-bold mt-1">Historial de Pagos</Text>
      </View>

      {/* Tarjeta de Resumen */}
      <View className="bg-indigo-600/20 border border-indigo-500/30 rounded-3xl p-5 mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-indigo-300 text-sm">Gasto este mes</Text>
          <Text className="text-white text-2xl font-bold mt-1">Bs 135.00</Text>
        </View>
        <View className="w-12 h-12 bg-indigo-500/30 rounded-full justify-center items-center">
          <FontAwesome name="line-chart" size={20} color="#818cf8" />
        </View>
      </View>

      <Text className="text-slate-400 font-bold mb-4 ml-1">Últimos Parqueos</Text>

      {/* Lista del historial */}
      {HISTORIAL_MOCK.map((item) => (
        <View key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex-row justify-between items-center shadow-sm shadow-black/50">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-slate-800 rounded-full justify-center items-center mr-4 border border-slate-700">
              <FontAwesome name="car" size={18} color="#94a3b8" />
            </View>
            <View>
              <Text className="text-white font-bold text-base">{item.zona}</Text>
              <Text className="text-slate-400 text-xs mt-1">{item.fecha} • {item.duracion}</Text>
            </View>
          </View>
          
          <View className="items-end">
            <Text className="text-indigo-400 font-bold text-lg">Bs {item.total}</Text>
            <TouchableOpacity className="mt-1 bg-slate-800 px-2 py-1 rounded">
              <Text className="text-slate-300 text-[10px] uppercase font-bold">Ver Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View className="h-10" />
    </ScrollView>
  );
}