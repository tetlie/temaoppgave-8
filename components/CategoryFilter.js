import categories from "../utils/categories";
import firebaseInstance from "../config/firebase";

const Nav = ({ setEventsData }) => {
  const filterResults = (category) => {
    let ref = firebaseInstance
      .firestore()
      .collection("events")
      .where("category", "==", category);
    ref.onSnapshot((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEventsData(data);
    });
  };

  return (
    <nav className="relative mx-3 my-10 ">
      <div className="flex flex-wrap whitespace-nowrap">
        {categories.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => filterResults(label)}
            className="mb-2 mr-2 text-xl font-bold focus:outline-none focus:border-success-default border-2 border-accent-200 dark:border-daccent-200 flex bg-accent-200 dark:bg-daccent-200 active:text-white px-5 py-1 rounded-2xl last:mr-24 cursor-pointer transition duration-200 transform hover:bg-success-default hover:border-success-default"
          >
            <p className="mr-1">{label}</p>
            <p>{icon}</p>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
