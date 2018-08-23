const express = require("express");
const Joi = require("joi");
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
app.post("/api/geners", (req, res) => {
  const { error } = generValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gener = {
    id: geners.length + 1,
    gener: req.body.gener
  };

  geners.push(gener);
  res.send(gener);
});

app.put("/api/geners/:id", (req, res) => {
  const gener = geners.find(g => g.id === parseInt(req.params.id));
  if (!gener)
    return res.status(404).send("The gener with the given id is not found");

  const { error } = generValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const index = geners.indexOf(gener);
  geners[index].gener = req.body.gener;
  res.send(gener);
});
app.delete("/api/geners/:id", (req, res) => {
  const gener = geners.find(g => g.id === parseInt(req.params.id));
  if (!gener)
    return res.status(404).send("The gener with the given id is not found");

  const index = geners.indexOf(gener);
  geners.splice(index, 1);
  res.send(gener);
});

function generValidate(gener) {
  const schema = {
    gener: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(gener, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
