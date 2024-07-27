"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "./UploadDropzone";
import { toast } from "react-toastify";
import "@/styles/Editor.scss"

interface ImagesUploaderProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
const ImageUploadButton = ({ onChange, endpoint }: ImagesUploaderProps) => {
  return (
    <div>
      <UploadButton
        className="custom-class"
        appearance={{
          button({ ready, isUploading }) {
            return `custom-button ${ready ? "custom-button-ready" : "custom-button-not-ready"
              } ${isUploading ? "custom-button-uploading" : ""}`;
          },
          container: "custom-container",
          allowedContent: "custom-allowed-content",
        }}
        endpoint="profilePicture"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast(error.message, { position: "top-center" });
        }}
      />
    </div>
  )
}

export default ImageUploadButton
