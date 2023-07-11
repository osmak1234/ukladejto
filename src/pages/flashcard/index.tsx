// chakra-ui
import { Box } from "@chakra-ui/react";

// next
import { type NextPage } from "next";
import { useRouter } from "next/router";

//api
import { api } from "~/utils/api";

// this page is just for testing, will be used in the future
const FlashcardPage: NextPage = () => {
  const myDecks = api.flashcards.getDecks.useQuery();
  const router = useRouter();
  return (
    <Box pt={70} className="page">
      {myDecks.data?.map((deck) => (
        <Box
          key={deck.id}
          onClick={() => {
            router.push(`/flashcard/view/${deck.id}`).catch((e) => {
              console.log(e);
            });
          }}
        >
          {deck.name}
        </Box>
      ))}
    </Box>
  );
};

export default FlashcardPage;
