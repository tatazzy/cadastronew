import { apiClient } from ".";

export async function getDocumentos() {
  try {
    const response = await apiClient.get('/Documento');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    return { sucesso: false, mensagem: 'Erro ao buscar documentos' };
  }
}

export async function downloadDocumento(id) {
  try {
    const response = await apiClient.get(`/Documento/${id}`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `documento_${id}.pdf`;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert('Erro ao buscar documentos!');
  }
}

export async function deleteDocumento(id) {
  try {
    const response = await apiClient.delete(`/Documento/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return { sucesso: false, mensagem: 'Erro ao excluir documento' };
  }
}