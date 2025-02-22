import axios from "axios"
import useAuthStore from "../store";

export const baseurl = 'https://server.telemoni.in'

export const apiClient = axios.create({
    baseURL:baseurl
})
export const endpoints={
     getUserdetails : '/api/user/consumer/login',
     getPayemntLink : '/api/payment/pay',
     productLink : '/api/user/get/productdetails/',
     telegramLink: '/api/payment/callback/',
     updateName:'/api/user/complete-profile',
     getpurchases:'/api/payment/get/user/purchases',
     providerlogin:'/api/auth/user/verifyotp'
    }
const getToken = () => useAuthStore.getState().token;

export const addPan = (data) => {
  const token = getToken();
  return apiClient.post("/api/user/add/pan", data, {
    headers: { authorization: token },
  });
};