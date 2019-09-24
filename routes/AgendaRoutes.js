import express from 'express';
var router = express.Router();
var AgendaController = require('../controllers/AgendaController.js');

/*
 * GET
 */
router.get('/', AgendaController.list);

/*
 * GET
 */
router.get('/:id', AgendaController.show);

/*
 * POST
 */
router.post('/', AgendaController.create);

/*
 * PUT
 */
router.put('/:id', AgendaController.update);

/*
 * DELETE
 */
router.delete('/:id', AgendaController.remove);

module.exports = router;
