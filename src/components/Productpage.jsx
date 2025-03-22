import { useParams } from 'react-router-dom';
import RazorpayButton from './PaymentButton';

const ProductPage = () => {
const params= useParams()
  const productId = params.productId || 'dsafj33i3';

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src="/path/to/your-product-image.jpg"
          alt="Product"
          style={{
            filter: 'blur(4px)',
            width: '300px',
            borderRadius: '8px'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem'
          }}
        >
          🔒
        </span>
      </div>
      <br />
 <RazorpayButton productId={productId} amount={1} />    </div>
  );
};

export default ProductPage;
