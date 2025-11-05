import React from 'react';

const SearchFilter = () => (
  <section className="container my-4">
    <div className="bg-white shadow-sm p-3 rounded">
      <div className="row g-2">
        <div className="col-md-3"><input className="form-control" placeholder="Vehicle Type" /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Brand / Model" /></div>
        <div className="col-md-2"><input className="form-control" placeholder="Year" /></div>
        <div className="col-md-2"><input className="form-control" placeholder="Max Price" /></div>
        <div className="col-md-2 d-grid"><button className="btn btn-primary">Search</button></div>
      </div>
    </div>
  </section>
);

export default SearchFilter;
