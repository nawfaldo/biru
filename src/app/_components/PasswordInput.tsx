import { FC, useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: string | undefined;
}

const PasswordInput: FC<Props> = ({ value, setValue, label, error }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-lg font-light text-white">{label}</label>
      <div className="flex justify-between space-x-3 rounded-lg border-[1.2px] border-gray-500 px-3 py-2">
        <input
          className="border-none bg-transparent text-xl font-light text-white focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={show ? "text" : "password"}
        />
        {show ? (
          <EyeIcon
            className="w-[30px] cursor-pointer text-gray-500 hover:text-white"
            onClick={toggleShow}
          />
        ) : (
          <EyeSlashIcon
            className="w-[30px] cursor-pointer text-gray-500 hover:text-white"
            onClick={toggleShow}
          />
        )}
      </div>
      {error && <p className="text-white">{error}</p>}
    </div>
  );
};

export default PasswordInput;
