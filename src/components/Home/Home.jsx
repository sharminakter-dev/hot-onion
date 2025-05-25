import React from 'react';
import Hero from '../Hero/Hero';
import Categories from '../Categories/Categories';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import { Routes, Route, Link } from "react-router";

const Home = () => {
    return (
        <div>
            <Hero/>
            <Categories/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;