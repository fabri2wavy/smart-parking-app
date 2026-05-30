import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1', // indigo-500
        tabBarInactiveTintColor: '#64748b', // slate-500
        tabBarStyle: {
          backgroundColor: '#0f172a', // slate-950
          borderTopColor: '#1e293b', // slate-800
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#0f172a', // slate-950
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Parqueo',
          tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="ticket"
        options={{
          title: 'Estadía',
          tabBarIcon: ({ color }) => <FontAwesome name="car" size={20} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={22} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Mi Cuenta',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}