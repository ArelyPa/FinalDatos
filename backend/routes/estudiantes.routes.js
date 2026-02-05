const express = require('express');
const router = express.Router();

const {
  getAllEstudiantes,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante
} = require('../services/postgres.service');

router.get('/', async (req, res) => {
  try {
    res.json(await getAllEstudiantes());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    res.status(201).json(await createEstudiante(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    res.json(await updateEstudiante(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    res.json(await deleteEstudiante(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
