import { NavLink } from "react-router-dom"
import "./styles.css"

export const Header = ()=> {
    return (<header className="container">
        <nav className="nav">
            <NavLink className="nav-link" to="/cadastrar-pessoa" title="Cadastrar Pessoa">Cadastrar Pessoa</NavLink>
            <NavLink className="nav-link" to="/cadastrar-funcionario" title="Cadastrar Funcionário">Cadastrar Funcionário</NavLink>
            <NavLink className="nav-link" to="/editar-pessoa" title="Editar Pessoa">Editar Pessoa</NavLink>
        </nav>
    </header>)
}
