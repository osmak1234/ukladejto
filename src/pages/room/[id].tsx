//chakra-ui
import {
  Input,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";

//next router
import { useRouter } from "next/router";

//react
import { useState } from "react";

//trpc
import { api } from "~/utils/api";

//TODO: if the user is in the room, then show them the chat with the files displeyed on the side
//  <Box resize='width' width='100px' height='100px' overflow='auto' bg='pink.400' /> example of how to make a box resizable

// this code is good solution for waiting for the roomId, it's declared for later use
const Room = () => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const [message, setMessage] = useState("");
  const room = api.room.getRoom.useQuery(roomId as string);
  const messages = api.chat.getChat.useQuery(
    useRouter().asPath.toString().slice(6)
  );
  const sendMessage = api.chat.addMessage.useMutation();

  return (
    <Box pt={70}>
      <Heading>Room {room.data?.name}</Heading>
      <Box key="messages">
        {messages.data?.map((message) => (
          <Box key={message.id}>
            <Text>{message.text}</Text>
            <Text>{message.userId}</Text>
          </Box>
        ))}
      </Box>
      <Box>
        <HStack m="10%" spacing={4} align="center" dir="row">
          <Input
            w="75%"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage.mutate({
                  roomId: roomId as string,
                  message: message,
                });
                setMessage("");
              }
            }}
          ></Input>
          <Button
            colorScheme="blue"
            w="25%"
            onClick={() => {
              sendMessage.mutate({
                roomId: roomId as string,
                message: message,
              });
              setMessage("");
            }}
          >
            Send message
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Room;
