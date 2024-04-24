import { apiClient } from ".";

export const cadastrarFuncionario = async (formData) => {
    const response = await apiClient.post("/Documento", formData);
    return response;
}