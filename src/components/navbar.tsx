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
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const Navbar: NextPage = () => {
  const userRooms = api.room.getJoinedRooms.useQuery();
  console.log(userRooms.data);
  const { data: session } = useSession();
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
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Veřejná místnost
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/join">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Připojit
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/create">
                <Text fontSize="lg" fontWeight="bold" display="inline-flex">
                  Založit
                </Text>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                <MenuList>
                  <MenuItem
                    color={"brand.text"}
                    bg={"brand.main"}
                    _hover={{ bg: "brand.hover" }}
                    _active={{ bg: "brand.pressed" }}
                    onClick={() => {
                      session
                        ? signOut().catch(console.log)
                        : signIn("discord").catch(console.log);
                    }}
                  >
                    {session ? "Sign Out" : "Sing In"}
                  </MenuItem>
                  <Menu>
                    <MenuButton as={Button} size="sm">
                      My rooms
                    </MenuButton>
                    <MenuList>
                      {userRooms.data?.map((room) => (
                        <MenuItem key={room.id}>
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
