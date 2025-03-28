import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RazorpayButton from "./PaymentButton";
import "./ProductPage.css";
import useAuthStore from "../store";
import { getProductInfo, getProductPrice } from "../utils/getapi";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

const ProductPage = () => {
  const { token } = useAuthStore();
  const { productId: paramProductId } = useParams();
  const productId = paramProductId || "dsafj33i3";
  const [price, setPrice] = useState();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      if (token) {
        data = await getProductInfo(productId, token);
      } else {
        data = await getProductPrice(productId);
        if (data.price) {
          setPrice(data.price);
        }
      }
      if (data.error) {
        setError(data.error);
      } else {
        setProductData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [productId, token]);

  const copyLink = () => {
    if (productData?.link) {
      navigator.clipboard.writeText(productData.link);
      alert("Link copied to clipboard");
    }
  };

  // New: Handle link click for iOS devices
  const handleLinkClick = (e) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS && productData?.link) {
      e.preventDefault();
      window.location.href = productData.link;
    }
  };

  const handlePaymentStarted = () => {
    setLoading(true);
  };

  return (
    <div className="product-page-container">
      {loading ? (
        <div className="lottie-loader">
          <Lottie animationData={loaderAnimation} loop={true} />
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}

          {(!productData || (!productData.image && !productData.link)) && (
            <div className="product-image-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rsUa5E3LL5eRE0kNwqZIrrH0Jqiq3LqGsrKWkKQuprva7HT929oXIQCEgxBUbtKvOuA&usqp=CAU"
                alt="Locked product"
                className="product-image"
              />
              <span className="lock-icon">🔒</span>
            </div>
          )}

          {productData?.image && (
            <div className="product-image-container">
              <img
                src={productData.image}
                alt={productData.message}
                className="product-image-unlocked"
              />
              <p className="product-message">{productData.message}</p>
            </div>
          )}

          {productData?.link && productData.channel_name ? (
            <div className="card-container">
              {/* Desktop Card */}
              <div className="desktop-card">
                <h2 className="card-title">
                  Channel: {productData.channel_name}
                </h2>
                <p className="card-link">
                  <a
                    href={productData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncated-link"
                    title={productData.link}
                    onClick={handleLinkClick}
                  >
                    {productData.link}
                  </a>
                  <button onClick={copyLink} className="copy-btn">
                    Copy
                  </button>
                </p>
              </div>
              {/* Mobile Card */}
              <div className="mobile-card">
                <h2 className="card-title">{productData.channel_name}</h2>
                <p className="card-note">Here’s your link:</p>
                <p className="card-link">
                  <a
                    href={productData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncated-link"
                    title={productData.link}
                    onClick={handleLinkClick}
                  >
                    {productData.link}
                  </a>
                  <button onClick={copyLink} className="copy-btn">
                    Copy
                  </button>
                </p>
              </div>
            </div>
          ) : productData?.ppu ? (
            <RazorpayButton
              productId={productId}
              amount={productData.ppu}
              onPaymentStarted={handlePaymentStarted}
            />
          ) : (
            price && (
              <div className="button-container">
                <RazorpayButton
                  productId={productId}
                  amount={price}
                  onPaymentStarted={handlePaymentStarted}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
