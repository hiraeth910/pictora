import { create } from "zustand";

const useAuthStore = create((set) => ({
  providerToken: localStorage.getItem("providerToken") || null,
  name: localStorage.getItem("name") || null,
  mobileNumber: localStorage.getItem("mobileNumber") || null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,

  setAuth: (providerToken = null, name = null, mobileNumber = null, role = null, token = null) => {
    if (providerToken) localStorage.setItem("providerToken", providerToken);
    if (token) localStorage.setItem("token", token);
    if (name) localStorage.setItem("name", name);
    if (mobileNumber) localStorage.setItem("mobileNumber", mobileNumber);
    if (role) localStorage.setItem("role", role);

    set({ providerToken, name, mobileNumber, role, token });
  },

  logout: () => {
    localStorage.removeItem("providerToken");
    localStorage.removeItem("name");
    localStorage.removeItem("mobileNumber");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    set({ providerToken: null, name: null, mobileNumber: null, role: null, token: null });
  },
}));

export default useAuthStore;
