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
<<<<<<< Updated upstream

//next router
import { useRouter } from "next/router";

//react
import { useState } from "react";
=======
//next
import Image from "next/image";
import type { GetServerSideProps } from "next";

//react
import { useEffect, useState } from "react";
//pdf viewer
>>>>>>> Stashed changes

import { Document, Page } from "react-pdf";
//trpc
import { api } from "~/utils/api";

//components
import Dropbox from "~/components/dropbox";

<<<<<<< Updated upstream
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

//TODO: if the user is in the room, then show them the chat with the files displeyed on the side
//  <Box resize='width' width='100px' height='100px' overflow='auto' bg='pink.400' /> example of how to make a box resizable
=======
//eslint-disable-next-line
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      roomId: id,
    },
  };
};
>>>>>>> Stashed changes

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

  //pdf viewer
  return (
    <Box pt={70}>
<<<<<<< Updated upstream
      <Heading>Room {room.data?.name}</Heading>
      <Box key="messages">
        {messages.data?.map((message) => (
          <Box key={message.id}>
            <Text>{message.text}</Text>
            <Text>{message.userId}</Text>
          </Box>
        ))}
=======
      <Heading>
        Room{" "}
        {room.isLoading
          ? "Loading ..."
          : room.data?.name
          ? room.data.name
          : "Room doesn't exist"}
      </Heading>
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
                <Text mt="auto" mb="auto" ml="10px">
                  {message.user.name}
                </Text>
              </Box>
              <Text mt="5px" mb="auto" ml="10px">
                {message.text}
              </Text>
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
            // check the last 3 characters of the file name
            const fileType = file.url.split(".").pop();
            if (fileType == "pdf") {
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
                  <Box display="flex" dir="row">
                    <Image
                      width={50}
                      height={50}
                      alt="profile picture"
                      style={{ borderRadius: "25px" }}
                      src={
                        file.user.image
                          ? file.user.image
                          : "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
                      }
                    />
                    <Text mt="auto" mb="auto" ml="10px">
                      {file.user.name}
                    </Text>
                  </Box>
                  <Document file={file.url}>
                    <Page />
                  </Document>
                </Box>
              );
            } else {
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
                  <Box display="flex" dir="row">
                    <Image
                      width={50}
                      height={50}
                      alt="profile picture"
                      style={{ borderRadius: "25px" }}
                      src={
                        file.user.image
                          ? file.user.image
                          : "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
                      }
                    />
                    <Text mt="auto" mb="auto" ml="10px">
                      {file.user.name}
                    </Text>
                  </Box>
                  <Image
                    alt="file"
                    src={file.url}
                    width={200}
                    height={200}
                  ></Image>
                </Box>
              );
            }
          })}
        </Box>
>>>>>>> Stashed changes
      </Box>
      <Box>
        <HStack m="10%" spacing={4} align="center" dir="row">
          {/* for some weird reason I can't use brand colors in the Popover*/}
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="blue">Upload</Button>
            </PopoverTrigger>
            <PopoverContent borderRadius={0}>
              <PopoverCloseButton color="blue.50" />
              <PopoverHeader color="blue.50" bg="blue.900">
                Upload a file
              </PopoverHeader>
              <PopoverBody bg="blue.900">
                <Dropbox />
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
