import React from 'react';

const Testimonials = () => (
  <section className="bg-light py-5">
    <div className="container">
      <h4>What Our Users Say</h4>
      <div className="row mt-3">
        {[1,2,3].map(i => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="card p-3 h-100">
              <p>"Excellent experience! Sold my car in 2 days."</p>
              <p className="small text-muted">— Happy Seller {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
