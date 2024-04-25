import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload, faTrashAlt, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import styles from "./ListaFuncionario.module.css";
import { listaFuncionario } from "../api/lista-funcionario.js";
import { Header } from "./Header";
import { useNavigate } from 'react-router-dom';
import { downloadDocumento, getDocumentos, deleteDocumento } from "../api/documentos.js";
import { deleteColaborador } from "../api/colaboradores.js";

export function ListaFuncionario() {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState([]);
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filteredLetter, setFilteredLetter] = useState("");
  const [documentos, setDocumentos] = useState({});

  console.log("initialData", initialData);
  console.log("people", people);

  async function handleListEmployees() {
    const response = await listaFuncionario();
    console.log("response", response);
    if (response?.dados) {
      setInitialData(response.dados);
    }
  }

  useEffect(() => {
    handleListEmployees();
  }, []);

  useEffect(() => {
    if (initialData?.length) {
      setPeople(
        initialData.slice().sort((a, b) => a.nome.localeCompare(b.nome))
      );
    }
  }, [initialData]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      const documentosResponse = await getDocumentos();
      const documentosMap = {};
      if (documentosResponse?.dados) {
        documentosResponse.dados.forEach((documento) => {
          documentosMap[documento.idColaborador] = documento;
        });
      }
      setDocumentos(documentosMap);
    };

    fetchDocumentos();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredPeople = initialData.filter((person) =>
      person.nome.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPeople(filteredPeople);
  };

  const handleSort = () => {
    setPeople((prevPeople) =>
      prevPeople.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    );
    setSorted(true);
  };

  const handleItemClick = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleLetterClick = (letter) => {
    if (filteredLetter === letter) {
      setFilteredLetter("");
      setPeople(
        initialData.slice().sort((a, b) => a.nome.localeCompare(b.nome))
      );
    } else {
      setFilteredLetter(letter);
      const filteredPeople = initialData.filter((person) =>
        person.nome.toLowerCase().startsWith(letter.toLowerCase())
      );
      setPeople(filteredPeople);
    }
  };

  const handleBack = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.reload();
  };

  const handleEditClick = (event, person) => {
    event.stopPropagation();
    navigate(`/editar-pessoa/${person.id}`);
  };

  const handleDownloadDocument = async (event, person) => {
    event.stopPropagation();
    const documento = documentos[person.id];
    if (documento) {
      await downloadDocumento(documento.id);
      console.log("Documento:", documento);
    } else {
      alert("Este funcionário não tem documento cadastrado.");
    }
  };

  const handleDeleteDocument = async (event, person) => {
    event.stopPropagation();
    const documento = documentos[person.id];
    if (documento) {
      await deleteDocumento(documento.id);
      console.log("Documento excluído:", documento);
      alert("Documento excluído com sucesso!");
      const updatedDocumentos = { ...documentos };
      delete updatedDocumentos[person.id];
      setDocumentos(updatedDocumentos);
    } else {
      alert("Este funcionário não tem documento cadastrado.");
    }
  };

  const handleDeleteEmployee = async (event, person) => {
    event.stopPropagation();
    await deleteColaborador(person.id);
    console.log("Colaborador excluído:", person);
    alert("Colaborador excluído com sucesso!");
    const updatedPeople = people.filter((p) => p.id !== person.id);
    setPeople(updatedPeople);
    const documento = documentos[person.id];
    if (documento) {
      await deleteDocumento(documento.id);
      console.log("Documento do colaborador excluído:", documento);
      alert("Documento do colaborador excluído com sucesso!");
      const updatedDocumentos = { ...documentos };
      delete updatedDocumentos[person.id];
      setDocumentos(updatedDocumentos);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Funcionários cadastrados</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className={styles["button-container"]}>
          {Array.from({ length: 26 }, (_, index) =>
            String.fromCharCode(65 + index)
          ).map((letter) => (
            <button
              className={`${styles["button"]} ${filteredLetter === letter ? "active" : ""
                }`}
              key={letter}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <ul className={`${styles["people-list"]} ${styles.ul}`}>
          {sorted
            ? people.map((person) => (
              <li
                className={`${styles.li}`}
                key={person.id}
                onClick={() => handleItemClick(person.id)}
              >
                <p>{person.nome}</p>
                <FontAwesomeIcon
                  icon={faEdit}
                  className={styles.editIcon}
                  onClick={(event) => handleEditClick(event, person)}
                />
                {documentos[person.id] && (
                  <div>
                    <FontAwesomeIcon
                      icon={faDownload}
                      className={styles.downloadIcon}
                      onClick={(event) => handleDownloadDocument(event, person)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={styles.deleteIcon}
                      onClick={(event) => handleDeleteDocument(event, person)}
                    />
                  </div>
                )}
                {expandedId === person.id && (
                  <div className={styles["details"]}>
                    {console.log("person", person)}
                    <p>Email: {person.email}</p>
                    <p>Nome: {person.nome}</p>
                    <p>Telefone: {person.telefone}</p>
                    <p>Gênero: {person.genero}</p>
                    <p>Idade: {person.idade}</p>
                    <p>Cargo: {person.cargo}</p>
                    {documentos[person.id] && (
                      <p>Tipo de Documento: {documentos[person.id].tipo}</p>
                    )}
                    <FontAwesomeIcon
                      icon={faUserMinus}
                      className={styles.deleteEmployeeIcon}
                      onClick={(event) => handleDeleteEmployee(event, person)}
                    />
                  </div>
                )}
              </li>
            ))
            : people.map((person) => (
              <li
                className={`${styles.li}`}
                key={person.id}
                onClick={() => handleItemClick(person.id)}
              >
                <p>{person.nome}</p>
                <FontAwesomeIcon
                  icon={faEdit}
                  className={styles.editIcon}
                  onClick={(event) => handleEditClick(event, person)}
                />
                {documentos[person.id] && (
                  <div>
                    <FontAwesomeIcon
                      icon={faDownload}
                      className={styles.downloadIcon}
                      onClick={(event) => handleDownloadDocument(event, person)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={styles.deleteIcon}
                      onClick={(event) => handleDeleteDocument(event, person)}
                    />
                  </div>
                )}
                <FontAwesomeIcon
                  icon={faUserMinus}
                  className={styles.deleteEmployeeIcon}
                  onClick={(event) => handleDeleteEmployee(event, person)}
                />
                {expandedId === person.id && (
                  <div className={styles["details"]}>
                    <p>Email: {person.email}</p>
                    <p>Nome: {person.nome}</p>
                    <p>Telefone: {person.telefone}</p>
                    <p>Gênero: {person.genero}</p>
                    <p>Idade: {person.idade}</p>
                    <p>Cargo: {person.cargo}</p>
                    {documentos[person.id] && (
                      <p>Tipo de Documento: {documentos[person.id].tipo}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
