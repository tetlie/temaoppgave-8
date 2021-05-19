import React, { useEffect, useState } from "react";

import ButtonSubscribe from "../../components/ButtonSubscribe";
import Container from "../../components/Container";
import H1 from "../../components/H1";
import Image from "next/image";
import firebaseInstance from "../../config/firebase";
import { useAuth } from "../../auth/auth";

export default function EventDetails({ pageId, error }) {
  if (error !== undefined) {
    return <p>Something went wrong: {error}</p>;
  }

  const [eventData, setEventData] = useState([]);
  const { user, favorites } = useAuth();

  useEffect(() => {
    const ref = firebaseInstance.firestore().collection("events").doc(pageId);
    const unsubscribe = ref.onSnapshot((docSnapshot) => {
      let data = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
      setEventData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container title={eventData.title} description={eventData.description}>
      {eventData.image && (
        <div className="mb-5 lg:w-2/3">
          <Image
            className="rounded-2xl"
            layout="responsive"
            alt="Event-image"
            src={eventData.image}
            height={1080}
            width={1920}
          />
        </div>
      )}

      {user && <ButtonSubscribe id={pageId} />}
      <H1> {eventData.title && eventData.title}</H1>

      <div className="flex flex-wrap whitespace-nowrap my-5">
        <InfoSlot>{eventData.location && eventData.location}</InfoSlot>
        <InfoSlot>{eventData.category && eventData.category}</InfoSlot>
        <InfoSlot>
          {eventData.time && eventData.time.toDate().toDateString()}
        </InfoSlot>
        <InfoSlot>
          {eventData.time && eventData.time.toDate().toLocaleTimeString()}
        </InfoSlot>
      </div>
      <p className="text-xl font-black">
        {eventData.description && eventData.description}
      </p>
    </Container>
  );
}

const InfoSlot = ({ children }) => (
  <p className="text-xl font-bold mb-2 mr-2 bg-accent-200 dark:bg-daccent-200 px-5 py-1 rounded-2xl">
    {children}
  </p>
);

EventDetails.getInitialProps = async ({ query }) => {
  try {
    const pageId = query.id;

    return { pageId };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
