// chakra-ui
import { Box, Heading } from "@chakra-ui/react";

// next
import { type NextPage } from "next";
import { useRouter } from "next/router";

//api
import { api } from "~/utils/api";

import { useSession } from "next-auth/react";

// this page is just for testing, will be used in the future
const FlashcardPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const myDecks = api.flashcards.getDecks.useQuery();
  if (status === "loading") {
    return (
      <Box margin="auto" textAlign="center" pt="100px" w="full" h="full">
        Loading...
      </Box>
    );
  }
  return (
    <Box pt={70} className="page">
      {myDecks.data?.map((deck) => (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"50px"}
          key={deck.id}
          maxW={"400px"}
          m={"auto"}
          mt={4}
          borderRadius={"md"}
          border={"1px solid"}
          _hover={{
            borderColor: "whiteAlpha.800",
          }}
          onClick={() => {
            router.push(`/flashcard/view/${deck.id}`).catch((e) => {
              console.log(e);
            });
          }}
        >
          <Heading
            _hover={{
              color: "brand.400",
            }}
            size={"lg"}
          >
            {deck.name}
          </Heading>
        </Box>
      ))}
    </Box>
  );
};

export default FlashcardPage;
