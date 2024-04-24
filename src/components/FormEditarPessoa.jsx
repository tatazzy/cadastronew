import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Header } from './Header/index'
import { useParams } from 'react-router-dom';

export const FormEditarPessoa = () => {
  const { id } = useParams();
  const [colaborador, setColaborador] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNasc: "",
    genero: "",
    cargo: "",
    idade: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7144/api/Colaborador/${id}`);
        const data = response.data.dados;
        setColaborador({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          dataNasc: data.dataNasc.substring(0, 10), // formatar para apenas data
          genero: data.genero,
          cargo: data.cargo,
          idade: data.idade
        });
      } catch (error) {
        console.error("Erro ao recuperar dados do colaborador:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColaborador(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Dados atualizados com sucesso!");
    // Adicione aqui a lógica para enviar os dados do formulário para a API de atualização
  };

  return (
    <div className="app-container">
      <Header />
      <h1 className="header">Alterar dados</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome completo</label>
          <input type="text" name="nome" value={colaborador.nome} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input type="email" name="email" value={colaborador.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <InputMask mask="(99) 99999-9999" placeholder="Telefone" name="telefone" value={colaborador.telefone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Data de nascimento</label>
          <input type="date" name="dataNasc" value={colaborador.dataNasc} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <select name="genero" value={colaborador.genero} onChange={handleChange}>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cargo</label>
          <select name="cargo" value={colaborador.cargo} onChange={handleChange}>
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Designer">Designer</option>
            <option value="Gerente">Gerente</option>
            <option value="Analista">Analista</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <div className="form-group">
          <label>Idade</label>
          <input type="number" name="idade" value={colaborador.idade} onChange={handleChange} min={18} />
        </div>

        <div className="form-group">
          <button type="submit">Salvar alterações</button>
        </div>
      </form>
    </div>
  );
};
