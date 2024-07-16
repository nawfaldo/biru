import { FC } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: string | undefined;
}

const TextInput: FC<Props> = ({ value, setValue, label, error }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-lg font-light text-white">{label}</label>
      <input
        className="rounded-lg border-[1.2px] border-gray-500 bg-transparent px-3 py-2 text-xl font-light text-white focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p className="text-white">{error}</p>}
    </div>
  );
};

export default TextInput;
