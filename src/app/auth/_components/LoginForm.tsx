"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import TextInput from "../../_components/TextInput";
import PasswordInput from "../../_components/PasswordInput";
import PrimaryButton from "../../_components/PrimaryButton";

interface InputError {
  email?: string;
  password?: string;
}

const LoginForm: FC = () => {
  const [error, setError] = useState<InputError>({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const checkInputBeforeSubmit = () => {
    setError({});

    const check: InputError = {};

    if (email === "") {
      check.email = "Email is required.";
    }
    if (email !== "" && !email.endsWith("@gmail.com")) {
      check.email = "Email not valid.";
    }
    if (email.trim() === "@gmail.com") {
      check.email = "Email not valid.";
    }

    if (password === "") {
      check.password = "Password is required.";
    }

    if (check.email === undefined && check.password === undefined) {
      return true;
    } else {
      setError(check);
      return false;
    }
  };

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          const parsedError: InputError = JSON.parse(result.error);

          if (parsedError?.email) {
            setError({ email: parsedError?.email });
          }
          if (parsedError?.password) {
            setError({ password: parsedError?.password });
          }
        } else {
          router.replace("/user/home");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="space-y-5">
      <TextInput
        value={email}
        setValue={setEmail}
        label="Email"
        error={error.email}
      />
      <PasswordInput
        value={password}
        setValue={setPassword}
        label="Password"
        error={error.password}
      />
      <PrimaryButton text="Login" disabled={false} action={submit} />
    </div>
  );
};

export default LoginForm;
