import React from 'react';

const AffiliateSection = () => (
  <section className="container py-4">
    <h4>Affiliate Offers</h4>
    <div className="row mt-3">
      <div className="col-md-6">
        <div className="border rounded p-3 text-center">
          <strong>Amazon Auto Accessories</strong>
          <p>Buy top car accessories — <a target="_blank" href="https://www.amazon.in/s?k=Auto+Accessories&crid=35ALB99AW0QRJ&sprefix=auto+accessories%2Caps%2C546&ref=nb_sb_noss_1">Shop Now</a></p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="border rounded p-3 text-center">
          <strong>Tyre & Oil Deals</strong>
          <p>Special offer links for auto partners — <a target='_blank' href="https://www.amazon.in/s?k=tyre+and+oil&crid=MQE7XY4Y52LQ&sprefix=tyre+and+oi%2Caps%2C623&ref=nb_sb_noss_2">Claim Now</a></p>
        </div>
      </div>
    </div>
  </section>
);

export default AffiliateSection;
