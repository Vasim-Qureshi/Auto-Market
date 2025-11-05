import React from 'react';
import Navbar from '../components/AutoMarketHome/Navbar';
import HeroSection from '../components/AutoMarketHome/HeroSection';
import SearchFilter from '../components/AutoMarketHome/SearchFilter';
import FeaturedVehicles from '../components/AutoMarketHome/FeaturedVehicles';
import Categories from '../components/AutoMarketHome/Categories';
import SponsoredDeals from '../components/AutoMarketHome/SponsoredDeals';
import CompareSection from '../components/AutoMarketHome/CompareSection';
import DealersSection from '../components/AutoMarketHome/DealersSection';
import BlogSection from '../components/AutoMarketHome/BlogSection';
import Testimonials from '../components/AutoMarketHome/Testimonials';
import AdvertisementSection from '../components/AutoMarketHome/AdvertisementSection';
import AffiliateSection from '../components/AutoMarketHome/AffiliateSection';
import SponsorshipSection from '../components/AutoMarketHome/SponsorshipSection';
import Newsletter from '../components/AutoMarketHome/Newsletter';
import Footer from '../components/AutoMarketHome/Footer';

const AutoMarketHome = () => (
  <>
    <Navbar />
    <HeroSection />
    <SearchFilter />
    <FeaturedVehicles />
    <Categories />
    <SponsoredDeals />
    <CompareSection />
    <DealersSection />
    <BlogSection />
    <Testimonials />
    <AdvertisementSection />
    <AffiliateSection />
    <SponsorshipSection />
    <Newsletter />
    <Footer />
  </>
);

export default AutoMarketHome;
