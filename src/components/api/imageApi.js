// api/imageApi.js

import axiosInstance from "./axiosInstance";

/*
========================
Upload Image
POST /items-image
Body:
image → file
idItem → number
========================
*/
export const uploadImage = async (file, idItem) => {

  const formData = new FormData();

  formData.append("image", file);
  formData.append("idItem", idItem);

  const response = await axiosInstance.post(
    "/items-image",
    formData
  );

  return response.data;
};


/*
========================
Update Image
POST /items-image-update
Body:
image → file
idImage → number
========================
*/
export const updateImage = async (file, idImage) => {

  const formData = new FormData();

  formData.append("image", file);
  formData.append("idImage", idImage);

  const response = await axiosInstance.post(
    "/items-image-update",
    formData
  );

  return response.data;
};


/*
========================
Delete Image
DELETE /items-image
Body:
{
 idImage: number
}
========================
*/
export const deleteImage = async (idImage) => {

  const response = await axiosInstance.delete(
    "/items-image",
    {
      data: {
        idImage,
      },
    }
  );

  return response.data;
};