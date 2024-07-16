"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { api } from "~/utils/react";

import PostFileInput from "./PostFileInput";
import PrimaryButton from "~/app/_components/PrimaryButton";
import TextInput from "~/app/_components/TextInput";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [caption, setCaption] = useState("");

  const router = useRouter();

  const createPost = api.post.createPost.useMutation({
    onSuccess() {
      router.replace("/user/home");
    },
  });

  const submit = async () => {
    if (!selectedFile && !caption) {
      return false;
    }

    setIsLoading(true);

    let inputs: any = {};

    if (caption !== "") {
      inputs.caption = caption;
    }

    if (fileType) {
      inputs.fileType = fileType;
    } else {
      inputs.fileType = "text";
    }

    if (selectedFile) {
      const fileFormData = new FormData();

      fileFormData.append("file", selectedFile);
      fileFormData.append("upload_preset", "ahluettu");

      let file = "";

      await axios
        .post(
          `https://api.cloudinary.com/v1_1/ddvaattcn/${fileType}/upload`,
          fileFormData,
        )
        .then((response) => {
          file = response.data["secure_url"];
        });

      inputs.file = file;

      if (fileType === "video" && thumbnail) {
        const tnFormData = new FormData();

        tnFormData.append("file", thumbnail);
        tnFormData.append("upload_preset", "ahluettu");

        let tn = "";

        await axios
          .post(
            "https://api.cloudinary.com/v1_1/ddvaattcn/image/upload",
            tnFormData,
          )
          .then((response) => {
            tn = response.data["secure_url"];
          });

        inputs.thumbnail = tn;
      }
    }

    await createPost.mutateAsync(inputs);

    setIsLoading(false);
  };

  return (
    <main className="space-y-7">
      <PostFileInput
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        fileType={fileType}
        setFileType={setFileType}
        setThumbnail={setThumbnail}
      />
      <TextInput label="Caption" value={caption} setValue={setCaption} />
      <PrimaryButton
        text={isLoading ? "Uploading..." : "Upload"}
        disabled={isLoading}
        action={submit}
      />
    </main>
  );
}
