import { createContext, useContext, useEffect, useState } from "react";

import firebaseInstance from "../config/firebase";
import nookies from "nookies";

const AuthContext = createContext({ user: null, favorites: [] });

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    return firebaseInstance.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", null, { path: "/" });
      } else {
        const token = user.getIdToken;
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  });

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseInstance.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return clearInterval(handle);
  });

  useEffect(async () => {
    const collection = firebaseInstance.firestore().collection("users");
    const doc = collection.doc(user?.uid);
    const unsubscribe = doc.onSnapshot((doc) => {
      const favoritesData = doc.data() && [...doc.data().eventsSubscribed];
      setFavorites(favoritesData);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, favorites }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
