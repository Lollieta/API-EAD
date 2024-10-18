const express = require('express');
const router = express.Router();
const LicaoController = require('../controllers/licaoController');

router.get('/modulo/:id_modulo', LicaoController.getAllByModuloId);
router.get('/:id', LicaoController.getLicaoById);
router.post('/', LicaoController.createLicao);
router.put('/:id', LicaoController.updateLicao);
router.delete('/:id', LicaoController.deleteLicao);

module.exports = router;
