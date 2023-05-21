import { signIn, signOut, useSession } from "next-auth/react";
import { type NextPage } from "next";
import { Heading, Text, Button, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <>
      <Heading
        as={"h1"}
        size={"2xl"}
        color={"brand.text"}
        textAlign={"center"}
      >Public Room</Heading>
      <Box>
        {session ? (
          <>
            <Text color={"brand.text"}>hi {session.user?.name}</Text>
            <Button
              color={"brand.text"}
              bg={"brand.main"}
              _hover={{ bg: "brand.hover" }}
              _active={{ bg: "brand.pressed" }}
              onClick={() => {
                signOut().catch(console.log);
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Text>To view the room you have to sign in</Text>
            <Button
              color={"brand.text"}
              bg={"brand.main"}
              _hover={{ bg: "brand.hover" }}
              _active={{ bg: "brand.pressed" }}
              onClick={() => {
                signIn("discord").catch(console.log);
              }}
            >
              Login with Discord
            </Button>
          </>

        )}
      </Box>
    </>
  );
};

export default Home;
