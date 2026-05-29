import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Estacionamiento',
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <TabBarIcon name="sliders" color={color} />,
        }}
      />
    </Tabs>
  );
}
