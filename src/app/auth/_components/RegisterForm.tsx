"use client";

import { FC, useState } from "react";

import { api } from "~/utils/react";

import { signIn } from "next-auth/react";

import PrimaryButton from "../../_components/PrimaryButton";
import TextInput from "../../_components/TextInput";
import PasswordInput from "../../_components/PasswordInput";

interface InputError {
  name?: string;
  email?: string;
  password?: string;
}

const RegisterForm: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<InputError>({});

  const register = api.user.register.useMutation({
    onError: (e) => {
      const parsedError = JSON.parse(e.message);
      setError(parsedError);
    },
  });

  const checkInputBeforeSubmit = () => {
    setError({});

    const check: InputError = {};

    if (name === "") {
      check.name = "Name is required.";
    }

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

    if (
      check.name === undefined &&
      check.email === undefined &&
      check.password === undefined
    ) {
      return true;
    } else {
      setError(check);
      return false;
    }
  };

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      try {
        await register.mutateAsync({ name, email, password });
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/user/home",
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="space-y-5">
      <TextInput
        value={name}
        setValue={setName}
        label="Name"
        error={error.name}
      />
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
      <PrimaryButton
        text={register.isPending ? "Registering..." : "Register"}
        disabled={register.isPending}
        action={submit}
      />
    </div>
  );
};

export default RegisterForm;
