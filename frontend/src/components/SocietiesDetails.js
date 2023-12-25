import { useSocietyContext } from "../hooks/useSocietyContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const SocietiesDetails = ({ societies }) => {
  const { dispatch } = useSocietyContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/societies/" + societies._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SOCIETIES", payload: json });
    }
  };

  const handleJoinClick = async () => {
    if (!user) {
      return;
    }
    console.log(user._id);
    const response = await fetch("/api/societies/" + societies._id, {
      method: "PATCH",
      body: {
        member_req: user._id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="society-details">
      <h4>{societies.title}</h4>
      <p>
        <strong>{societies.owner}</strong>
      </p>
      <p>
        {formatDistanceToNow(new Date(societies.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>

      <Link to={`/society/${societies._id}`}>More about this </Link>
      <button onClick={handleJoinClick}>JOIN</button>
    </div>
  );
};

export default SocietiesDetails;
