// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// chakra-ui
import { Center, Button, Heading, Text, Box, Stack } from "@chakra-ui/react";

// next
// import Link from "next/link";

// trpc backed
import { api } from "~/utils/api";

// this code is a bit messy, needs to be refactored like ~/src/pages/room/[id].tsx
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
