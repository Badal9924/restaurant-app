import cloudinary from "./Cloudinary";

const upLoadImageOnCloudinary = async (file:any) => {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    return uploadResponse.secure_url
}

export default upLoadImageOnCloudinary;