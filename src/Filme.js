import { Link } from "react-router-dom";

export default function Filme(props) {
  const { title, posterURL, id } = props;
  return (
    <Link to={`/sessoes/${id}`}>
      <div className="cartaz">
        <img src={posterURL} alt={title} />
      </div>
    </Link>
  );
}
