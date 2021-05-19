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
  userName: yup.string().required("Fill in a username"),
  email: yup.string().email().required("Fill in a valid e-mail"),
  password: yup.string().min(6).required("Fill in a valid password"),
});

export default function Signup() {
  const [firebaseError, setFirebaseError] = useState(null);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async ({ userName, email, password }) => {
    console.log({ userName, email, password });
    try {
      const user = await firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await user.user.updateProfile({ displayName: userName });

      const userDoc = await firebaseInstance
        .firestore()
        .collection("users")
        .doc(user.user.uid)
        .set({
          email: user.user.email,
          uid: user.user.uid,
          displayName: user.user.displayName,
          eventsOwned: [],
          eventsSubscribed: [],
        });
      router.push("/profile");
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <Container title="Signup" description="Signup to Eventually.">
      <H1>Sign up</H1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormInput
          label="Username"
          id="username"
          type="text"
          register={register}
          errors={errors}
        />
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
        <Button type="submit" title="Sign up" />
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </Container>
  );
}
