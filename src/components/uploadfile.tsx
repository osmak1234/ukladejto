// ChakraUI
import { Box } from "@chakra-ui/react";

// React
// import { useEffect, useState } from "react";

//upload component
import { UploadButton } from "@uploadthing/react";

// trp router for the upload endpoint
import type { OurFileRouter } from "~/server/uploadthing";

// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";

//trpc
import { api } from "~/utils/api";

// Session stuff
import { useSession } from "next-auth/react";

export default function UploadFile({ room }: { room: string }) {
  const { data: session } = useSession();
  const fileUpload = api.file.newFile.useMutation();
  return (
    <Box pt={70}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (session?.user?.id && room) {
              res?.map((file) => {
                fileUpload.mutate({
                  userId: session?.user?.id,
                  url: file.fileUrl,
                  roomId: room,
                });
              });
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    </Box>
  );
}
