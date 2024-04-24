import { apiClient } from "."

export const cadastrarPessoa = async ({
  nome,
  email,
  telefone,
  dataNasc,
  genero,
  cargo,
  idade,
}) => {
  await apiClient.post("/Colaborador", {
    dados: {
      nome,
      email,
      telefone,
      dataNasc,
      genero,
      cargo,
      idade,
    },
  })
}
