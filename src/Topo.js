import styled from 'styled-components'
export default function Topo() {
  return <Titulo>CINEFLEX</Titulo>;
}

const Titulo = styled.div `

    font-size: 34px;
    font-weight: 400;
    color: #e8833a;
    background-color: #c3cfd9;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    
    `