const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());

const geners = [
  { id: 1, gener: "Action" },
  { id: 2, gener: "Drama" },
  { id: 3, gener: "Comedy" },
  { id: 4, gener: "Romance" }
];

app.get("/", (req, res) => {
  res.send("wellcome to vidly-backend project");
});

app.get("/api/geners", (req, res) => {
  res.send(geners);
});
app.get("/api/geners/:id", (req, res) => {
  const gener = geners.find(g => g.id === parseInt(req.params.id));
  if (!gener)
    return res.status(404).send("The gener with the given id is not found");
  res.send(gener);
});
app.post("/api/geners", (req, res) => {});
app.put("/api/geners/:id", (req, res) => {});
app.delete("/api/geners/:id", (req, res) => {});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
