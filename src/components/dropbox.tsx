// ChakraUI
import { Box } from "@chakra-ui/react";

// React
// import { useEffect, useState } from "react";

//upload component
import { UploadButton } from "@uploadthing/react";

// trp router for the upload endpoint
import type { OurFileRouter } from "../server/uploadthing";

// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

let showalert = false;
let threwerror = false;

export default function Dropbox() {
  return (
    <Box pt={70}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
            showalert = true;
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
            threwerror = true;
            showalert = false;
          }}
        />
      </main>
      {showalert ? (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>Success!</AlertTitle>
          <AlertDescription>Your upload is complete.</AlertDescription>
        </Alert>
      ) : null}
      {threwerror ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>
            There was an error with your upload.
          </AlertDescription>
        </Alert>
      ) : null}
    </Box>
  );
}
