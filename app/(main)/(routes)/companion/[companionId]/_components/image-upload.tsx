import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  onUpload: (result: any) => void;
}

export const ImageUpload = ({ imageUrl, onUpload }: ImageUploadProps) => {
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
            className="flex justify-center mt-4 border-dashed border-4 border-primary/10 rounded-lg hover:opacity-75 transition w-52 h-52 cursor-pointer"
          >
            <div className="my-auto relative w-40 h-40 -z-[1]">
              {imageUrl ? (
                <Image
                  className="rounded-lg object-cover"
                  src={imageUrl}
                  alt="Ai profile picture"
                  fill
                />
              ) : (
                <Image
                  className="rounded-lg object-cover"
                  src="/placeholder.svg"
                  alt="Ai profile picture"
                  fill
                />
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
