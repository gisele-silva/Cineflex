import styled from "styled-components";

export default function Assento(props) {
  const { id, numero, isAvailable, seleciona, clicar } = props;

  function marcarAssento() {
    if (!isAvailable) alert("Assento indisponível");
    else clicar(id, numero);
  }

  return (
    <Marcacao
      isAvailable={isAvailable}
      seleciona={seleciona}
      onClick={marcarAssento}
    >
      {numero}
    </Marcacao>
  );
}

function selecionadoDisponivel(seleciona, isAvailable) {
  if (seleciona) return "#8DD7CF";
  else if (isAvailable) return "#C3CFD9";
  else return "#FBE192";
}

const Marcacao = styled.button`
  width: 26px;
  height: 26px;
  color: #222;
  border: 1px solid #808f9d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ seleciona, isAvailable }) =>
    selecionadoDisponivel(seleciona, isAvailable)};
  cursor: pointer;
  margin: 20px 7px;
`;
