"use client";

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
}

/* prettier-ignore */
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange, value])

	return ( 
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="q8n7r8v4"
      options={{
        maxFiles: 1
      }}
    >
      {
        ({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              items-center
              justify-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-xl">
              Click to upload
            </div>
            {
              value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )
            }
          </div>
        )
        }
      }
    </CldUploadWidget>
   );
};

export default ImageUpload;
