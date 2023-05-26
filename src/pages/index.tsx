import { signIn, signOut, useSession } from "next-auth/react";
import { type NextPage } from "next";
import { Heading, Text, Button, Box, Center } from "@chakra-ui/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box margin="auto" textAlign="center" pt="100px">
        Loading...
      </Box>
    );
  }

  return (
    <Box pt={70}>
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
