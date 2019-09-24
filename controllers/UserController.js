// Importamos modelo User
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar campos de PUT
const _ = require('underscore');

/**
 * AgendaController.js
 *
 * @description :: Controlador para el manejo de usuarios
 */
module.exports = {

    /**
     * UserController.create()
     */
    create: async (req, res) => {

        const body = {
          nombre: req.body.nombre,
          email: req.body.email,
          role: req.body.role
        }
      
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
      
        try {
      
          const userDB = await User.create(body);
      
          return res.json(userDB);
          
        } catch (error) {
          return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
          });
        }
      
    },

    update: async(req, res) => {

        let id = req.params.id;
        let body = _.pick(req.body, ['nombre', 'email', 'role', 'pass']);
        if(body.pass){
          body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
        }
      
        try {
          // {new:true} nos devuelve el usuario actualizado
          const usuarioDB = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});
      
          return res.json(usuarioDB);
      
        } catch (error) {
          return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
          })
        }
      
    },

    list:  async(req, res) => {

        // Leemos las query y pasamos a números
        let inicio = Number(req.query.inicio) || 0;
        let limite = Number(req.query.limite) || 5;
      
        try {
      
          const usuariosDB = await User.find().skip(inicio).limit(limite);
          const cantidadUsuarios = await User.countDocuments();
          return res.json({usuariosDB, cantidadUsuarios});
          
        } catch (error) {
          return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
          })
        }
      
    },

    remove: async(req, res) => {

        let id = req.params.id;
      
        try {
      
          const usuarioDelete = await User.findByIdAndRemove(id);
      
          if(!usuarioDelete){
            return res.status(400).json({
              mensaje: 'Usuario no encontrado'
            })
          }
      
          return res.json(usuarioDelete);
          
        } catch (error) {
          return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
          })
        }
      
    },

};