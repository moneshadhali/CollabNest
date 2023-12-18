import { useEffect } from "react";

//importing components
import SocietiesDetails from "../components/SocietiesDetails";
import SocietyForm from "../components/SocietyForm";
import { useSocietyContext } from "../hooks/useSocietyContext";

const Home = () => {
  const { societies, dispatch } = useSocietyContext();

  useEffect(() => {
    const fetchSociety = async () => {
      const response = await fetch("/api/societies");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SOCIETIES", payload: json });
      }
    };
    fetchSociety();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="societies">
        {societies &&
          societies.map((societies) => (
            <SocietiesDetails key={societies._id} societies={societies} />
          ))}
      </div>
      <SocietyForm />
    </div>
  );
};

export default Home;
