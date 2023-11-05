const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	// TODO
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	// TODO
	const { title, url, techs } = request.body;
	const repository = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repository);

	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	// TODO
});

app.delete("/repositories/:id", (request, response) => {
	// TODO
	const { id } = request.params;

	const findRepositoryIndex = repositories.findIndex(
		(repository) => repository.id == id
	);

	if (findRepositoryIndex >= 0) {
		repositories.splice(findRepositoryIndex, 1);
	} else {
		return response.status(400).json({ error: "Repositório inexistente!" });
	}

	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	// TODO
});

// Start the server
app.listen("3333", () => {
	console.log(`Server is running on http://localhost:3333`);
});

module.exports = app;
