import React from 'react';

const DealersSection = () => (
  <section className="bg-light py-5">
    <div className="container">
      <h4>Trusted Dealers</h4>
      <div className="row mt-3">
        {[1,2,3,4].map(i => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card p-3 text-center">
              <h6>Dealer {i}</h6>
              <p className="small text-muted">Jaipur</p>
              <button className="btn btn-sm btn-outline-secondary">View Dealer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DealersSection;
