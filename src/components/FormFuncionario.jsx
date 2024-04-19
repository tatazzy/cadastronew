import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import {Header} from './Header/index'

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
    console.log('Documentos:', documentos);
    alert('Cadastro efetuado com sucesso!');
  };

  return (
    <div className="app-container">
       <Header/>
      <h1 className="header">Cadastrar</h1>
      <div className="form-group">
        <label>Pessoa</label>
        <input
          className={errors?.pessoa && 'input-error'}
          type="text"
          placeholder="Seu nome completo"
          {...register('pessoa', {
            required: 'O preenchimento de pessoa é obrigatório',
            minLength: {
              value: 15,
              message: 'O nome completo precisa ter no mínimo 15 caracteres',
            },
          })}
        />
        {errors?.pessoa && (
          <p className="error-message">{errors.pessoa.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Cargo</label>
        <input
          className={errors?.cargo && 'input-error'}
          type="text"
          placeholder="Seu cargo"
          {...register('cargo', {
            required: 'O preenchimento do cargo é obrigatório',
            validate: (value) =>
              validator.isAlpha(value) || 'O cargo é inválido',
          })}
        />
        {errors?.cargo && (
          <p className="error-message">{errors.cargo.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Documentos</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          {...register('documentos', { required: 'É obrigatório selecionar um documento' })}
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
