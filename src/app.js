const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid()
  };
  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const index = repositories.findIndex((repo)=>  repo.id === id);
  if(index < 0){
    response.status(400).json("Bad Request");
    return;
  }

  repositories[index] = {
    title,
    url,
    techs,
    likes: repositories[index].likes,
    id: repositories[index].id
  }
  response.json(repositories[index] );
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex((repo)=>  repo.id === id);
  if(index < 0){
    response.status(400).json("Bad Request");
    return;
  }
  const repository = repositories[index];
  repositories.splice(index,1);
  response.status(204).json("No Content");
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex((repo)=>  repo.id === id);
  if(index < 0){
    response.status(400).json("Bad Request");
    return;
  }
  repositories[index].likes++;
  response.json({likes:repositories[index].likes});
});

module.exports = app;
