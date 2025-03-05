import axios from "axios"
import useAuthStore from "../store";

export const baseurl = 'https://server.pictora.in'
// export const baseurl = 'http://localhost:80'

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
     providerlogin:'/api/auth/user/verifyotp',
     getwalletbalance:'/api/provider/get/wallet/balance',
     raisewithdrawl:'/api/provider/raise/withdrawl',
     getbankaccounts:'/api/provider/get/bankaccounts',
     withdrawlhistory:'/api/provider/wallet/transactions/',
     addbankaccount:'/api/provider/add/bank',
     deleteBankAccount:'/api/provider/delete/bankaccount',
     getstatus:"/api/user/status",
     getCourseDetails:'/api/user/course',
     buycourse:'/api/user/buy/course',
          getPaidDetails:'/api/user/c/',
          createCourse:'/api/provider/add/course'

    }
const getToken = () => useAuthStore.getState().providerToken;

export const addPan = (data) => {
  const token = getToken();
  return apiClient.post("/api/user/add/pan", data, {
    headers: { authorization: token },
  });
};