// next auth
import { useSession } from "next-auth/react";

// next
import { type NextPage } from "next";

// chakra-ui
import { Heading, Text, Box } from "@chakra-ui/react";

// trpc backend
// import { api } from "../utils/api";

// this component is used for testing the upload before they implement pdfs and we can use it
const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box margin="auto" textAlign="center" pt="100px" w="full" h="full">
        Loading...
      </Box>
    );
  }

  return (
    <Box pt={70} h="full">
      <Heading as={"h1"} size={"2xl"} color={"brand.text"} textAlign={"center"}>
        Public Room
      </Heading>

      <Box>
        {session ? (
          <>
            <Text color={"brand.text"}>hi {session.user?.name}</Text>
            <Text>You are in: </Text>
          </>
        ) : (
          <>
            <Text color={"brand.text"}>
              You are not signed in, sign in with the avatar in the navbar
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
