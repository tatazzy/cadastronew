import React, { useState, useEffect } from "react";
import "./ListaFuncionario.css";

const initialData = [
  { id: 1, name: "João", age: 30, email: "joao@example.com" },
  { id: 2, name: "Maria", age: 25, email: "maria@example.com" },
  { id: 3, name: "Pedro", age: 28, email: "pedro@example.com" },
  { id: 4, name: "Ana", age: 35, email: "ana@example.com" },
  { id: 5, name: "Lucas", age: 32, email: "lucas@example.com" },
  { id: 6, name: "Carla", age: 27, email: "carla@example.com" },
  { id: 7, name: "Gabriel", age: 29, email: "gabriel@example.com" },
  { id: 8, name: "Mariana", age: 31, email: "mariana@example.com" },
  { id: 9, name: "Fernando", age: 33, email: "fernando@example.com" },
  { id: 10, name: "Juliana", age: 26, email: "juliana@example.com" },
  { id: 11, name: "Rafael", age: 29, email: "rafael@example.com" },
  { id: 12, name: "Amanda", age: 24, email: "amanda@example.com" },
  { id: 13, name: "Gustavo", age: 30, email: "gustavo@example.com" },
  { id: 14, name: "Laura", age: 28, email: "laura@example.com" },
  { id: 15, name: "Rodrigo", age: 34, email: "rodrigo@example.com" },
];

export function ListaFuncionario() {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filteredLetter, setFilteredLetter] = useState("");

  useEffect(() => {
    setPeople(initialData.slice().sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredPeople = initialData.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPeople(filteredPeople);
  };

  const handleSort = () => {
    setPeople((prevPeople) =>
      prevPeople.slice().sort((a, b) => a.name.localeCompare(b.name))
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
        initialData.slice().sort((a, b) => a.name.localeCompare(b.name))
      );
    } else {
      setFilteredLetter(letter);
      const filteredPeople = initialData.filter((person) =>
        person.name.toLowerCase().startsWith(letter.toLowerCase())
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

  return (
    <div className="App">
      <div className="top-buttons">
        <button onClick={handleBack}>Voltar</button>
        <button onClick={handleHome}>Página Inicial</button>
      </div>
      <div className="container">
        <h1>Lista de Pessoas</h1>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="button-container">
          {Array.from({ length: 26 }, (_, index) =>
            String.fromCharCode(65 + index)
          ).map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={filteredLetter === letter ? "active" : ""}
            >
              {letter}
            </button>
          ))}
        </div>
        <ul className="people-list">
          {sorted
            ? people.map((person) => (
                <li key={person.id} onClick={() => handleItemClick(person.id)}>
                  {person.name}
                  {expandedId === person.id && (
                    <div className="details">
                      <p>Idade: {person.age}</p>
                      <p>Email: {person.email}</p>
                    </div>
                  )}
                </li>
              ))
            : people.map((person) => (
                <li key={person.id} onClick={() => handleItemClick(person.id)}>
                  {person.name}
                  {expandedId === person.id && (
                    <div className="details">
                      <p>Idade: {person.age}</p>
                      <p>Email: {person.email}</p>
                    </div>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
