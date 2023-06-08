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
  useMediaQuery,
} from "@chakra-ui/react";

//next
import { useRouter } from "next/router";
import Image from "next/image";

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
  // router stuff (get data from the url)
  const router = useRouter();
  const { id: roomId } = router.query;
  //room data
  const room = api.room.getRoom.useQuery(roomId as string);
  // message data
  const [message, setMessage] = useState("");
  const initialMessages = api.chat.firstMessages.useQuery({
    roomId: router.query.id as string,
    limit: 10,
  });
  const [cursor, setCursor] = useState("");
  //const messages = api.chat.infiniteChat.useMutation();
  const sendMessage = api.chat.addMessage.useMutation();
  console.log(cursor);
  //get the files
  const files = api.file.getFilesInRoom.useQuery(roomId as string);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (initialMessages.data?.nextCursor) {
      setCursor(initialMessages.data?.nextCursor);
    }
  }, [initialMessages.data?.nextCursor]);

  return (
    <Box pt={70}>
      <Heading>Room {room.data?.name}</Heading>
      <Box display="flex" flexDirection={isLargerThan768 ? "row" : "column"}>
        <Box
          key="messages"
          bg="gray.700"
          borderRadius="8px"
          overflowY="scroll"
          h="40vh"
          w="full"
          m={2}
        >
          {initialMessages.data?.messages.map((message) => (
            <Box
              key={message.id}
              borderRadius="5px"
              bg="gray.600"
              p="2"
              borderColor="gray.500"
              borderWidth={1}
              m="2"
            >
              <Box display="flex" dir="row">
                <Image
                  style={{ borderRadius: "25px" }}
                  alt="user"
                  src={
                    message.user.image
                      ? message.user.image
                      : "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
                  }
                  width={50}
                  height={50}
                />
                <Text>{message.user.name}</Text>
              </Box>
              <Text>{message.text}</Text>
            </Box>
          ))}
        </Box>
        <Box
          key="files"
          overflow="scroll"
          h="40vh"
          w="full"
          bg="gray.700"
          borderRadius="8px"
          overflowY="scroll"
          m={2}
        >
          {files.data?.map((file) => {
            return (
              <Box
                key={file.id}
                borderRadius="5px"
                bg="gray.600"
                p="2"
                borderColor="gray.500"
                borderWidth={1}
                m="2"
              >
                <Text>{file.user.name}</Text>
                <Image
                  alt="file"
                  src={file.url}
                  width={200}
                  height={200}
                ></Image>
              </Box>
            );
          })}
        </Box>
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
