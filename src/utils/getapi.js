/* eslint-disable no-useless-catch */
import useAuthStore from "../store"
import { apiClient, endpoints } from "./endpoints"

const getProviderToken = () => useAuthStore.getState().providerToken;
const getToken =()=>useAuthStore.getState().token;
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
      throw new Error(await response.message);
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
export const getCourseDetails = async (courseId) => {
  try {
    const response = await apiClient.get(`${endpoints.getCourseDetails}/${courseId}`);

    if (response.status!==200) {
      throw new Error('no course found');
    }

    return await response.data;
  } catch (error) {
    return { error: error.message };
  }
};
export const buyCourse = async (courseId) => {
  try {
    const token = getToken();
    const response = await apiClient.post(
      endpoints.buycourse,
      { courseId }, // Include courseId in the request body
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to purchase course");
    }

    return response.data; // Return response data if successful
  } catch (err) {
    return { error: err.message };
  }
};

export const getUserCourses = async () => {
  const token = getToken(); // Get user token

  try {
    const response = await apiClient.get("/api/user/purchases", {
      headers: { authorization: token }, // Send authorization token
    });
    return response.data.courses; // Return course data
  } catch (error) {
    console.error("Error fetching user courses:", error);

    // Handle different error cases
    if (error.response) {
      // Server responded with an error status
      return { error: error.response.data.error || "Failed to fetch courses." };
    } else if (error.request) {
      // Request was made but no response received
      return { error: "No response from server. Please check your connection." };
    } else {
      // Something else went wrong
      return { error: "An unexpected error occurred." };
    }
  }
};
export const getpaidcourse = async (courseId, token) => {
  try {
    const response = await apiClient.get(`${endpoints.getPaidDetails}${courseId}`, {
      headers: { authorization: token },
    });

    return response.data; // Returns { isPurchased, course }
  } catch (error) {
    console.error("Error fetching course details:", error);

    if (error.response) {
      return { error: error.response.data.error || "Failed to fetch course details." };
    } else if (error.request) {
      return { error: "No response from server. Please check your connection." };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};
export const createCourse = async (courseData) => {
  try {
    const token = await getProviderToken();
    if (!token) throw new Error("Token is null. Please login again.");

    const response = await apiClient.post(endpoints.createCourse, courseData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json", // Ensure correct content type
      },
    });
    
    return response.data.message==="Course created successfully"; // Return the API response
  } catch (error) {
    console.error("Error creating course:", error);
    throw error; // Propagate the error
  }
};
export const getProductPrice = async (link) => {
  try {
    const response = await apiClient.get(`${endpoints.getProductPrice}/${link}`);

    // HTTP 200 returns product price
    if (response.status === 200) {
      return { price: response.data.price };
    }

    // If not 200, throw an error to be caught below
    throw new Error(response.data.error || "Unknown error occurred.");
  } catch (error) {
    // Return error message from API or a default message
    return { error: error.response?.data?.error || error.message || "Failed to fetch product price." };
  }
};
export const getProductInfo = async (productId, token) => {
  try {
    const response = await apiClient.post(
      `${endpoints.getProductInfo}`,
      { productId, userId: "YOUR_USER_ID" }, // Ensure to pass the actual userId here
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return response.data; // Returns either { link, channel_name } or { ppu }
    }

    throw new Error(response.data.error || "Error retrieving product info.");
  } catch (error) {
    return { error: error.response?.data?.error || error.message || "Failed to fetch product info." };
  }
};