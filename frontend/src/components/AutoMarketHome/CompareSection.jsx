import React from 'react';

const CompareSection = () => (
  <section className="container py-5">
    <h4>Compare Vehicles</h4>
    <div className="bg-white shadow-sm p-3 rounded">
      <div className="d-flex gap-2 flex-wrap">
        <input className="form-control" placeholder="Vehicle 1" />
        <input className="form-control" placeholder="Vehicle 2" />
        <input className="form-control" placeholder="Vehicle 3" />
        <button className="btn btn-outline-primary">Compare</button>
      </div>
    </div>
  </section>
);

export default CompareSection;
