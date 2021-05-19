import React, { useEffect, useState } from "react";

import firebaseInstance from "../config/firebase";
import { useAuth } from "../auth/auth";

const ButtonSubscribe = ({ id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, favorites } = useAuth();

  useEffect(() => {
    let idIsInArray = favorites?.find((el) => el === id);
    if (idIsInArray) {
      setIsFavorite(true);
    } else setIsFavorite(false);
  }, [favorites]);

  const handleClick = async (e, id) => {
    e.preventDefault();
    try {
      const collection = firebaseInstance
        .firestore()
        .collection("users")
        .doc(user.uid);
      if (!favorites.includes(id)) {
        const newArray = [...favorites, id];
        collection.update({ eventsSubscribed: newArray });
      } else {
        const foundIndex = favorites.findIndex((e) => e === id);
        const newArray = favorites.filter((i, x) => {
          return foundIndex !== x;
        });
        collection.update({ eventsSubscribed: newArray });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <button
      onClick={(e) => handleClick(e, id)}
      className={`focus:outline-none border-2 my-2 stroke-currentw-full font-bold  px-5 py-1 rounded-2xl 
        ${
          isFavorite
            ? `border-success-default bg-success-default text-white hover:text-black focus:text-black hover:border-warning-default focus:border-warning-default hover:bg-warning-default focus:bg-warning-default active:border-warning-dark active:bg-warning-dark`
            : " border-accent-700 dark:border-daccent-700 hover:border-success-default focus:border-success-default hover:bg-success-default focus:bg-success-default hover:text-white focus:text-white active:border-success-dark active:bg-success-dark"
        }
      `}
    >
      {isFavorite ? "Remove" : "Add"}
    </button>
  );
};

export default ButtonSubscribe;
