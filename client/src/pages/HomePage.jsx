import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ServiceList from "../components/ServiceList";
import Teams from "../components/Teams";
import FAQ from "../components/FAQ";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ServiceList />
      <Teams />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
