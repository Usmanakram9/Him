import React from "react";
import { useDropzone } from "react-dropzone";
import useFileUploadStore from "../stores/fileUploadStore";

const FileUpload = () => {
  const { uploadFile, imagePath } = useFileUploadStore();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const uploadedImagePath = await uploadFile(file);
      console.log("Uploaded Image Path:", uploadedImagePath);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop an image file here, or click to select one</p>
        )}
      </div>
      {imagePath && <img src={imagePath} alt="Uploaded" />}
    </div>
  );
};

export default FileUpload;
