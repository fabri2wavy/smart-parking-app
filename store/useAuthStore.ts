import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  session: any | null;
  userPlate: string | null;
  setSession: (session: any, plate: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      userPlate: null,
      setSession: (session, plate) => set({ session, userPlate: plate }),
      clearSession: () => set({ session: null, userPlate: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
