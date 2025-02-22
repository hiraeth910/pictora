import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  name: localStorage.getItem("name") || null,
  mobileNumber: localStorage.getItem("mobileNumber") || null,
  role:localStorage.getItem("role")||null,

  setAuth: (token, name=null, mobileNumber,role=null) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("role",role)
    set({ token, name, mobileNumber });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("mobileNumber");
    localStorage.removeItem('role')
    set({ token: null, name: null, mobileNumber: null ,role:null});
  },
}));

export default useAuthStore;
