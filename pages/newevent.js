import * as yup from "yup";

import React, { useState } from "react";

import Container from "../components/Container";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import H1 from "../components/H1";
import categories from "../utils/categories";
import firebaseInstance from "../config/firebase";
import { useAuth } from "../auth/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Fill in a title"),
  // image: yup.array().min(1, "Please select at least one image.").nullable(),
  description: yup.string().required("Fill in a description"),
  location: yup.string().required("Fill in a location"),
  category: yup.string().required("Select a category"),
});

export default function Signup() {
  const [firebaseError, setFirebaseError] = useState(null);
  const [eventTitle, setEventTitle] = useState("New Event");
  const router = useRouter();
  const { user } = useAuth();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async ({
    image,
    title,
    description,
    location,
    category,
    time_start,
  }) => {
    const date = new Date(time_start);
    const firebaseDate = new firebaseInstance.firestore.Timestamp.fromDate(
      date
    );
    try {
      const eventCollection = firebaseInstance.firestore().collection("events");
      const eventRef = await eventCollection.add({
        creator: {
          uid: user.uid,
          displayName: user.displayName,
        },
        title: title,
        description: description,
        category: category,
        location: location,
        created: firebaseInstance.firestore.FieldValue.serverTimestamp(),
        time: firebaseDate,
      });
      const storageRef = firebaseInstance
        .storage()
        .ref(`${user.uid}/${eventRef.id}`);
      const imageChild = storageRef.child("image.png");
      await imageChild.put(image[0]);
      const url = await imageChild.getDownloadURL();
      eventCollection.doc(eventRef.id).update({ image: url });
      router.push(`/event/${eventRef.id}`);
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <Container title="New event" description="Create a new event.">
      <H1>{eventTitle}</H1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <FormInput
          label="Image"
          id="image"
          type="file"
          register={register}
          errors={errors}
        />
        <label htmlFor="category" className={"text-success-default"}>
          Category
        </label>
        <select
          name="category"
          id="category"
          ref={register}
          type="text"
          className="focus:outline-none border-2 mt-1 w-2/3 font-bold px-5 py-1 rounded-2xl text-black dark:text-white focus:border-success-default border-daccent-700 bg-daccent-700 dark:bg-accent-700 dark:border-accent-700"
        >
          {categories.map(({ label }) => (
            <option id={label} value={label} key={label}>
              {label}
            </option>
          ))}
        </select>
        <FormInput
          label="Title"
          id="title"
          type="text"
          register={register}
          errors={errors}
          onInput={(txt) => setEventTitle(txt.target.value)}
        />
        <FormInput
          label="Description"
          id="description"
          type="text"
          register={register}
          errors={errors}
        />
        <FormInput
          label="Location"
          id="location"
          type="text"
          register={register}
          errors={errors}
        />
        <FormInput
          label="Start time"
          id="time_start"
          type="datetime-local"
          register={register}
          errors={errors}
        />
        {firebaseError && <p>{firebaseError}</p>}
        <button
          type="submit"
          className="focus:outline-none mt-1 border-2 border-accent-700 dark:border-daccent-700 stroke-currentw-full font-bold  px-5 py-1 rounded-2xl hover:border-success-default hover:bg-success-default active:bg-success-dark active:border-success-default  hover:text-white"
        >
          Save
        </button>
      </Form>
    </Container>
  );
}
