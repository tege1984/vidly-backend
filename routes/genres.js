const express = require("express");
const Joi = require("joi");
const router = express.Router();

const geners = [
  { id: 1, gener: "Action" },
  { id: 2, gener: "Drama" },
  { id: 3, gener: "Comedy" },
  { id: 4, gener: "Romance" }
];

router.get("/", (req, res) => {
  res.send(geners);
});
router.get("/:id", (req, res) => {
  const gener = geners.find(g => g.id === parseInt(req.params.id));
  if (!gener)
    return res.status(404).send("The gener with the given id is not found");
  res.send(gener);
});
router.post("/", (req, res) => {
  const { error } = generValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gener = {
    id: geners.length + 1,
    gener: req.body.gener
  };

  geners.push(gener);
  res.send(gener);
});

router.put("/:id", (req, res) => {
  const gener = geners.find(g => g.id === parseInt(req.params.id));
  if (!gener)
    return res.status(404).send("The gener with the given id is not found");

  const { error } = generValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const index = geners.indexOf(gener);
  geners[index].gener = req.body.gener;
  res.send(gener);
});
router.delete("/:id", (req, res) => {
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

module.exports = router;
