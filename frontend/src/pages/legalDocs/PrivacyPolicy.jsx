import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container my-5" style={{ minHeight: "80vh", paddingBottom: "100px"}}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Privacy Policy</h2>

        <h5>1. Information We Collect</h5>
        <ul>
          <li>Personal details: Name, email, phone number, address.</li>
          <li>Vehicle details: Registration number, documents, photos.</li>
          <li>Technical info: IP address, browser data, cookies.</li>
        </ul>

        <h5>2. How We Use Information</h5>
        <ul>
          <li>To connect buyers and sellers.</li>
          <li>To verify authenticity of listings.</li>
          <li>To improve services and prevent fraud.</li>
        </ul>

        <h5>3. Data Sharing</h5>
        <p>
          We do not sell your data to third parties. Information may be shared
          with trusted partners (payment gateways, verification agencies, or
          legal authorities if required).
        </p>

        <h5>4. Data Security</h5>
        <p>
          We use encryption and security measures to protect your data. However,
          no system is 100% secure.
        </p>

        <h5>5. User Rights</h5>
        <p>
          You may request updates or deletion of your account anytime. You can
          also unsubscribe from marketing emails at any time.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
