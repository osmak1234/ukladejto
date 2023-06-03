/** server/uploadthing.ts */
import { type NextApiRequest, type NextApiResponse } from "next";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
<<<<<<< Updated upstream
  imageUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image", "video"])
    .maxSize("4MB")
    .middleware(async (req, res) => {
      // This code runs on your server before upload
      const user = await auth(req, res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
=======
  imageUploader: f({ image: { maxFileSize: "16MB" } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(({ file }) => {
>>>>>>> Stashed changes
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:");

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
