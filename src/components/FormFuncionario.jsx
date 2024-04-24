import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./Header/index";
import { cadastrarFuncionario } from "../api/cadastrar-funcionario";
import { listaFuncionario } from "../api/lista-funcionario";
import { getDocumentos } from "../api/documentos";

export const FormFuncionario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const colaboradoresResponse = await listaFuncionario();
        const documentosResponse = await getDocumentos();

        if (colaboradoresResponse?.dados && documentosResponse?.dados) {
          const colaboradoresSemDocumentos = colaboradoresResponse.dados.filter(
            (colaborador) =>
              !documentosResponse.dados.some(
                (documento) => documento.idColaborador === colaborador.id
              )
          );

          setColaboradores(colaboradoresSemDocumentos);
        }
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      }
    };

    fetchColaboradores();
  }, []);

  const onSubmit = async (data) => {
    // Implementação da função onSubmit
  };

  return (
    <div className="app-container">
      <Header />
      <h1 className="header">Cadastrar</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Selecione o colaborador</label>
          <select
            {...register("pessoa", {
              required: "Selecione um colaborador",
            })}
          >
            <option value="">Selecione...</option>
            {colaboradores.map((colaborador) => (
              <option key={colaborador.id} value={colaborador.id}>
                {colaborador.nome}
              </option>
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
                return value !== "0";
              },
            })}
            className={errors?.occupation && "input-error"}
          >
            <option value="0">Selecione o tipo de documento...</option>
            <option value="Estudante">Estudante</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          {errors?.typeDocument?.type === "validate" && (
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
          <button type="submit">Enviar documento</button>
        </div>
      </form>
    </div>
  );
};
