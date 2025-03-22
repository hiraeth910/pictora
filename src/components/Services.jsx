import './services.css';

const ServicesPage = () => {
  return (
    <div className="services-page" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Our Services & Detailed Pricing</h1>

      <section style={{ marginTop: '20px' }}>
        <h2>Course Creation and Sales</h2>
        <p>
          PICTORA empowers educators to easily create and sell courses on our platform. With our robust yet user-friendly system, you can generate a unique selling link instantly. For each course transaction, we charge a 13% fee which covers both the transaction cost and our platform fee.
        </p>
        <ul>
          <li>Fee: 13% per course transaction</li>
          <li>Instant selling link generation</li>
          <li>User-friendly course creation tools</li>
          <li>Secure payment processing</li>
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2>Digital Art Sales</h2>
        <p>
          For digital artists and creators, PICTORA offers a platform to showcase and sell your digital art. We charge up to an 11% fee per sale (subject to the specifics of each transaction), ensuring a seamless experience from upload to payment.
        </p>
        <ul>
          <li>Fee: Up to 11% per digital art transaction</li>
          <li>Dedicated platform for digital artwork</li>
          <li>Robust security measures</li>
          <li>Efficient payment processing</li>
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2>Additional Services</h2>
        <p>
          We are continuously expanding our service offerings. Future services may include additional monetization tools, enhanced marketing support, and advanced analytics to help you maximize your earnings. Please check this page regularly for updates.
        </p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h2>Important Notice</h2>
        <p>
          All pricing and fees are subject to change. We encourage you to review this page periodically for the latest updates on our pricing structure.
        </p>
      </section>
    </div>
  );
};

export default ServicesPage;
