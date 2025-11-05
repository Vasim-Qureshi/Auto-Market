import React from 'react';

const FeaturedVehicles = () => {
  const vehicles = [
    { id: 1, name: 'Hyundai Creta', price: '₹10,50,000', img: 'https://via.placeholder.com/400x250' },
    { id: 2, name: 'Honda City', price: '₹9,80,000', img: 'https://via.placeholder.com/400x250' },
  ];

  return (
    <section className="container py-5">
      <h3>Featured Vehicles</h3>
      <div className="row">
        {vehicles.map(v => (
          <div className="col-md-4 mb-3" key={v.id}>
            <div className="card h-100">
              <img src={v.img} className="card-img-top" alt={v.name} />
              <div className="card-body">
                <h5>{v.name}</h5>
                <p>{v.price}</p>
                <button className="btn btn-outline-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
