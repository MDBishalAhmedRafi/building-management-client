import React from 'react';
import Hero from '../../Components/Hero/Hero';
import BuildingInfo from '../../Components/About_The_Building/BuildingInfo';
import ApartmentMap from '../../Components/Location/ApartmentMap';
import Coupons from '../../Components/Coupons/Coupons';

const Home = () => {
                return (
                                <div>
                                           <Hero></Hero>
                                           <BuildingInfo></BuildingInfo>
                                           <Coupons></Coupons>
                                           <ApartmentMap></ApartmentMap>
                                </div>
                );
};

export default Home;