//chakra-ui
import { Box, Heading } from "@chakra-ui/react";

//next router
import { useRouter } from "next/router";

//react
import { useEffect, useState } from "react";

//trpc
import { api } from "~/utils/api";

//TODO: check if the user is in the Room
//TODO: if the user is in the room, then show them the chat with the files displeyed on the side
//  <Box resize='width' width='100px' height='100px' overflow='auto' bg='pink.400' /> example of how to make a box resizable
//
const Room = () => {
  const router = useRouter();
  const { id: roomId } = router.query;

  return (
    <Box pt={70}>
      <Heading>Room {roomId}</Heading>
      <Box
        resize="horizontal"
        width="100px"
        height="100px"
        overflow="auto"
        bg="pink.400"
      />
    </Box>
  );
};

export default Room;
