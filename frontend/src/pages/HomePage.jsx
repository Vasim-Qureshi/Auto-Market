// File: pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Trucks', image: 'https://trucksuvidha.com/Images/Best-Truck-Transportion-Service-In-India.jpg', type: 'truck' },
  { name: 'Minibuses', image: 'https://production.autoforce.com/uploads/version/profile_image/7061/comprar-executive_80472075dd.png', type: 'minibus' },
  { name: 'Buses', image: 'https://png.pngtree.com/thumb_back/fw800/background/20230707/pngtree-d-render-of-a-white-coach-tour-bus-driving-towards-pointer-image_3802595.jpg', type: 'bus' },
  { name: 'Cars', image: 'https://purepng.com/public/uploads/large/purepng.com-audiaudicarluxurious-carprofessional-carwhite-audired-audi-1701527409329eg09e.png', type: 'car' },
];

const HomePage = () => {


  return (
    <div className="container-fluid my-5 py-5 bg-light" style={{ maxHeight: '80vh', overflowY: 'auto', paddingBottom: '60px' }}>
      <h2 className="text-center mb-4">Vehicle Categories</h2>
      <div className="row">
        {categories.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.type}>
            <div className="card h-100">
              <img src={cat.image} className="card-img-center h-100" alt={cat.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{cat.name}</h5>
                <Link to={`/${cat.type}`} className="btn btn-primary">
                  Browse {cat.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
