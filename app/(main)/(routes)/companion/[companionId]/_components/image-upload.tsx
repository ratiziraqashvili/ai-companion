import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
    imageUrl: string;
    onUpload: any;
}

export const ImageUpload = ({ imageUrl,  onUpload }: ImageUploadProps) => {
  return (
    <CldUploadWidget
      onUpload={onUpload}
      uploadPreset="zkrzbng5"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
            <div
              onClick={() => open?.()}
              className="flex justify-center mt-4 border-dashed border-4 border-primary/10 rounded-lg hover:opacity-75 transition w-60 h-56 cursor-pointer"
            >
              <span className="my-auto">
                {imageUrl ? (
                  <Image
                    style={{ borderRadius: "0.75rem" }}
                    src={imageUrl}
                    alt="Ai profile picture"
                    width={170}
                    height={260}
                    objectFit="cover"
                  />
                ) : (
                    <Image 
                    style={{ borderRadius: "0.75rem" }}
                    src="/placeholder.svg" 
                    alt="Ai profile picture" 
                    width={180}
                    height={260}
                    objectFit="cover"
                  />
                )}
              </span>
            </div>
        );
      }}
    </CldUploadWidget>
  );
};
