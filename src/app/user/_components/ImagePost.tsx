import { FC } from "react";

import Image from "next/image";

interface Props {
  url: string;
}

const ImagePost: FC<Props> = ({ url }) => {
  return (
    <div className="relative h-[500px] w-full">
      <Image alt="file" src={url} layout="fill" objectFit="cover" />
    </div>
  );
};

export default ImagePost;
