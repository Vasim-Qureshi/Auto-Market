import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container" style={{ minHeight: "80vh", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Refund & Cancellation Policy</h2>

        <h5>1. Service Cancellation</h5>
        <p>
          Users can cancel premium services or paid listings before activation.
          Once a listing is live, fees are non-refundable.
        </p>

        <h5>2. Refunds</h5>
        <p>
          Refunds are processed only in case of double payment, technical error,
          or service failure from our side. No refunds for disputes between
          buyers and sellers.
        </p>

        <h5>3. How to Request Cancellation/Refund</h5>
        <p>
          Please email us at <b>support@yourwebsite.com</b> with your registered
          details and payment reference. Approved refunds will be processed
          within <b>7–10 business days</b>.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
