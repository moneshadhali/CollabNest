import { useSocietyContext } from "../hooks/useSocietyContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const SocietiesDetails = ({ societies }) => {
  const { dispatch } = useSocietyContext();

  const handleClick = async () => {
    const response = await fetch("/api/societies/" + societies._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SOCIETIES", payload: json });
    }
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
    </div>
  );
};

export default SocietiesDetails;
