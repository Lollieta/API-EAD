const express = require('express');
const router = express.Router();
const ModuloController = require('../controllers/moduloController');

router.get('/', ModuloController.getAllModulos);
router.get('/:id', ModuloController.getModuloById);
router.get('/curso/:id_curso', ModuloController.getModulosByCursoId);
router.post('/', ModuloController.createModulo);
router.put('/:id', ModuloController.updateModulo);
router.delete('/:id', ModuloController.deleteModulo);

module.exports = router;
