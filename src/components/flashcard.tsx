import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, Button, Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

const cardVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.35 },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.35 },
  },
};

const Flashcard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box position="relative" onClick={handleCardClick} cursor="pointer">
      <MotionBox
        w="300px"
        h="300px"
        bg="blue"
        borderRadius="md"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        variants={cardVariants}
        animate={!isFlipped ? 'front' : 'back'}
        hidden={isFlipped}
      >
        <Heading color="brand.text">{frontText}</Heading>
      </MotionBox>
      <MotionBox
        w="300px"
        h="300px"
        bg="blue"
        borderRadius="md"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        variants={cardVariants}
        animate={isFlipped ? 'front' : 'back'}
        hidden={!isFlipped}
      >
        <Heading color="brand.text">{backText}</Heading>
      </MotionBox>
    </Box>
  );
};

export default Flashcard;
