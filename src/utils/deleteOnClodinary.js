import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteOnCloudinary = async (oldImageId, resource_type = "image") => {
  try {
    await cloudinary.uploader.destroy(oldImageId, {
      resource_type: resource_type,
    });
  } catch (error) {
    (error) => console.log(error);
  }
};
export { deleteOnCloudinary };

// cloudinary.uploader.destroy('existing-image-public-id', function(error, result) {
//   if (error) {
//     console.log('Error deleting image:', error);
//   } else {
//     console.log('Old image deleted:', result);

//     // Now upload the new image
//     cloudinary.uploader.upload('path-to-new-image.jpg', {
//       public_id: 'existing-image-public-id'
//     }, function (error, result) {
//       if (error) {
//         console.log('Error uploading new image:', error);
//       } else {
//         console.log('New image uploaded:', result);
//       }
//     });
//   }
// });
