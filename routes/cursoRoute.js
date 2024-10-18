const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/cursoController');

router.get('/', CursoController.getAllCursos);
router.get('/:id', CursoController.getCursoById);
router.post('/', CursoController.createCurso);
router.put('/:id', CursoController.updateCurso);
router.delete('/:id', CursoController.deleteCurso);

module.exports = router;
