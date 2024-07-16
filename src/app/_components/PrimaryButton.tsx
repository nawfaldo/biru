import { FC, MouseEventHandler } from "react";

interface Props {
  text: string;
  disabled: boolean;
  action: () => void;
}

const PrimaryButton: FC<Props> = ({ text, disabled, action }) => {
  return (
    <button
      className="w-full rounded-lg bg-blue-500 py-2 hover:bg-blue-600"
      disabled={disabled}
      onClick={() => action()}
    >
      <p className="text-lg font-medium text-white">{text}</p>
    </button>
  );
};

export default PrimaryButton;
