import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const customTheme = extendTheme({
    colors: {
      brand: {
        bg: "blue.900",
        main: "blue.400",
        text: "blue.50",
        border: "cyan.400",
        hover: "blue.500",
        pressed: "blue.600",
      },
    },

    styles: {
      global: {
        body: {
          bg: "gray.900",
          color: "blue.50",
        },
        html: {
          scrollBehavior: "smooth",
          height: "100%",
        },
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
