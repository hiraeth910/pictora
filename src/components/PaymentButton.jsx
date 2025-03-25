import PropTypes from 'prop-types';
import { apiClient, endpoints } from '../utils/endpoints';
import useAuthStore from '../store';
import './ShinyButton.css';
const RazorpayButton = ({ productId,amount }) => {
    const { token } = useAuthStore();
const phone = localStorage.getItem('phone')
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    let authToken = token || localStorage.getItem('token');
    if (!authToken) {
      window.location.href = '/c/login/';
      return;
    }
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Unable to load Razorpay SDK. Check your connection.');
      return;
    }

   const orderResponse = await apiClient.post(
    endpoints.getorderId,
    { productId: productId },  // Request body
    {
        headers: {
            Authorization:token  // Adding Authorization header
        }
    }
);

    const orderData =  orderResponse.data;
    if (!orderData.orderId) {
      alert('Server error. Unable to create order.');
      return;
    }

    const options = {
      key: 'rzp_live_6VoH4dV355Dftw', // Ensure fallback value
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Pictora',
      description: `Payment for product ${productId}`,
      order_id: orderData.orderId,
     handler: function (response) {
  apiClient.post('/api/paymentStatus', response)
    .then((res) => {
      
        window.location.reload();
      
      

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

,
      prefill: {
        name: 'Customer Name',
        contact: phone||'9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return  <button className="shiny-button" onClick={handlePayment}>
      Pay {amount}
    </button>;
};

 RazorpayButton.propTypes = {
  productId: PropTypes.string.isRequired, // Ensures productId is always a required string
  amount:PropTypes.number.isRequired
};

export default RazorpayButton;
