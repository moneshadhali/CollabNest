import { useState } from "react";
import { useSocietyContext } from "../hooks/useSocietyContext";

const SocietyForm = () => {
  const { dispatch } = useSocietyContext();
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const society = { title, owner, description };
    const response = await fetch("/api/societies", {
      method: "POST",
      body: JSON.stringify(society),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
      console.log(json.emptyField);
    }
    if (response.ok) {
      setTitle("");
      setOwner("");
      setDescription("");
      setError(null);
      setEmptyField([]);
      console.log("New society have been created", json);
      dispatch({ type: "CREATE_SOCIETIES", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a Society</h3>
      <label>Society Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyField.includes("title") ? "error" : ""}
      />
      <label>Society Owner</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        className={emptyField.includes("owner") ? "error" : ""}
      />
      <label>Society Description</label>
      <textarea
        name="desc"
        rows="3"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>
      <button>Create Society</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SocietyForm;
