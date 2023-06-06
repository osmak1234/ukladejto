//chakra-ui
import {
  Input,
  Box,
  Heading,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";

//next router
import { useRouter } from "next/router";

//react
import { useEffect, useState } from "react";

//trpc
import { api } from "~/utils/api";

//components
import Uploadfile from "~/components/uploadfile";

//TODO: if the user is in the room, then show them the chat with the files displeyed on the side
//  <Box resize='width' width='100px' height='100px' overflow='auto' bg='pink.400' /> example of how to make a box resizable

// this code is good solution for waiting for the roomId, it's declared for later use
const Room = () => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const [message, setMessage] = useState("");
  const room = api.room.getRoom.useQuery(roomId as string);
  const initialMessages = api.chat.firstMessages.useQuery({
    roomId: router.query.id as string,
    limit: 10,
  });
  const [cursor, setCursor] = useState("");
  // const messages = api.chat.infiniteChat.useMutation();
  const sendMessage = api.chat.addMessage.useMutation();
  console.log(cursor);

  useEffect(() => {
    if (initialMessages.data?.nextCursor) {
      setCursor(initialMessages.data?.nextCursor);
    }
  }, [initialMessages.data?.nextCursor]);

  return (
    <Box pt={70}>
      <Heading>Room {room.data?.name}</Heading>
      <Box key="messages" overflowY="scroll" h="40vh">
        {initialMessages.data?.messages.map((message) => (
          <Box key={message.id}>
            <Text>{message.text}</Text>
            <Text>{message.userId}</Text>
          </Box>
        ))}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        gap={4}
      >
        <Popover>
          <PopoverTrigger>
            <Button colorScheme="blue">Upload file</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold" color="blue.50" bg="blue.900">
              Upload a file
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody bg="blue.900">
              <Uploadfile room={room.data?.id ? room.data.id : ""} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Input
          w="75%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
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
      </Box>
    </Box>
  );
};

export default Room;

// <HStack m="10%" spacing={4} align="center" dir="row">
//</HStack>
