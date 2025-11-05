import React from 'react';

const Newsletter = () => (
  <section className="container py-4">
    <div className="row align-items-center">
      <div className="col-md-8">
        <h5>Subscribe to Our Newsletter</h5>
        <p className="small text-muted">Get latest offers and auto market news in your inbox.</p>
      </div>
      <div className="col-md-4">
        <form className="d-flex gap-2">
          <input className="form-control" placeholder="Your email" />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </div>
  </section>
);

export default Newsletter;
