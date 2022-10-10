import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TelaUm from "./TelaUm";
import TelaDois from "./TelaDois";
import TelaTres from "./TelaTres";
import TelaQuatro from "./TelaQuatro";
import Topo from "./Topo";

export default function App() {
  const [reserva, setReserva] = useState(null);
  return (
    <BrowserRouter>
      <Topo />
      <Routes>
          <Route exact path="/" element={<TelaUm />} />
          <Route path="/sessoes/:idFilme" element={<TelaDois />} />
          <Route path="/assentos/:idSessao"
            element={<TelaTres fecharCompra={(reserva) => setReserva(reserva)} />}
          />
          <Route path="/sucesso" element={<TelaQuatro reserva={reserva} />} />
      </Routes>
    </BrowserRouter>
  );
}
