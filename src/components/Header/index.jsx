import { NavLink } from "react-router-dom";
import "./styles.css";

export const Header = () => {
  return (
    <header className="container">
      <nav className="nav">
        <NavLink
          className="nav-link"
          to="/cadastrar-pessoa"
          title="Cadastrar Colaborador"
        >
          Cadastrar Colaborador
        </NavLink>
        <NavLink
          className="nav-link"
          to="/cadastrar-funcionario"
          title="Cadastrar Documento"
        >
          Cadastrar Documento
        </NavLink>
        <NavLink className="nav-link" to="/listar-funcionario" title="Listar Colaboradores">
        Listar Colaboradores
        </NavLink>
      </nav>
    </header>
  );
};
