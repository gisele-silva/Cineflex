import { Link } from "react-router-dom";

export default function Sessao(props) {
  const { weekday, date, showtimes } = props;

  function escolhaHora() {
    return showtimes.map((showtime) => {
      const { id, name } = showtime;
      return (
        <Link key={id} to={`/assentos/${id}`}>
          <button>{name}</button>
        </Link>
      );
    });
  }

  return (
    <div className="conteudo">
      <p>
        {weekday} - {date}
      </p>
      {escolhaHora()}
    </div>
  );
}
