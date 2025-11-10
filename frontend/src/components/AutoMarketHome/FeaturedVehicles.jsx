import React from 'react';

const FeaturedVehicles = () => {
  const vehicles = [
    { id: 1, name: 'Hyundai i40', price: '₹12,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/v1762767984/vehicles/qd6xq0qym1vcbq1zq11p_b670e2.jpg' },
    { id: 2, name: 'BMW CAR', price: '₹39,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/aulayn25nuoyxbu5a8ee.jpg' },
    { id: 3, name: 'Mahindra Loading', price: '₹15,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/exjuz5b35nccqy7xcbuy.jpg' },
    { id: 4, name: 'Maruti-Suzuki Wagon-R', price: '₹7,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/io1kgvvfhegkc1o5pa9l.jpg' },
    { id: 5, name: 'Mercedese Benz', price: '₹25,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/iui0ozhcwfgjgztz4vff.jpg' },
    { id: 6, name: 'Volvo Bus', price: '₹67,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/aahmakmdefh7lxvqwh9v.jpg' },

  ];

  return (
    <section className="container py-5">
      <h4>Featured Vehicles</h4>
      <div className="row">
        {vehicles.map(v => (
          <div className="col-md-4 mb-3" key={v.id}>
            <div className="card h-100">
              <img src={v.img} className="card-img-top p-2" alt={v.name} />
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
