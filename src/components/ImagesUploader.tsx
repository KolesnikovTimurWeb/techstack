'use client'

import { toast } from "react-toastify";
import { UploadDropzone } from "./UploadDropzone";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import "@/styles/Editor.scss"

interface ImagesUploaderProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const ImagesUploader = ({ onChange, endpoint }: ImagesUploaderProps) => {
  return (
    <UploadDropzone
    className="dropzone"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast(error.message, { position: "top-center" });
      }}
    />
  );
};