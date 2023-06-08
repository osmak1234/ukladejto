import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";

// next
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

// trpc
import { api } from "~/utils/api";

import { useEffect, useState } from "react";
const Links = [
  {
    name: "Veřejná místnost",
    url: "/",
  },
  {
    name: "Založit",
    url: "/create",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userRooms = api.room.getJoinedRooms.useMutation();
  console.log(userRooms.data);
  const { data: session } = useSession();

  const [pfp, setPfp] = useState(
    "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
  );

  return (
    <>
      <Box bg={"gray.900"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Link href={link.url} key={link.name}>
                {link.name}
              </Link>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Image
                  style={{ borderRadius: "25px" }}
                  alt="profile picture"
                  src={pfp}
                  width={50}
                  height={50}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      if (session?.user.id) {
                        signOut().catch((e) => {
                          console.log(e);
                        });
                      } else {
                        signIn("discord").catch((e) => {
                          console.log(e);
                        });
                      }
                    }}
                  >
                    {session?.user.id ? "Odhlásit se" : "Přihlásit se"}
                  </Button>
                </MenuItem>
                <MenuDivider />
                {userRooms.data?.map((room) => {
                  return <MenuItem key={room.id}></MenuItem>;
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link key={link.name} href={link.url}>
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
