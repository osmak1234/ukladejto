import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { api } from "~/utils/api";

import { useState } from "react";

import type { NextPage } from "next";

const CreateFlashcard: NextPage = () => {
  const createFlashcard = api.flashcards.createFlashcards.useMutation();
  const [deckName, setDeckName] = useState("");
  const [flashcardsArray, setFlashcardsArray] = useState([
    { front: "", back: "" },
  ]);

  const handleInputChange = (
    index: number,
    value: {
      front: string;
      back: string;
    }
  ) => {
    const newFlashcards = [...flashcardsArray];
    newFlashcards[index] = value;
    setFlashcardsArray(newFlashcards);
  };

  const handleDeleteCard = (index: number) => {
    const newFlashcards = [...flashcardsArray];
    newFlashcards.splice(index, 1);
    setFlashcardsArray(newFlashcards);
  };

  const handleAddCard = () => {
    setFlashcardsArray([...flashcardsArray, { front: "", back: "" }]);
  };

  const handleSubmit = () => {
    // fileter all the empty cards
    const withId = flashcardsArray
      .filter((card) => card.front !== "" && card.back !== "")
      .map((card) => {
        return { deckId: deckName, front: card.front, back: card.back };
      });
    if (withId.length > 0) {
      createFlashcard.mutate(withId);
    }
  };

  return (
    <Box>
      <Heading textAlign="center" mb={10}>
        Create Flashcard deck
      </Heading>
      <VStack spacing={5}>
        <Input
          placeholder="Deck Name"
          maxW={552}
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        {flashcardsArray.map((card, index) => (
          <HStack key={index}>
            <Input
              placeholder="Front Text"
              value={card.front}
              onChange={(e) =>
                handleInputChange(index, {
                  ...card,
                  front: e.target.value,
                })
              }
            />
            <Input
              placeholder="Back Text"
              value={card.back}
              onChange={(e) =>
                handleInputChange(index, {
                  ...card,
                  back: e.target.value,
                })
              }
            />
            <IconButton
              colorScheme="red"
              icon={<CloseIcon />}
              onClick={() => handleDeleteCard(index)}
              aria-label="Delete card"
            />
          </HStack>
        ))}
        <Button colorScheme="green" onClick={handleAddCard}>
          Add card
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateFlashcard;
