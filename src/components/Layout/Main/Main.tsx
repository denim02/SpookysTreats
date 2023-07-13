import HeroSection from "./HeroSection";
import heroImage from "../../../assets/hero-section-img.jpg";
import PAGE_DATA from "../../../sample-data";

import React from 'react';
import ProductsList from "../../Meals/ProductsList";

const Main: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        headerText={PAGE_DATA.heroSection.header}
        messageText={PAGE_DATA.heroSection.text}
      />

      {/* Menu */}
      <ProductsList products={PAGE_DATA.menuItems} />
    </main>
  );
};

export default Main;
