// components
import { Box, Button, Container, Text, Stack, Menu, MenuItem, MenuList, MenuButton, Wrap } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// session
import { signIn, signOut, useSession } from "next-auth/react";

//types
import { type NextPage } from "next";

const Navbar: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Box
        position='fixed'
        top='0'
        as='nav'
        w='100%'
        css={{ backdropFilter: "blur(10px)" }
        }
        zIndex={2}
        alignSelf='start'
      >
        <Container display='flex' >
          <Stack
            spacing={30}
            direction={"row"}
            display={"flex"}
            w='full'
            alignItems='center'
            justifyContent='center'
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href='/' >
                <Text fontSize='lg' fontWeight='bold' display='inline-flex' >
                  Veřejná místnos
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href='/join' >
                <Text fontSize='lg' fontWeight='bold' display='inline-flex' >
                  Přpipojit
                </Text>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href='/create' >
                <Text fontSize='lg' fontWeight='bold' display='inline-flex' >
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
                    w='full'
                    alignItems='center'
                    justifyContent='center'

                  >
                    <Image style={{ borderRadius: "25px" }} alt="profile picture" src={session ? session.user?.image! : "https://uploadthing.com/f/60192848-4796-495f-85c1-9eedac5c3369_anonym.webp"} width={50} height={50} />
                    <Text fontSize='lg' fontWeight='bold' display='inline-flex' >{session ? session.user?.name : "Anonymus"}
                    </Text>
                  </Stack>
                </MenuButton>
                <MenuList
                  color={"brand.text"}
                  bg={"brand.main"}
                  _hover={{ bg: "brand.hover" }}
                  _active={{ bg: "brand.pressed" }}

                >
                  <MenuItem
                    color={"brand.text"}
                    bg={"brand.main"}
                    _hover={{ bg: "brand.hover" }}
                    _active={{ bg: "brand.pressed" }}
                    onClick={() => {
                      session ? signOut().catch(console.log) : signIn("discord").catch(console.log);
                    }}
                  >{session ? "Sign Out" : "Sing In"}</MenuItem>
                  <MenuItem
                    color={"brand.text"}
                    bg={"brand.main"}
                    _hover={{ bg: "brand.hover" }}
                    _active={{ bg: "brand.pressed" }}
                  >Settings</MenuItem>
                  <MenuItem
                    color={"brand.text"}
                    bg={"brand.main"}
                    _hover={{ bg: "brand.hover" }}
                    _active={{ bg: "brand.pressed" }}
                  >My rooms</MenuItem>
                </MenuList>
              </Menu>
            </motion.div>
          </Stack>
        </Container>
      </Box >
    </>
  );
};
export default Navbar;
