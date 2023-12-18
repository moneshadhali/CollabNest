import { useState } from "react";

const SocietyForm = () => {
  const [title, setTitle] = useState("");
  const [owner, setOnwner] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

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
    }
    if (response.ok) {
      setTitle("");
      setOnwner("");
      setDescription("");
      setError(null);
      console.log("New society have been created", json);
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
      />
      <label>Society Owner</label>
      <input
        type="text"
        onChange={(e) => setOnwner(e.target.value)}
        value={owner}
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
