var AgendaModel = require('../models/AgendaModel.js');

/**
 * AgendaController.js
 *
 * @description :: Server-side logic for managing Agendas.
 */
module.exports = {

    /**
     * AgendaController.list()
     */
    list: function (req, res) {
        AgendaModel.find(function (err, Agendas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Agenda.',
                    error: err
                });
            }
            return res.json(Agendas);
        });
    },

    /**
     * AgendaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        AgendaModel.findOne({_id: id}, function (err, Agenda) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Agenda.',
                    error: err
                });
            }
            if (!Agenda) {
                return res.status(404).json({
                    message: 'No such Agenda'
                });
            }
            return res.json(Agenda);
        });
    },

    /**
     * AgendaController.create()
     */
    create: function (req, res) {
        var Agenda = new AgendaModel({
			nombre : req.body.nombre,
			apellidos : req.body.apellidos,
			fechaNacimiento : req.body.fechaNacimiento,
			telefono : req.body.telefono,
			correo : req.body.correo

        });

        Agenda.save(function (err, Agenda) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Agenda',
                    error: err
                });
            }
            return res.status(201).json(Agenda);
        });
    },

    /**
     * AgendaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        AgendaModel.findOne({_id: id}, function (err, Agenda) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Agenda',
                    error: err
                });
            }
            if (!Agenda) {
                return res.status(404).json({
                    message: 'No such Agenda'
                });
            }

            Agenda.nombre = req.body.nombre ? req.body.nombre : Agenda.nombre;
			Agenda.apellidos = req.body.apellidos ? req.body.apellidos : Agenda.apellidos;
			Agenda.fechaNacimiento = req.body.fechaNacimiento ? req.body.fechaNacimiento : Agenda.fechaNacimiento;
			Agenda.telefono = req.body.telefono ? req.body.telefono : Agenda.telefono;
			Agenda.correo = req.body.correo ? req.body.correo : Agenda.correo;
			
            Agenda.save(function (err, Agenda) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Agenda.',
                        error: err
                    });
                }

                return res.json(Agenda);
            });
        });
    },

    /**
     * AgendaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        AgendaModel.findByIdAndRemove(id, function (err, Agenda) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Agenda.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
