import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Header } from "./Header/index";
import { cadastrarFuncionario } from "../api/cadastrar-funcionario";

export const FormFuncionario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Adicionando setValue para atualizar o valor do campo "pessoa"
  } = useForm();

  const [colaboradores, setColaboradores] = useState([]); // Estado para armazenar os colaboradores

  useEffect(() => {
    // Aqui você pode fazer uma chamada à API para obter a lista de colaboradores
    // Por enquanto, vou apenas simular uma lista de colaboradores
    const mockColaboradores = [
      { id: 1, nome: "Colaborador 1" },
      { id: 2, nome: "Colaborador 2" },
      { id: 3, nome: "Colaborador 3" }
    ];
    setColaboradores(mockColaboradores);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("tipo", data.typeDocument);
    formData.append("idColaborador", data.pessoa);
    formData.append("arquivo", data.documentos[0]);

    try {
      const response = await cadastrarFuncionario(formData);
      const resposta = response.data;
      if (resposta.sucesso) {
        // Atualizar o valor do campo "pessoa" com o ID da pessoa cadastrada
        setValue("pessoa", resposta.idPessoa);
        alert("Cadastro efetuado com sucesso!");
        window.location.reload();
      } else {
        alert(resposta.mensagem);
      }
    } catch (error) {
      alert("Erro ao enviar a requisição para o servidor!");
    }
  };

  return (
    <div className="app-container">
      <Header />
      <h1 className="header">Cadastrar</h1>
      <div className="form-group">
        <label>Selecione o colaborador</label>
        <select
          {...register("pessoa", {
            required: "Selecione um colaborador",
          })}
        >
          <option value="">Selecione...</option>
          {colaboradores.map(colaborador => (
            <option key={colaborador.id} value={colaborador.id}>{colaborador.nome}</option>
          ))}
        </select>
        {errors?.pessoa && (
          <p className="error-message">{errors.pessoa.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Tipo de documento</label>
        <select
          {...register("typeDocument", {
            validate: (value) => {
              return value != "0";
            },
          })}
          className={errors?.occupation && "input-error"}
        >
          <option value="0">Selecione o tipo de documento...</option>
          <option value="Estudante">Estudante</option>
          <option value="Pessoal">Pessoal</option>
        </select>
        {errors?.typeDocument?.type == "validate" && (
          <p className="error-message">Selecione um tipo de documento válido</p>
        )}
      </div>

      <div className="form-group">
        <label>Documentos</label>
        <input
          type="file"
          {...register("documentos", {
            required: "É obrigatório selecionar um documento",
          })}
          accept=".pdf"
        />
        {errors?.documentos && (
          <p className="error-message">{errors.documentos.message}</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={handleSubmit(onSubmit)}>Enviar documento</button>
      </div>
    </div>
  );
};
