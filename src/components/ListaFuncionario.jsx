import React, { useState, useEffect } from "react"
import styles from "./ListaFuncionario.module.css"
import { listaFuncionario } from "../api/lista-funcionario"

export function ListaFuncionario() {
  const [initialData, setInitialData] = useState([])
  const [people, setPeople] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sorted, setSorted] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [filteredLetter, setFilteredLetter] = useState("")

  console.log("initialData", initialData)
  console.log("people", people)

  async function handleListEmployees() {
    const response = await listaFuncionario()
    console.log("response", response)
    if (response?.dados) {
      setInitialData(response.dados)
    }
  }

  useEffect(() => {
    handleListEmployees()
  }, [])

  useEffect(() => {
    if (initialData?.length) {
      setPeople(
        initialData.slice().sort((a, b) => a.nome.localeCompare(b.nome))
      )
    }
  }, [initialData])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)

    const filteredPeople = initialData.filter((person) =>
      person.nome.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setPeople(filteredPeople)
  }

  const handleSort = () => {
    setPeople((prevPeople) =>
      prevPeople.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    )
    setSorted(true)
  }

  const handleItemClick = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id))
  }

  const handleLetterClick = (letter) => {
    if (filteredLetter === letter) {
      setFilteredLetter("")
      setPeople(
        initialData.slice().sort((a, b) => a.nome.localeCompare(b.nome))
      )
    } else {
      setFilteredLetter(letter)
      const filteredPeople = initialData.filter((person) =>
        person.nome.toLowerCase().startsWith(letter.toLowerCase())
      )
      setPeople(filteredPeople)
    }
  }

  const handleBack = () => {
    window.location.reload()
  }

  const handleHome = () => {
    window.location.reload()
  }

  return (
    <div className="App">
      <div className={styles["top-buttons"]}>
        <button className={styles["button"]} onClick={handleBack}>
          Voltar
        </button>
        <button className={styles["button"]} onClick={handleHome}>
          Página Inicial
        </button>
      </div>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Lista de Pessoas</h1>
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
              className={`${styles["button"]} ${
                filteredLetter === letter ? "active" : ""
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
                  {expandedId === person.id && (
                    <div className={styles["details"]}>
                      {console.log("person", person)}
                      <p>Email: {person.email}</p>
                      <p>Nome: {person.nome}</p>
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
                  {expandedId === person.id && (
                    <div className={styles["details"]}>
                      <p>Email: {person.email}</p>
                      <p>Nome: {person.nome}</p>
                    </div>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}
