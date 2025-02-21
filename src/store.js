import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,

      setUsername: (name) => set({ username: name }),
      setLoggedIn: (status) => set({ isLoggedIn: status }),

      logout: () => set({ username: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // Key name in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;
