import { Box, Button } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

import { api } from "~/utils/api";

import Flashcard from "~/components/flashcard";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      deckId: id,
    },
  };
};

const ViewFlashcard = ({ deckId }: { deckId: string }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  if (!deckId) {
    return <Box>Invalid deck id</Box>;
  }
  const flashCards = api.flashcards.getDeck.useQuery({
    id: deckId,
  }).data?.FlashCards;
  if (!flashCards) {
    return <Box>Invalid deck id</Box>;
  }
  const myCards = flashCards?.map((card) => {
    return {
      id: card.id,
      front: card.front,
      back: card.back,
    };
  });
  const length = myCards?.length;

  function nextRandomCard() {
    const randomCard = Math.floor(Math.random() * length);
    setFront(myCards[randomCard]?.front ?? "");
    setBack(myCards[randomCard]?.back ?? "");
  }

  return (
    <Box>
      <Flashcard frontText={front} backText={back} />

      <Button
        colorScheme="blue"
        onClick={() => {
          nextRandomCard();
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default ViewFlashcard;
