//chakra-ui
import { Box, Heading, Text } from "@chakra-ui/react";

//next router
import { useRouter } from "next/router";

//react
//import { useEffect, useState } from "react";

//trpc
import { api } from "~/utils/api";

//TODO: if the user is in the room, then show them the chat with the files displeyed on the side
//  <Box resize='width' width='100px' height='100px' overflow='auto' bg='pink.400' /> example of how to make a box resizable

// this code is good solution for waiting for the roomId, it's declared for later use
const Room = () => {
  const roomData = api.room.getRoom.useQuery(useRouter().query.toString());
  const router = useRouter();
  const { id: roomId } = router.query;

  return (
    <Box pt={70}>
      <Heading>Room {roomId}</Heading>
      <Text>{roomData.status}</Text>
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
