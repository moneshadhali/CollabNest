const SocietiesDetails = ({ societies }) => {
  return (
    <div className="society-details">
      <h4>{societies.title}</h4>
      <p>
        <strong>{societies.owner}</strong>
      </p>
      <p>{societies.createdAt}</p>
    </div>
  );
};

export default SocietiesDetails;
