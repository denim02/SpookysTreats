import React from "react";

interface HeroSectionProps {
  backgroundImage: string;
  headerText: string;
  messageText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  headerText,
  messageText,
}) => {
  const messageParagraphs = messageText.split("\n");

  return (
    <section
      id="hero-section"
      className="bg-fixed bg-cover h-80 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-hero-card-color text-white text-center py-4 px-2 w-3/4 max-w-3xl absolute -translate-x-1/2 left-1/2 -bottom-32 rounded-2xl drop-shadow-2xl shadow-2xl">
        <h2 className="capitalize text-2xl font-bold mb-5">{headerText}</h2>
        <div className="mb-4 space-y-3">
          {messageParagraphs.map((paragraph, index) => (
            <p className="font-light" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
