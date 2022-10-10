import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function TelaQuatro(props) {
  const navigate = useNavigate();

  const { reserva } = props;
  const { movie, day, hour, assentos, user } = reserva;

  function telaUm() {
    navigate("/");
  }

  return (
    <div>
      <Conteudo>
        <h3>Pedido feito com Sucesso</h3>
        <Informacoes>
          <h2>Filme e sessão</h2>
          <p>{movie}</p>
          <p>
            {day} {hour}
          </p>
        </Informacoes>
        <Informacoes>
          <h2>Ingressos</h2>
        {assentos.map(({numero}) => {return <p key={numero} >Assento {numero}</p> })}
          <p>
            {day} {hour}
          </p>
        </Informacoes>
        <Informacoes>
          <h2>Comprador</h2>
          <p>Nome: {user.nome}</p>
          <p>CPF: {user.cpf}</p>
        </Informacoes>
        <button className="voltar" onClick={telaUm}>
          Voltar para home
        </button>
      </Conteudo>
    </div>
  );
}

const Conteudo = styled.div`
    margin: 100px;
    display: flex;
    background-color: blue;
    justify-content: center;
    h4 {
        font-size: 26px;}
`

const Informacoes = styled.div`
    margin: 100px;
    display: flex;
    justify-content: center;
    h4 {
        font-size: 26px;
`