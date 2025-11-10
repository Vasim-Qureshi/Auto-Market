import React from 'react';

const SponsoredDeals = () => (
  <section className="container py-5">
    <h4>Sponsored Deals & Affiliate Offers</h4>
    <div className="row mt-3">
      <div className="col-md-6 mb-3">
        <div className="border p-3 rounded text-center bg-white">
          <strong>🔥 Car Loan Offers - Low Interest Rates!</strong>
          <p>Sponsored by XYZ Bank. <a target='_blank' href="https://www.hdfcbank.com/personal/tools-and-calculators/car-loan-emi-calculator">Apply Now</a></p>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="border p-3 rounded text-center bg-white">
          <strong>🛡️ Vehicle Insurance Partner</strong>
          <p>Save 25% with ABC Insurance. <a target='_blank' href="https://www.turtlemintinsurance.com/">Get Quote</a></p>
        </div>
      </div>
    </div>
  </section>
);

export default SponsoredDeals;
