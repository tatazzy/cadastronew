import { Routes, Route } from "react-router-dom";
import { Form } from "./components/Form";
import { FormFuncionario } from "./components/FormFuncionario";
import { FormEditarPessoa } from "./components/FormEditarPessoa";
import { ListaFuncionario } from "./components/ListaFuncionario";

export const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/cadastrar-pessoa" element={<Form />} />
        <Route path="/cadastrar-funcionario" element={<FormFuncionario />} />
        <Route path="/editar-pessoa/:id" element={<FormEditarPessoa />} />
        <Route path="/listar-funcionario" element={<ListaFuncionario />} />
        <Route path="/" element={<Form />} />
      </Route>
    </Routes>
  );
};
