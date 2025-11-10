import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedVehicles = () => {
  const navigate = useNavigate();

  const vehicles = [
    { id: 1, name: 'Hyundai i40', price: '₹12,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/v1762767984/vehicles/qd6xq0qym1vcbq1zq11p_b670e2.jpg' },
    { id: 2, name: 'BMW CAR', price: '₹39,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/aulayn25nuoyxbu5a8ee.jpg' },
    { id: "690b680f21765d418c77d9ab", name: 'Mahindra Loading', price: '₹15,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/exjuz5b35nccqy7xcbuy.jpg' },
    { id: "68dd42c19ff7e26d47ab857e", name: 'Maruti-Suzuki Wagon-R', price: '₹7,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/io1kgvvfhegkc1o5pa9l.jpg' },
    { id: 5, name: 'Mercedese Benz', price: '₹25,50,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/iui0ozhcwfgjgztz4vff.jpg' },
    { id: "68e155f14a8417f5a8e82459", name: 'Volvo Bus', price: '₹67,80,000', img: 'https://res.cloudinary.com/duzg7qsjz/image/upload/c_auto,h_250,w_400/vehicles/aahmakmdefh7lxvqwh9v.jpg' },
  ];

  const handleViewDetails = (id) => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate(`/vehicle/${id}`);  // ✅ Authenticated route
    } else {
      navigate('/login');          // ✅ Redirect to login
    }
  };

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
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleViewDetails(v.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
