import { FC, useEffect, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
  selectedFile?: File | null;
  setSelectedFile: (value: File | null) => void;
  fileType?: "image" | "video" | null;
  setFileType: (value: "image" | "video" | null) => void;
  setThumbnail: (value: File | null) => void;
}

const PostFileInput: FC<Props> = ({
  selectedFile,
  setSelectedFile,
  fileType,
  setFileType,
  setThumbnail,
}) => {
  const videoUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
    };
  }, []);

  const getFileType = (type: string): "image" | "video" | null => {
    if (type.startsWith("image/")) {
      return "image";
    } else if (type.startsWith("video/")) {
      return "video";
    }
    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        event.target.value = "";
        setSelectedFile(null);
        setFileType(null);
        return;
      }
      setSelectedFile(file);

      const fileType = getFileType(file.type);
      setFileType(fileType);

      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }

      videoUrlRef.current = URL.createObjectURL(file);

      if (fileType === "video") {
        const videoElement = document.createElement("video");
        videoElement.src = videoUrlRef.current;
        videoElement.addEventListener("loadeddata", () => {
          videoElement.currentTime = 0.5;
        });
        videoElement.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              setThumbnail(blob as File);
            }
          }, "image/jpeg");
        });
      } else {
        setThumbnail(null);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-lg font-light text-white">File</p>
      <label className="flex h-[400px] w-[400px] flex-col items-center justify-center space-y-2 rounded-2xl border-[2.5px] border-dashed border-gray-500 hover:cursor-pointer hover:bg-gray-900">
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, video/mp4"
          onChange={handleFileChange}
        />
        {selectedFile && fileType === "image" ? (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Uploaded file"
            width={170}
            height={170}
          />
        ) : selectedFile && fileType === "video" ? (
          <video
            src={videoUrlRef.current || ""}
            className="h-72 w-72"
            controls
          />
        ) : (
          <PlusIcon className="h-20 w-20 text-gray-400" />
        )}
        <p className="text-sm font-light text-gray-400">.jpg .jpeg .png .mp4</p>
        <p className="text-sm font-light text-gray-400">&lt;10mb</p>
      </label>
    </div>
  );
};

export default PostFileInput;
