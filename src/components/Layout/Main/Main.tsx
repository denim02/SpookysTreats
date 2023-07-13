import HeroSection from "./HeroSection";
import heroImage from "../../../assets/hero-section-img.jpg";
import React, { ReactElement, useEffect } from "react";
import ProductsList from "../../Meals/ProductsList";
import useHttp from "../../../hooks/use-http";
import Product from "../../../models/Product";

const heroSectionText =
  "Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.\nAll our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs.";

const Main: React.FC = () => {
  const { data, isAwaiting, error, sendRequest } = useHttp<Product[]>(
    "https://spooky-treats-default-rtdb.europe-west1.firebasedatabase.app/products.json"
  );

  useEffect(() => {
    void sendRequest();
  }, [sendRequest]);

  let content: string | ReactElement = "No products are currently available...";

  if (isAwaiting) content = "Loading...";
  else if (data && data.length > 0 && !error)
    content = <ProductsList products={data} />;
  else if (error) content = error;

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        headerText={"Delicious food, delivered to you"}
        messageText={heroSectionText}
      />

      {/* Menu */}
      <div className="mt-48 mb-12">{content}</div>
    </main>
  );
};

export default Main;
