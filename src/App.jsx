import { Routes, Route } from "react-router-dom";
import DarmaxWelcome from "./pages/DarmaxWelcome";

import GestionDashboard from "./Gestion/GestionDashboard";
import Resumen from "./Gestion/Resumen";
import Inventario from "./Gestion/Inventario";
import Ingresos from "./Gestion/Ingresos";
import Gastos from "./Gestion/Gastos";
import VentaMostrador from "./VentaMostrador/VentaMostrador";

import Register from "./pages/Register";
import Login from "./pages/Login";



function App() {
  return (
    <Routes>
      <Route path="/" element={<DarmaxWelcome />} />

      <Route path="/gestion" element={<GestionDashboard />}>
        <Route index element={<Resumen />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="ingresos" element={<Ingresos />} />
        <Route path="gastos" element={<Gastos />} />
      </Route>
      
      
      <Route path="/venta-mostrador" element={<VentaMostrador />} />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  );
}

export default App;

