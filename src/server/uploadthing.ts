/** server/uploadthing.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();
import { api } from "~/utils/api";

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: "16MB" },
    blob: { maxFileSize: "16MB" },
  })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // get the current user from the session
      const user = { id: 1 };
      if (!user) {
        throw new Error("You must be logged in to upload files");
      }
      return {
        userId: user.id,
      };
    })
    .onUploadComplete(({ metadata, file }) => {
      api.file.newFile.useQuery({ url: file.url });
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
