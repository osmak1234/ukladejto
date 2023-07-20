import React, { useRef, useEffect, useState, CSSProperties } from "react";
import { motion } from "framer-motion";

interface FlashcardsProps {
  className?: string;
}

interface CardStyle {
  [key: string]: CSSProperties;
}

const Flashcards: React.FC<FlashcardsProps> = ({ className }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = () => {
    setSelectedCard(selectedCard === null ? 1 : null);
  };

  const flashcardsStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    background: "#4da6ff",
  };

  const containerStyle: CSSProperties = {
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflowX: "scroll",
    perspective: "150px",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  const cardStyle: CardStyle = {
    position: "relative",
    display: "inline-block",
    height: "200px",
    width: "150px",
    background: "white",
    margin: "0 1rem",
  };

  const selectedCardStyle: CardStyle = {
    ...cardStyle,
    transform: "rotateY(180deg)",
  };

  const frontStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
  };

  const backStyle: CSSProperties = {
    ...frontStyle,
    transform: "translate(-50%, -50%) rotateY(180deg)",
    zIndex: 1,
  };

  return (
    <div className={`flashcards ${className}`} style={flashcardsStyle}>
      <div className="flashcards__container" style={containerStyle}>
        <motion.div
          className={`card ${selectedCard === 1 ? "selected" : ""}`}
          onClick={handleCardClick}
          variants={cardVariants}
          animate={selectedCard === 1 ? "selected" : "notSelected"}
          custom={0}
          style={selectedCard === 1 ? selectedCardStyle : cardStyle}
        >
          <div className="front" style={frontStyle}>
            FRONT
          </div>
          <div className="back" style={backStyle}>
            BACK
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcards;
