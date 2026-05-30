import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TicketScreen() {
  const [minutes, setMinutes] = useState(45); // Simulamos que lleva 45 min estacionado
  const [showQR, setShowQR] = useState(false);
  const tarifaPorMinuto = 0.50; // Bs 0.50 por minuto

  // Simulador del reloj (solo visual para el prototipo)
  useEffect(() => {
    const interval = setInterval(() => setMinutes(m => m + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const totalPagar = (minutes * tarifaPorMinuto).toFixed(2);

  return (
    <ScrollView className="flex-1 bg-slate-950 px-6 pt-4" showsVerticalScrollIndicator={false}>
      
      {/* 🤖 PLACEHOLDER SPRINT 2 (IA/ALPR) - Banner de detección */}
      <View className="bg-emerald-900/40 border border-emerald-500/50 rounded-xl p-3 mb-6 flex-row items-start">
        <View className="mt-1">
          <FontAwesome name="camera" size={16} color="#34d399" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-emerald-400 font-bold text-sm">Escaneo IA Exitoso</Text>
          <Text className="text-emerald-200/70 text-xs mt-1">
            La cámara ALPR detectó tu placa (LPZ-123) en la barrera principal. Tu tiempo ha comenzado a correr.
          </Text>
        </View>
      </View>
      {/* -------------------------------------------------- */}

      {/* Título */}
      <View className="mb-6 items-center">
        <Text className="text-slate-400 uppercase tracking-widest text-xs font-bold">Ticket Digital</Text>
        <Text className="text-white text-2xl font-bold mt-1">Sesión Activa</Text>
      </View>

      {/* Tarjeta de Monitoreo de Tiempo (HU18) */}
      <View className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl items-center relative overflow-hidden">
        {/* Adorno visual */}
        <View className="absolute -right-10 -top-10 opacity-5">
          <FontAwesome name="clock-o" size={150} color="#ffffff" />
        </View>

        <Text className="text-slate-400 text-sm mb-2">Tiempo Transcurrido</Text>
        <Text className="text-white text-5xl font-bold tracking-tighter mb-1">
          {Math.floor(minutes / 60).toString().padStart(2, '0')}:
          {(minutes % 60).toString().padStart(2, '0')}
          <Text className="text-xl text-slate-500"> hs</Text>
        </Text>
        
        <View className="w-full h-[1px] bg-slate-800 my-4" />

        <View className="w-full flex-row justify-between items-center mb-2">
          <Text className="text-slate-400">Lugar Asignado:</Text>
          <Text className="text-white font-bold text-lg">Zona A - Espacio A1</Text>
        </View>
        <View className="w-full flex-row justify-between items-center">
          <Text className="text-slate-400">Tarifa Actual:</Text>
          <Text className="text-indigo-400 font-bold text-xl">Bs {totalPagar}</Text>
        </View>
      </View>

      {/* Botones de Pago (HU08 y HU11) */}
      <Text className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-3 ml-1">Opciones de Salida</Text>
      
      <TouchableOpacity 
        className="w-full bg-indigo-600 rounded-2xl p-4 flex-row justify-center items-center mb-4 shadow-lg shadow-indigo-900/20"
        activeOpacity={0.8}
        onPress={() => setShowQR(true)}
      >
        <FontAwesome name="qrcode" size={24} color="#ffffff" className="mr-3" />
        <Text className="text-white font-bold text-lg ml-3">Pagar ahora con QR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 flex-row justify-center items-center mb-10"
        activeOpacity={0.8}
      >
        <FontAwesome name="credit-card" size={20} color="#94a3b8" className="mr-3" />
        <Text className="text-slate-300 font-bold text-lg ml-3">Pagar con Tarjeta</Text>
      </TouchableOpacity>

      {/* Modal / Popup del QR Dinámico */}
      <Modal visible={showQR} transparent animationType="slide">
        <View className="flex-1 justify-end bg-slate-950/80">
          <View className="bg-slate-900 rounded-t-3xl p-6 items-center border-t border-slate-800">
            <Text className="text-white text-xl font-bold mb-2">Escanea para pagar</Text>
            <Text className="text-slate-400 mb-6 text-center">Paga Bs {totalPagar} antes de salir para que la barrera se abra automáticamente.</Text>
            
            {/* Aquí iría el componente real del QR generado por el banco */}
            <View className="w-64 h-64 bg-white rounded-2xl justify-center items-center mb-6">
              <FontAwesome name="qrcode" size={150} color="#000000" />
            </View>

            <TouchableOpacity 
              className="w-full bg-slate-800 p-4 rounded-xl items-center border border-slate-700"
              onPress={() => setShowQR(false)}
            >
              <Text className="text-slate-300 font-bold">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}