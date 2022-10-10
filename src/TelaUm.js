import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Filme from "./Filme";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import styled from 'styled-components'

export default function TelaUm() {
  const [filmesEmCartaz, setfilmesEmCartaz] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";
    let promise = axios.get(URL);

    promise.then((resposta) => {
      const { data } = resposta;
      setfilmesEmCartaz(data);
    });

    promise.catch((err) => {
      alert(err.resposta.statusText);
    });
  }, []);

  function filmesExposto() {
    if (filmesEmCartaz.length > 0) {
      return filmesEmCartaz.map((filme) => {
        const { id, title, posterURL } = filme;
        return <Filme key={id} id={id} title={title} posterURL={posterURL} />;
      });
    } else {
      return (
        <p>
          <ClimbingBoxLoader />
        </p>
      );
    }
  }

  return (
    <div>
      <Conteudo>
        <h2>Selecione o filme</h2>
        <FilmeCartaz>{filmesExposto()}</FilmeCartaz>
      </Conteudo>
    </div>
  );
}

const Conteudo = styled.div `
    margin: 70px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
        color: #293845;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        height: 80px;
        font-size: 24px;
        font-weight: 500;
    }
`

const FilmeCartaz = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    img {
        height: 193px;
        width: 129px;
    }
`