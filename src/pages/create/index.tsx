// next page
import type { NextPage } from "next";

//chakra
import { Heading, Text, Box, Input, Button } from "@chakra-ui/react";

//trpc
import { api } from "~/utils/api";

//session
import { useSession } from "next-auth/react";

//react
import { useState } from "react";

const CreateRoom: NextPage = () => {
  const { data: session } = useSession();
  const createRoom = api.room.createRoom.useMutation();
  const [roomName, setRoomName] = useState("");

  return (
    <>
      <Box pt={70} h="full">
        <Heading
          as={"h1"}
          size={"2xl"}
          color={"brand.text"}
          textAlign={"center"}
        >
          Create Room
        </Heading>

        <Box>
          {session ? (
            <>
              <Input
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Button
                onClick={() => {
                  createRoom.mutate(roomName);
                }}
                colorScheme="blue"
              >
                Create room
              </Button>
            </>
          ) : (
            <>
              <Text color={"brand.text"}>
                You are not signed in, sign in with the avatar in the navbar to
                create session
              </Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CreateRoom;
