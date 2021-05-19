import { useEffect, useState } from "react";

import CategoryFilter from "../components/CategoryFilter";
import Container from "../components/Container";
import H1 from "../components/H1";
import Results from "../components/Results";
import firebaseInstance from "../config/firebase";

export default function Home(props) {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const ref = firebaseInstance.firestore().collection("events");
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEventsData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container
      title="Eventually"
      description="Create, share and subscribe to events."
    >
      <H1>Events</H1>
      <CategoryFilter setEventsData={setEventsData} />
      {!eventsData && <H1>Nothing</H1>}
      <Results results={eventsData} />
    </Container>
  );
}

// export async function getServerSideProps(context) {
//   // const category = context.query.category;
//   const category = "Arts";
//   let collectionRef = await firebaseInstance.firestore().collection("events");
//   let docsRef = await collectionRef.where("cetegory", "==", "Arts").get();

//   // const productsData = await ref.get();

//   let productsArray = [];
//   docsRef.forEach((product) => {
//     productsArray.push({
//       id: product.id,
//       ...product.data(),
//     });
//   });

//   return {
//     props: { results: productsArray },
//   };
// }
