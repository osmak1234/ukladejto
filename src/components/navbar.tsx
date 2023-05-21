import { Box, Container, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { type NextPage } from "next";

const Navbar: NextPage = () => {
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
                  Veřejná místnost
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
              <Link href='/admin' >
                <Text fontSize='lg' fontWeight='bold' display='inline-flex' >
                  Založit
                </Text>
              </Link>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default Navbar;
