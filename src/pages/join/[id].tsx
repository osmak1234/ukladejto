import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Center, Button, Heading, Text, Box, Stack } from "@chakra-ui/react";
import Link from "next/link";

import { api } from "~/utils/api";

const RoomId = () => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const response = api.room.joinRoom.useMutation();
  const [status, setStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    setStatus(response.status);
  }, [response]);

  function handleJoinRoom() {
    response.mutate(roomId as string);
    setStatus("Joining room...");
    if (response.isSuccess) {
      setStatus("Joined room!");
    } else if (response.isError) {
      setStatus(response.error?.message.toString());
    }
  }

  return (
    <Box>
      <Center pt={70}>
        <Stack spacing={4} align="center" dir="column">
          <Heading>Room ID: {roomId}</Heading>
          {status === "idle" ? (
            <Button onClick={handleJoinRoom} colorScheme="blue">
              Join Room
            </Button>
          ) : (
            <Text>{status}</Text>
          )}
          <Text>{response.failureReason?.message} </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default RoomId;
