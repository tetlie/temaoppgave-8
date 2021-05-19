import * as yup from "yup";

import React, { useState } from "react";

import Button from "../components/Button";
import Container from "../components/Container";
import FormInput from "../components/FormInput";
import H1 from "../components/H1";
import Link from "next/link";
import firebaseInstance from "../config/firebase";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Fill in a valid e-mail"),
  password: yup.string().required("Fill in a valid password"),
});

export default function Signup() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async ({ email, password }) => {
    try {
      await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
      router.push("/profile");
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <Container title="Login" description="Login to Eventually.">
      <H1>Login</H1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormInput
          label="Email"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        {firebaseError && <p>{firebaseError}</p>}
        <Button type="submit" title="Login" />
        <p>
          Dont have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </Container>
  );
}
