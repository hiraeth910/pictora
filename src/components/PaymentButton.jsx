import PropTypes from 'prop-types';
import { apiClient, endpoints } from '../utils/endpoints';

const RazorpayButton = ({ productId,amount }) => {
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
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Unable to load Razorpay SDK. Check your connection.');
      return;
    }

    const orderResponse = await apiClient.post(endpoints.getorderId, {
                productId:productId
              });

    const orderData =  orderResponse.data;
    if (!orderData.orderId) {
      alert('Server error. Unable to create order.');
      return;
    }

    const options = {
      key: 'rzp_live_6VoH4dV355Dftw', // Ensure fallback value
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Your Company Name',
      description: `Payment for product ${productId}`,
      order_id: orderData.orderId,
      handler: function (response) {
        fetch('/api/paymentStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        })
          .then((res) => res.json())
          .then(() => alert('Payment Successful!'));
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <button onClick={handlePayment}>Pay Now{amount}</button>;
};

 RazorpayButton.propTypes = {
  productId: PropTypes.string.isRequired, // Ensures productId is always a required string
  amount:PropTypes.number.isRequired
};

export default RazorpayButton;
