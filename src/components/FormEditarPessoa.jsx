import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Header } from './Header/index'
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/index.js';

export const FormEditarPessoa = () => {
  const { id } = useParams();
  const [colaborador, setColaborador] = useState({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    dataNasc: "",
    genero: "",
    cargo: "",
    idade: 0
  });

  function calcularIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();
    if (mesAtual < nascimento.getMonth() + 1 || (mesAtual === nascimento.getMonth() + 1 && diaAtual < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7144/api/Colaborador/${id}`);
        const data = response.data.dados;
        setColaborador({
          id: data.id,
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
    try {
      colaborador.idade = calcularIdade(colaborador.dataNasc);
      await apiClient.put(`/Colaborador/${id}`, { dados: colaborador });
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do colaborador:", error);
      alert("Erro ao atualizar dados do colaborador.");
    }
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
          <button type="submit">Salvar alterações</button>
        </div>
        <div className="form-group">
          <Link to="/listar-funcionario">
            <button type="button">Cancelar operação</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
