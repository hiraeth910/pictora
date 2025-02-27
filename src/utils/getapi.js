/* eslint-disable no-useless-catch */
import useAuthStore from "../store"
import { apiClient, endpoints } from "./endpoints"

const getProviderToken = () => useAuthStore.getState().providerToken;
export const getUser=async(phone,name,email)=>{
    try{
      const response =await apiClient.post(endpoints.getUserdetails,{phone:phone,name:name,email:email})
      if (response.status===200 || response.status===201){
        return response
      }else{
        return false
      }
    }catch(err){
        throw(err)
    }
}

export const getProduct=async(link)=>{
  try{
    const response =await apiClient.get(`${endpoints.productLink}${link}`)
    if (response.status===200 || response.status===201){
      return response
    }else{
      return false
    }
  }catch(err){
      throw(err)
  }
}

export const getTelegramLink = async (transId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await apiClient.get(`${endpoints.telegramLink}${transId}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 202 || response.status === 200 || response.status === 201) {
      return response.data; // Always return the response data
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const getPurchases = async (token) => {
   try {
        const response = await apiClient.get(
          endpoints.getpurchases,
         
          { headers: { Authorization: token } }
        );
      return response.data;}
        catch(err){
          console.log(err)
        }
}

export const updateDetails = async(name,phone)=>{
  try{
    const r = await apiClient.post(endpoints.updateName,{name:name,phone:phone})
    if(r.status===200){
      return 'y'
    }
    else{return 'x'}
  }catch(err){
    throw err
  }
}


export const fetchCourses = async () => {
  try {
    const token = getProviderToken();
    if (!token) throw new Error("No provider token found");

    const response = await apiClient.get("/api/provider/courses", {
      headers: { Authorization: token },
    });

    return response.data.courses; // Assuming the API returns { success: true, courses: [...] }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};



export const submitBankDetails = async (bankData) => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.post(endpoints.addbankaccount, bankData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Success response
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const getBankAccounts = async () => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.get(endpoints.getbankaccounts, {
      headers: { Authorization: token },
    });

    return response.data; // Returns list of bank accounts
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const deleteBankAccount = async (textId) => {
  try {
    const token = await getProviderToken();
    const response = await apiClient.delete(`${endpoints.deleteBankAccount}?id=${textId}`, {
      headers: { Authorization: token }, // Send token in headers
    });

    if (response.status!==200) {
      throw new Error(await response.text());
    }
    return await response.message;
  } catch (error) {
    return { error: error.message };
  }
};



export const raiseWithdrawal = async (request) => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.post(endpoints.raisewithdrawl, request, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const getWithdrawalHistory = async (id) => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.get(`${endpoints.withdrawlhistory}${id}`, {
      headers: { Authorization: token },
    });

    return response.data; // Returns list of transactions
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const getBalance = async () => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.get(endpoints.getwalletbalance, {
      headers: { Authorization: token },
    });

    return response.data; // Returns balance data
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};
export const getPanVerification = async () => {
  try {
    const token = await getProviderToken(); // Get token from secure storage
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.get(endpoints.getstatus, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return parsed data
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch Status");
  }
};
