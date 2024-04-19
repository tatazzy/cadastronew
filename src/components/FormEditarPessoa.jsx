

// Bibliotecas incluídas via terminal
import { useForm } from "react-hook-form";
import validator from 'validator';
import InputMask from 'react-input-mask';
import {Header} from './Header/index'

export const FormEditarPessoa = () => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data) // Teste de saída via console dos dados incluídos 

    // Condição que irá analisar se os dados foram validados e estão sendo enviados (caso seja verdadeiro, retornará um alerta para o usuário confirmando o envio)
    if(data != null){
      alert("Cadastro efetuado com sucesso!");
    }
  };

  // "Variáveis" para armazenar os valores a cada mudança do usuário 
  const watchEmail = watch("email")
  const watchTelephone = watch("telephone")

  return (

    <div className="app-container">
      <Header/>
      <h1 className="header">Alterar dados</h1>
      <div className="form-group">
        <label>Nome completo</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome completo"
          {...register('name', {
            required: true,
            minLength: 15
          })}
        />

        {errors?.name?.type == 'required' && 
          <p className="error-message">O preenchimento do nome completo é obrigatório</p>}

        {errors?.name?.type == 'minLength' && 
          <p className="error-message">O nome completo precisa ter no mínimo 15 caracteres</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register('email', {
            required: true,
            validate: (value) => validator.isEmail(value)
          })}
        />
        {errors?.email?.type == 'required' && 
          <p className="error-message">O preenchimento do e-mail é obrigatório</p>}
        {errors?.email?.type == 'validate' && 
          <p className="error-message">O e-mail é inválido</p>}
      </div>

      <div className="form-group">
        <label>Confirmação de E-mail</label>
        <input
          className={errors?.emailConfirmation && "input-error"}
          type="emailConfirmation"
          placeholder="Confirme seu e-mail"
          {...register('emailConfirmation', {
            required: true,
            validate: (value) => validator.isEmail(value) && value == watchEmail
          })}
        />
        {errors?.emailConfirmation?.type == 'required' &&
          <p className="error-message">O preenchimento da confirmação do e-mail é obrigatório</p>}

        {errors?.emailConfirmation?.type == 'validate' &&
          <p className="error-message">O e-mail é inválido e precisa ser igual ao e-mail informado acima</p>}
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <InputMask
          className={errors?.telephone && "input-error"}
          mask="(99) 99999-9999" // Defina a máscara do telefone aqui (utilizando a biblioteca: react-input-mask para formatação)
          placeholder="Telefone"
          {...register('telephone',
            {
              required: true,
              minLength: 10
            })}
        />

        {errors?.telephone?.type == 'required' && (
          <p className="error-message">O preenchimento do telefone é obrigatório </p>
        )}

        {errors?.telephone?.type == 'minLength' && (
          <p className="error-message">O número de telefone precisa ter no mínimo 10 dígitos</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirmação de telefone</label>
        <InputMask
          className={errors?.telephoneConfirmation && "input-error"}
          mask="(99) 99999-9999"
          placeholder="Confirme seu telefone"
          {...register('telephoneConfirmation',
            {
              required: true,
              validate: (value) => value == watchTelephone,
              minLength: 10
            })}
        />

        {errors?.telephoneConfirmation?.type == 'required' && (
          <p className="error-message">O preenchimento do telefone de confirmação é obrigatório </p>
        )}

        {errors?.telephoneConfirmation?.type == 'validate' && (
          <p className="error-message">Os telefones precisam ser iguais</p>
        )}

        {errors?.telephoneConfirmation?.type == 'minLength' && (
          <p className="error-message">O número de telefone precisa ter no mínimo 10 dígitos</p>
        )}
      </div>

      <div className="form-group">
        <label>Endereço</label>
        <input
          className={errors?.adress && "input-error"}
          type="adress"
          placeholder="Endereço"
          {...register('adress',
            {
              required: true,
              minLength: 10
            })}
        />

        {errors?.adress?.type == 'required' && (
          <p className="error-message">O preenchimento do endereço é obrigatório </p>
        )}

        {errors?.adress?.type == 'minLength' && (
          <p className="error-message">O endereço precisa ter no mínimo de 10 caracteres</p>
        )}
      </div>

      <div className="form-group">
        <label>Data de nascimento</label>
        <input
          className={errors?.dateOfBirth && "input-error"}
          type="date"
          placeholder="Digite a data do seu nascimento"
          {...register('dateOfBirth',
            {
              required: true,
            })}
        />
        {errors?.dateOfBirth?.type == 'required' && (
          <p className="error-message">O preenchimento da data de nascimento é obrigatório </p>
        )}

      </div>

      <div className="form-group">
        <label>Gênero</label>
        <select
          {...register('gender', {
            validate: (value) => {
              return value != "0"
            }
          })}
          className={errors?.gender && "input-error"}
        >
          <option value="0">Selecione seu gênero...</option>
          <option value="woman">Feminino</option>
          <option value="man">Masculino</option>
          <option value="other">Outra</option>
        </select>

        {errors?.gender?.type == 'validate' && (
          <p className="error-message">Selecione um gênero</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register('privacyTerms', { required: true })}
          />
          <label>Eu aceito os termos de privacidade.</label>
        </div>

        {errors?.privacyTerms?.type == 'required' && (
          <p className="error-message">Selecione os termos de privacidade para continuar</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Salvar alterações</button>
      </div>
    </div>
  );
};

