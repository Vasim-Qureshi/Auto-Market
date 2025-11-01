import React from "react";

const TermAndCondition = () => {
  return (
    <div className="container" style={{ minHeight: "80vh", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Terms & Conditions</h2>

        <h5>1. Introduction</h5>
        <p>
          Welcome to <b>[Your Website Name]</b>. By accessing or using our
          platform to buy, sell, or list old vehicles, you agree to comply with
          these Terms & Conditions. If you do not agree, please do not use our
          services.
        </p>

        <h5>2. Services Provided</h5>
        <p>
          We provide an online platform for users to list and discover old
          vehicles. We act only as an intermediary and are not responsible for
          the condition, quality, legality, or ownership of vehicles listed.
        </p>

        <h5>3. User Responsibilities</h5>
        <ul>
          <li>Provide accurate, complete, and truthful information.</li>
          <li>Verify ownership, documents, and condition of vehicles.</li>
          <li>
            Fraudulent, misleading, or illegal activity may result in account
            suspension or legal action.
          </li>
        </ul>

        <h5>4. Payments & Fees</h5>
        <p>
          Any service charges, listing fees, or commissions (if applicable) will
          be clearly displayed. Payments for premium services are non-refundable
          unless otherwise specified.
        </p>

        <h5>5. Limitation of Liability</h5>
        <p>
          We are not liable for disputes between buyers and sellers or for any
          losses, damages, or frauds arising from transactions.
        </p>

        <h5>6. Governing Law</h5>
        <p>
          These terms are governed by the laws of India. Any disputes shall be
          subject to jurisdiction in <b>[Your City/State]</b>.
        </p>
      </div>
    </div>
  );
};

export default TermAndCondition;
