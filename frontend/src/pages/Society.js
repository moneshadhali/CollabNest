import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Society = (societies_id) => {
  const { user } = useAuthContext();
  const [societies, setSocieties] = useState();

  const { id: society_id } = useParams();

  useEffect(() => {
    const fetchSociety = async () => {
      const response = await fetch("/api/societies/" + society_id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setSocieties(json);
    };

    if (user) {
      fetchSociety();
    }
  }, [user, society_id]);

  return (
    <div className="society">
      <h1>A Society</h1>
      <p>{societies && societies.title}</p>
      <p>{societies && societies.description}</p>
      <p>{societies && societies.owner}</p>
      <p>{societies && societies.user_id}</p>
    </div>
  );
};

export default Society;
