//chakra ui
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// auth stuff
import { signIn, signOut, useSession } from "next-auth/react";

// next
import { useRouter } from "next/router";
import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

// trpc
import { api } from "~/utils/api";

const Navbar: NextPage = () => {
  const userRooms = api.room.getJoinedRooms.useQuery();
  console.log(userRooms.data);
  const { data: session } = useSession();

  const { push } = useRouter();
  return (
    <>
      <Box
        position="fixed"
        top="0"
        as="nav"
        h="70px"
        w="100%"
        css={{ backdropFilter: "blur(10px)" }}
        zIndex={2}
        alignSelf="start"
      >
        <Container display="flex">
          <Stack
            spacing={30}
            direction={"row"}
            display={"flex"}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link href="/">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Veřejná místnost
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link href="/join">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Připojit
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link href="/create">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Založit
                </Text>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Menu>
                <MenuButton>
                  <Stack
                    spacing={5}
                    direction={"row"}
                    display={"flex"}
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      style={{ borderRadius: "25px" }}
                      alt="profile picture"
                      src={
                        session?.user.image
                          ? session.user.image
                          : "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"
                      }
                      width={50}
                      height={50}
                    />
                    <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                      {session ? session.user?.name : "Anonymus"}
                    </Text>
                  </Stack>
                </MenuButton>
                <MenuList
                  color={"blue.50"}
                  bg={"blue.900"}
                  _hover={{ bg: "blue.800" }}
                  _active={{ bg: "blue.600" }}
                >
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
                  <Menu>
                    <MenuButton
                      color={"blue.50"}
                      bg={"blue.600"}
                      _hover={{ bg: "blue.700" }}
                      _active={{ bg: "blue.400" }}
                      as={Button}
                      size="sm"
                    >
                      My rooms
                    </MenuButton>
                    <MenuList
                      color={"blue.50"}
                      bg={"blue.600"}
                      _hover={{ bg: "blue.700" }}
                      _active={{ bg: "blue.400" }}
                    >
                      {userRooms.data?.map((room) => (
                        <MenuItem
                          key={room.id}
                          color={"blue.50"}
                          bg={"blue.900"}
                          _hover={{ bg: "blue.800" }}
                          _active={{ bg: "blue.600" }}
                          onClick={() => {
                            push(`/room/${room.roomId}`).catch(console.log);
                          }}
                        >
                          <Link href={`/room/${room.roomId}`}>
                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              display="inline-flex"
                            >
                              {room.room.name}
                            </Text>
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </MenuList>
              </Menu>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default Navbar;
