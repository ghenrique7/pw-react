import React, { useEffect, useState, useRef } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitles] = useState('');
  const [url, setUrls] = useState('');
  const [techs, setTechs] = useState([]);


  useEffect(() => {
    api.get("/repositories").then((response) =>
      setRepositories(response.data)
    );
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", { title, url, techs });

    console.log(response.data);

    setRepositories([...repositories, response.data]);
    
    // Clear input fields after submission
    setTitles('');
    setUrls('');
    setTechs([]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(
      repositories.filter((repository) => repository.id !== id)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddRepository();
  };

  async function handleLikeRepository(id) {
	// Implement "Like Repository" functionality
	const likeRepository = await api.post(`repositories/${id}/like`);

	const newRepository = repositories.map((repository) => {
		if (repository.id === id) {
			return likeRepository.data;
		} else {
			return repository;
		}
	});

	setRepositories(newRepository);
}

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title} {repository.likes}
            <button onClick={() => handleRemoveRepository(repository.id)} className="btn-remove">
              Remover
            </button>	
			<button onClick={() => handleLikeRepository(repository.id)} className="btn-like ">
              Like
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
		<div className="add-repository-container">
      <div className="add-items">
			<input
			type="text"
			name="title"
			placeholder="title"
			required
			value={title}
			onChange={(e) => setTitles(e.target.value)}
			/>
      </div>
      <div className="add-items">
			<input
			type="text"
			name="url"
			placeholder="url"
			required
			value={url}
			onChange={(e) => setUrls(e.target.value)}
			/>
      </div>
      <div className="add-items">
			<textarea
			name="techs"
			placeholder="Techs"
			required
			value={techs}
			onChange={(e) => setTechs(e.target.value)}
			/>
      </div>
		</div>
        <button type="submit" className="btn-add">Adicionar</button>
      </form>
    </>
  );
}

export default App;