import { apiClient } from ".";

export const cadastrarPessoa = async ({
  name,
  email,
  telephone,
  adress,
  dateOfBirth,
  gender,
}) => {
  await apiClient.post("/cadastro-pessoa", {
    name,
    email,
    telephone,
    adress,
    dateOfBirth,
    gender,
  });
};
