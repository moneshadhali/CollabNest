import { useEffect, useState } from "react";

//importing components
import SocietiesDetails from "../components/SocietiesDetails";
import SocietyForm from "../components/SocietyForm";

const Home = () => {
  const [societies, setSocities] = useState(null);

  useEffect(() => {
    const fetchSociety = async () => {
      const response = await fetch("/api/societies");
      const json = await response.json();

      if (response.ok) {
        setSocities(json);
      }
    };
    fetchSociety();
  }, []);

  return (
    <div className="home">
      <div className="socities">
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
