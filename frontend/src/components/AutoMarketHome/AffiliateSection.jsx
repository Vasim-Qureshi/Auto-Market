import React from 'react';

const AffiliateSection = () => (
  <section className="container py-4">
    <h4>Affiliate Offers</h4>
    <div className="row mt-3">
      <div className="col-md-6">
        <div className="border rounded p-3 text-center">
          <strong>Amazon Auto Accessories</strong>
          <p>Buy top car accessories — <a href="#">Shop Now</a></p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="border rounded p-3 text-center">
          <strong>Tyre & Oil Deals</strong>
          <p>Special offer links for auto partners — <a href="#">Claim Now</a></p>
        </div>
      </div>
    </div>
  </section>
);

export default AffiliateSection;
