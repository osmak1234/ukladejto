import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Center, Button, Heading, Text, Box, Stack } from "@chakra-ui/react";
import Link from "next/link";

import { api } from "~/utils/api";

const RoomId = () => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const response = api.room.joinRoom.useMutation();
  const [status, setStatus] = useState("");

  function handleJoinRoom() {
    response.mutate(roomId as string);
    setStatus(response.status);
  }

  return (
    <Box>
      <Center pt={70}>
        <Stack spacing={4} align="center" dir="column">
          <Heading>Room ID: {roomId}</Heading>
          <Button onClick={handleJoinRoom} colorScheme="blue">
            Join Room
          </Button>
          <Text>{status ? status : ""}</Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default RoomId;
