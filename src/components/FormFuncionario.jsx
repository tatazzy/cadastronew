import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Header } from "./Header/index";

export const FormFuncionario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [documentos, setDocumentos] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setDocumentos(files);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log("Documentos:", documentos);
    alert("Cadastro efetuado com sucesso!");
  };

  return (
    <div className="app-container">
      <Header />
      <h1 className="header">Cadastrar</h1>
      <div className="form-group">
        <label>Pessoa</label>
        <input
          className={errors?.pessoa && "input-error"}
          type="text"
          placeholder="Seu nome completo"
          {...register("pessoa", {
            required: "O preenchimento de pessoa é obrigatório",
            minLength: {
              value: 15,
              message: "O nome completo precisa ter no mínimo 15 caracteres",
            },
          })}
        />
        {errors?.pessoa && (
          <p className="error-message">{errors.pessoa.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Cargo</label>
        <select
          {...register("occupation", {
            validate: (value) => {
              return value != "0";
            },
          })}
          className={errors?.occupation && "input-error"}>
          <option value="0">Selecione seu cargo...</option>
          <option value="Desenvolvedor">Desenvolvedor</option>
          <option value="Designer">Designer</option>
          <option value="Gerente">Gerente</option>
          <option value="Analista">Analista</option>
          <option value="Administrador">Administrador</option>
        </select>
        {errors?.occupation?.type == "validate" && (
          <p className="error-message">Selecione um cargo</p>
        )}
      </div>

      <div className="form-group">
        <label>Documentos</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          {...register("documentos", {
            required: "É obrigatório selecionar um documento",
          })}
        />
        {errors?.documentos && (
          <p className="error-message">{errors.documentos.message}</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={handleSubmit(onSubmit)}>Criar conta</button>
      </div>
    </div>
  );
};
