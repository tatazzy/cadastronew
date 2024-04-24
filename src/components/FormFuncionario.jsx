import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Header } from "./Header/index";
import { cadastrarFuncionario } from "../api/cadastrar-funcionario";

export const FormFuncionario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //const [documentos, setDocumentos] = useState([]);
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
        alert("Cadastro efetuado com sucesso!");
        window.location.reload();
      }
      else {
        alert(resposta.mensagem);
      }
    } catch (error) {
      alert("Erro ao enviar a requisição para o servidor!");
    }
  }
  /*
    const handleFileChange = (event) => {
      const files = event.target.files;
      setDocumentos(files);
    };
  
    const onSubmit = (data) => {
      console.log(data);
      console.log("Documentos:", documentos);
      alert("Cadastro efetuado com sucesso!");
    };
    */

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
            /*
            minLength: {
              value: 15,
              message: "O nome completo precisa ter no mínimo 15 caracteres",
            },
            */
          })}
        />
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
          className={errors?.occupation && "input-error"}>
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
          //onChange={handleFileChange}
          multiple
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
        <button onClick={() => handleSubmit(onSubmit)()}>Enviar documento</button>
      </div>
    </div>
  );
};
