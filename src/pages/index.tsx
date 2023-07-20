import { useSession } from "next-auth/react";

import {
  Box,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box margin="auto" textAlign="center" pt="100px" w="full" h="full">
        Loading...
      </Box>
    );
  }
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Sdlílení školních materiálů se stalo{" "}
          <Text as={"span"} color={"blue.400"}>
            jednodušším
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Už nikdy neztratíš své materiály a budeš mít přehled o všech
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme="blue"
            bg={"blue.400"}
            _hover={{ bg: "blue.500" }}
          >
            Vytvořit místost
          </Button>
          <Button rounded={"full"} px={6}>
            Připojit se do místnosti
          </Button>
        </Stack>
        <Flex w={"full"}></Flex>
      </Stack>
    </Container>
  );
}
