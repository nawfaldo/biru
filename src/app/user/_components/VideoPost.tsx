import { FC } from "react";

interface Props {
  url: string;
}

const VideoPost: FC<Props> = ({ url }) => {
  return <video src={url} className="h-[500px] w-full" controls />;
};

export default VideoPost;
