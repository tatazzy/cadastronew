import { apiClient } from "."

export const listaFuncionario = async () => {
  const response = await apiClient.get("/Colaborador")
  return response.data
}
