import {
  Box,
  Flex,
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

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { useSession, signIn, signOut } from "next-auth/react";

const Links = [
  {
    name: "Veřejná místnost",
    href: "/",
  },
  {
    name: "Vytvořit místnost",
    href: "/create",
  },
];

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userRooms = api.room.getJoinedRooms.useQuery();

  const { data: session } = useSession();

  const { push } = useRouter();

  return (
    <>
      <Box bg={"gray.900"} px={4} color="blue.50">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </HStack>
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
                <Box dir="row" display="flex" textAlign="center" gap={2}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={40}
                    height={40}
                    alt="user avatar"
                    src={
                      session?.user?.image ??
                      "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
                    }
                  />
                  <Box m="auto">
                    {session ? session.user?.name : "Click to log in"}
                  </Box>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem
                  color={"blue.50"}
                  bg={"blue.900"}
                  _hover={{ bg: "blue.800" }}
                  _active={{ bg: "blue.600" }}
                  onClick={() => {
                    session
                      ? signOut().catch(console.log)
                      : signIn("discord").catch(console.log);
                  }}
                >
                  {session ? "Sign Out" : "Sing In"}
                </MenuItem>
                <MenuDivider />
                {userRooms.data?.map((room) => (
                  <MenuItem
                    key={room.id}
                    color={"blue.50"}
                    bg={"blue.900"}
                    _hover={{ bg: "blue.800" }}
                    _active={{ bg: "blue.600" }}
                    onClick={() => {
                      push(`/room/${room.roomId}`).catch((e) => {
                        console.log(e);
                      });
                    }}
                  >
                    <Link href={`/room/${room.roomId}`}>{room.room.name}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
