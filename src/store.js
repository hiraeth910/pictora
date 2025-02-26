import { create } from "zustand";

const useAuthStore = create((set) => ({
  providertoken: localStorage.getItem("providerToken") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YzMzYmMzMC00NWNmLTRiNjgtYTkzNS02NGI1NDEwYjhjYjYiLCJyb2xlIjoid2FsbGV0X3VzZXIiLCJpYXQiOjE3NDA1ODUyMzMsImV4cCI6MTc0OTIyNTIzM30.rItjsColGyVfnNnqWRoTDWpzDcWONI6_N5U3LsU2fL8',
  name: localStorage.getItem("name") || null,
  mobileNumber: localStorage.getItem("mobileNumber") || null,
  role:localStorage.getItem("role")||null,

  setAuth: (providerToken=null, name=null, mobileNumber=null,role=null,token=null) => {
    localStorage.setItem("token", providerToken);
    localStorage.setItem('providertoken',token)
    localStorage.setItem("name", name);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("role",role)
    set({ providerToken, name, mobileNumber,role });
  },

  logout: () => {
    localStorage.removeItem("providerToken");
    localStorage.removeItem("name");
    localStorage.removeItem("mobileNumber");
    localStorage.removeItem('role')
    set({ token: null, name: null, mobileNumber: null ,role:null});
  },
}));

export default useAuthStore;
