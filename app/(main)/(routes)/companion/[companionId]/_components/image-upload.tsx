"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

export const ImageUpload = () => {
  const handleUpload = useCallback((result: any) => {}, []);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset=""
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div className="w-full flex justify-center items-center">
            <div
              onClick={() => open?.()}
              className="flex justify-center mt-4 border-dashed border-4 border-primary/10 rounded-lg hover:opacity-75 transition w-52 h-44 cursor-pointer"
            >
              <span className="pt-4">
                <Image
                  style={{ borderRadius: "0.75rem" }}
                  src="/placeholder.svg"
                  alt="placeholder"
                  width={170}
                  height={260}
                />
              </span> 
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
