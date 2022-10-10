import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Assento from "./Assento";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import styled from "styled-components";

export default function TelaTres(props) {
  const navigate = useNavigate();
  const { fecharCompra } = props;
  const { idSessao } = useParams();
  const [sessao, setSessao] = useState(null);
  const [lugarSelecionado, setLugarSelecionado] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState({ nome: "", cpf: "" });

  useEffect(() => {

    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;
    const promise = axios.get(URL);

    promise.then((resposta) => {
      const { data } = resposta;
      setSessao(data);
    });

    promise.catch((err) => {
      alert(err.resposta.statusText);
    });
  }, []);

  function alterna(id, numero) {
    const marcado = lugarSelecionado.some((assento) => assento.id === id);
    if (!marcado) {
      setLugarSelecionado([...lugarSelecionado, { id, numero }]);
    } else {
      const maisAssento = lugarSelecionado.filter(
        (assento) => assento.id !== id);
      setLugarSelecionado(maisAssento);
    }
  }

  function selecionarAssento() {
    if (sessao !== null) {
      return sessao.seats.map((seat) => {
        const { id, name, isAvailable } = seat;
        const seleciona = lugarSelecionado.some((assento) => assento.id === id);
        return (
          <Assento
            id={id}
            key={id}
            numero={name}
            isAvailable={isAvailable}
            seleciona={seleciona}
            clicar={(id, numero) => alterna(id, numero)}
          />
        );
      });
    } else {
      return (
        <p>
          <ClimbingBoxLoader />
        </p>
      );
    }
  }

  function finalizaCompra(event) {
    event.preventDefault();

    if (lugarSelecionado.length > 0) {
      const URL = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`;
      const promise = axios.post(URL, {
        ids: lugarSelecionado.map((assento) => assento.id),
        name: dadosUsuario.nome,
        cpf: dadosUsuario.cpf
      });

      promise.then(resposta => {
        fecharCompra({
          movie: sessao.movie.title,
          day: sessao.day.date,
          session: sessao.name,
          assentos: lugarSelecionado,
          user: dadosUsuario
        });
        navigate("/sucesso");
      });

      promise.catch(err => alert(err.resposta.statusText))
    } else {
      alert("Você deve selecionar no mínimo um assento");
    }
  }

  function formulario() {
    return (
      <>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={dadosUsuario.nome}
          placeholder="Nome"
          required
          onChange={(e) =>
            setDadosUsuario({ ...dadosUsuario, nome: e.target.value })
          }
        />
        <label htmlFor="cpf">CPF do comprador:</label>
        <input
          type="text"
          id="cpf"
          value={dadosUsuario.cpf}
          placeholder="CPF"
          required
          onChange={(e) =>
            setDadosUsuario({ ...dadosUsuario, cpf: e.target.value })
          }
        />
        <div>
          <button className="botaoAssento">Reservar assento(s)</button>
        </div>
      </>
    );
  }

  const assentos = selecionarAssento();
  const submeterCompra = formulario ();
  return (
    <div>
      <Conteudo>
        <h2>Selecione o(s) assento(s)</h2>
      </Conteudo>
      <Assentoo>{assentos}</Assentoo>
        <Formulario 
          onSubmit={finalizaCompra}>{submeterCompra}
        </Formulario>
    </div>
  );
}

const Conteudo = styled.div`
  margin: 100px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #293845;
  font-size: 24px;
  font-weight: 500;
`
const Assentoo = styled.div`
  margin: -70px 0 140px 23px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 23px;
  justify-content: center;
  align-items: center;
`

const Formulario = styled.div`

  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
  margin-bottom: 200px;
  margin-left: 23px;
  input {
    width: 90%;
    height: 50px;
    padding-left: 20px;
    margin-top: 8px;
    margin-bottom: 9px;
  }

  .botaoAssento {
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