import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function TelaQuatro(props) {
  const navigate = useNavigate();
 
  const { reserva } = props;
  const { movie, day, session, assentos, user } = reserva;

  function telaUm() {
    navigate("/");
  }

  return (
    <>
      <Conteudo>
        <h3>Pedido feito com Sucesso!</h3>
      </Conteudo>
      <Informacoes>
        <h4>Filme e sessão</h4>
        <h2>{movie}</h2>
        <h3>{day}  -  {session}</h3>
      </Informacoes>
      <Informacoes>
        <h4>Ingressos</h4>
        <h2>{assentos.map(({numero}) => {return <p key={numero} >Assento {numero}</p> })}</h2>
      </Informacoes>
      <Informacoes>
        <h4>Comprador</h4>
        <h2>Nome: {user.nome} </h2>
        <h3>CPF: {user.cpf} </h3>
      </Informacoes>
      <Voltar>
      <button onClick={telaUm}>Voltar para home</button>
      </Voltar>
        
    </>
  );
}

const Conteudo = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    h3 {
        font-size: 26px;
        color: #247A6B;
        weight: 700px;
    }
    
`

const Informacoes = styled.div`
    margin-top: 40px;
    margin-left: 30px;
    h4 {
        font-size: 26px;
        margin-bottom: 30px
    }
    h2 {
      margin-top: -15px;
      font-size: 18px;
    }
    h3{
      margin-top: 10px;
      font-size: 18px;
    }
`

const Voltar = styled.div`
    display: flex;
    justify-content: center;
button{
  width: 225px;
  height: 42px;
  background: #e8833a;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #FFFFFF;
}

`