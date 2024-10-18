const express = require('express');
const router = express.Router();
const TesteController = require('../controllers/testeController');

router.get('/', TesteController.getAllTestes);
router.get('/:id', TesteController.getTesteById);
router.post('/', TesteController.createTeste);
router.put('/:id', TesteController.updateTeste);
router.delete('/:id', TesteController.deleteTeste);

router.get('/:idTeste/perguntas', TesteController.getPerguntasByTesteId);
router.post('/:idTeste/perguntas', TesteController.createPergunta);

router.post('/perguntas/:idPergunta/opcoes', TesteController.createOpcao);

router.post('/perguntas/:idPergunta/respostas', TesteController.createResposta);

module.exports = router;
