import express from 'express';
var router = express.Router();

import {verificaToken, verificaRol} from '../middlewares/autenticacion';

//Incluimos el controlador
var UserController = require('../controllers/UserController');

/*
 * POST
 */
router.post('/nuevo-usuario', [verificaToken, verificaRol], UserController.create);

/*
 * PUT
 */
router.put('/usuarios/:id', [verificaToken], UserController.update);

/*
 * DELETE
 */
router.delete('/usuarios/:id', [verificaToken, verificaRol], UserController.remove);

/*
 * GET
 */
router.get('/usuarios', [verificaToken, verificaRol], UserController.list);


module.exports = router;
