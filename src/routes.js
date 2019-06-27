const { Router } = require("express");

const routes = new Router();

const projects = [];

routes.post("/projects", (req, res) => {
  for (const iterator of req.body) {
    projects.push(iterator);
  }
  return res.json(projects);
});

routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex((item, i) => item.id === id);
  projects[index].title = title;
  return res.json(projects);
});

routes.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex((item, i) => item.id === id);
  projects.splice(index, 1);
  return res.send();
});

routes.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { tasks } = req.body;
  const { id } = req.params;
  const index = projects.findIndex((item, i) => item.id === id);
  projects[index].tasks = tasks;
  return res.json(projects[index]);
});

function checkProjectInArray(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex((item, i) => item.id === id);
  if (index === -1) {
    return res.status(400).json({ error: "project not exists" });
  }

  return next();
}

module.exports = routes;
