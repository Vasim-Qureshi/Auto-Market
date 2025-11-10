// File: pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/AutoMarketHome/HeroSection';
import SearchFilter from '../components/AutoMarketHome/SearchFilter';
import FeaturedVehicles from '../components/AutoMarketHome/FeaturedVehicles';
import SponsoredDeals from '../components/AutoMarketHome/SponsoredDeals';
import CompareSection from '../components/AutoMarketHome/CompareSection';
import DealersSection from '../components/AutoMarketHome/DealersSection';
import BlogSection from '../components/AutoMarketHome/BlogSection';
import Testimonials from '../components/AutoMarketHome/Testimonials';
import AdvertisementSection from '../components/AutoMarketHome/AdvertisementSection';
import AffiliateSection from '../components/AutoMarketHome/AffiliateSection';
import SponsorshipSection from '../components/AutoMarketHome/SponsorshipSection';
import Newsletter from '../components/AutoMarketHome/Newsletter';

const categories = [
  { name: 'Trucks', image: 'https://trucksuvidha.com/Images/Best-Truck-Transportion-Service-In-India.jpg', type: 'truck' },
  { name: 'Minibuses', image: 'https://production.autoforce.com/uploads/version/profile_image/7061/comprar-executive_80472075dd.png', type: 'minibus' },
  { name: 'Buses', image: 'https://png.pngtree.com/thumb_back/fw800/background/20230707/pngtree-d-render-of-a-white-coach-tour-bus-driving-towards-pointer-image_3802595.jpg', type: 'bus' },
  { name: 'Cars', image: 'https://purepng.com/public/uploads/large/purepng.com-audiaudicarluxurious-carprofessional-carwhite-audired-audi-1701527409329eg09e.png', type: 'car' },
];

const HomePage = () => {


  return (
    <div className="container-fluid" style={{ maxHeight: '80vh', overflowY: 'auto', margin: "50px 0 90px 0" }}>
      <HeroSection />
      <SearchFilter />
      <FeaturedVehicles />
      <div className='container'>
        <h4>Browse by Categories</h4>
        <div className="row">
          {categories.map((cat) => (
            <div className="col-md-4 col-lg-6 mb-4" key={cat.type}>
              <div className="card text-center h-100" style={{ padding: '5px' }}>
                <div className='card-body'>
                  <img src={cat.image} className="card-img-top" alt={cat.name} />
                </div>
                <div className="card-footer">
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
      <SponsoredDeals />
      <CompareSection />
      <DealersSection />
      <BlogSection />
      <Testimonials />
      <AdvertisementSection />
      <AffiliateSection />
      <SponsorshipSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;
