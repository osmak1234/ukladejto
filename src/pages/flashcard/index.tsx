// chakra-ui
import { Box } from "@chakra-ui/react";

// next
import { type NextPage } from "next";

// components
import Flashcard from "~/components/flashcard";

// this page is just for testing, will be used in the future
const FlashcardPage: NextPage = () => {
  return (
    <Box pt={70} className="page">
      <Flashcard frontText={"Auf Wiedersehen"} backText={"Naschledanou"} />
    </Box>
  );
};

export default FlashcardPage;
