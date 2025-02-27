import { create } from "zustand";

const useAuthStore = create((set) => ({
  providerToken: localStorage.getItem("providerToken") || null,
  name: localStorage.getItem("name") || null,
  mobileNumber: localStorage.getItem("mobileNumber") || null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  consumerName: localStorage.getItem("consumerName")||null,

  setAuth: (providerToken = null, name = null, mobileNumber = null, role = null, token = null,consumerName=null) => {
    if (providerToken) localStorage.setItem("providerToken", providerToken);
    if (token) localStorage.setItem("token", token);
    if (name) localStorage.setItem("name", name);
    if (mobileNumber) localStorage.setItem("mobileNumber", mobileNumber);
    if (role) localStorage.setItem("role", role);
    if (consumerName) localStorage.setItem('consumerName',consumerName)
    set({ providerToken, name, mobileNumber, role, token ,consumerName});
  },

  logout: () => {
    localStorage.removeItem("providerToken");
    localStorage.removeItem("name");
    localStorage.removeItem("mobileNumber");
    localStorage.removeItem("role");
    
    set({ providerToken: null, name: null, mobileNumber: null, role: null,  });
  },
  consumerLogout:()=>{

    localStorage.removeItem("token");
    localStorage.removeItem('consumerName');
    set({consumerName:null,token:null})
  }
}));

export default useAuthStore;
