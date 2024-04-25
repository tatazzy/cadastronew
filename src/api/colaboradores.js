import { apiClient } from ".";

export async function deleteColaborador(id) {
    try {
        const response = await apiClient.delete(`/Colaborador/${id}`);
        console.log("Colaborador excluído:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir colaborador:', error);
        return { sucesso: false, mensagem: 'Erro ao excluir colaborador' };
    }
}
