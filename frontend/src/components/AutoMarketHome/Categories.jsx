import React from 'react';

const Categories = () => (
  <section className="bg-light py-4">
    <div className="container text-center">
      <h4>Browse by Categories</h4>
      <div className="row mt-3" style={{justifyContent:"center"}}>
        {['Cars', 'Bikes', 'Trucks', 'Buses', 'Commercial'].map(cat => (
          <div className="col-6 col-md-2" key={cat}>
            <div className="border p-3 rounded bg-white">{cat}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
