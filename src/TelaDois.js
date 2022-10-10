import axios from "axios";
import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useParams } from "react-router-dom";
import Sessao from "./Sessao";
import styled from 'styled-components'

export default function TelaDois() {
  const { idFilme } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`;
    const promise = axios.get(URL);

    promise.then((response) => {
      const { data } = response;
      setFilme(data);
    });

    promise.catch((err) => {
      alert(err.response.statusText);
    });
  }, []);

  function sessionDay() {
    if (filme !== null) {
      return filme.days.map((day) => {
        const { weekday, date, showtimes, id } = day;
        return (
          <Sessao
            weekday={weekday}
            date={date}
            showtimes={showtimes}
            key={id}
            id={id}
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

  function rodapee() {
    if (filme !== null) {
      const { posterURL, title } = filme;

      return (
        <>
          <img src={posterURL} alt={title} />
          <h2>{title}</h2>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div>
      <Conteudo>
      <h4>Selecione o horário</h4>
      </Conteudo>
    <Dia>{sessionDay()}</Dia>
    <Rodape>{rodapee()}</Rodape>
    </div>
  );
}

const Conteudo = styled.div`
    margin: 100px;
    display: flex;
    justify-content: center;
    h4 {
        font-size: 26px;
    }
    
`

const Dia = styled.div`
    display: flex;
    flex-direction: column;
    margin: -70px 0 140px 23px;
    font-size: 20px;
    button {
        width: 80px;
        height: 40px;
        color: #ffffff;
        font-weight: 400;
        font-size: 18px;
        align-items: center;
        text-align: center;
        letter-spacing: 0.02em;
        background: #e8833a;
        border-radius: 3px;
        margin: 15px;
    }
    
`

const Rodape = styled.div`
    position: fixed;
    width: 100%;
    z-index: 1;
    bottom: 0;
    left: 0;
    height: 120px;
    display: flex;
    align-items: center;
    background-color: #dfe6ed;

    img {
        width: 64px;
        height: 89px;
        margin-left: 10px;
        background: #ffffff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        border: 1px solid #9eadba;
        margin-right: 15px;
        padding: 6px;
    }

    h2 {
        color: #293845;
        display: flex;
        margin-top: 68px;
        height: 80px;
        font-size: 24px;
        font-weight: 500;
    }
`