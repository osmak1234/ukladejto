import { Box, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import Flashcard from "~/components/flashcard";


const FlashcardPage: NextPage = () => {
  return (
    <Box pt={70} className="page">
      <Flashcard
        frontText={"Front"}
        backText={"Back"}
      />
    </Box>
  );
};

export default FlashcardPage;
