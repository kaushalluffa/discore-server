import { imagekit } from "../constants";

export default async function deleteImageKitFile(fileId: string) {
  imagekit.deleteFile(fileId, function (error, result) {
    if (error) console.log(error);
    else console.log(result);
  });
}
