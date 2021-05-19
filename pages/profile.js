import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import Container from "../components/Container";
import H1 from "../components/H1";
import Results from "../components/Results";
import firebaseInstance from "../config/firebase";
import { useAuth } from "../auth/auth";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { user, favorites } = useAuth();

  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    router.push("/");
  };

  const [eventsData, setEventsData] = useState(null);

  useEffect(async () => {
    let arr = [];
    let collection = firebaseInstance.firestore().collection("events");
    favorites.forEach(async (evt) => {
      let doc = await collection.doc(evt).get();
      let dataObject = doc.data();
      arr.push(dataObject);
    });
    setEventsData(arr);
    console.log({ eventsData });
  }, [favorites]);

  return (
    <Container
      title={user ? user.displayName : "User"}
      description="Create, share and subscribe to events."
    >
      <H1>{user && user.displayName}</H1>
      <p>Subscribed events:</p>
      {favorites.map((favorite) => (
        <p>{favorite}</p>
      ))}
      <Button onClick={handleSignout} title="Signout" warning />
      {/* {user && <>{eventsData && <Results results={eventsData} />}</>} */}
    </Container>
  );
};

export default Profile;
