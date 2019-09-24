var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AgendaSchema = new Schema({
	'nombre' : {type: String, required: true, max: 100},
	'apellidos' : {type: String, required: true, max: 100},
	'fechaNacimiento' : Date,
	'telefono' : String,
	'correo' : String
});

// Campo virtual para nombre completo
AgendaSchema
.virtual('fullname')
.get(function () {
  return this.nombre + ' ' + this.apellidos;
});

// Campo virtual para edad
AgendaSchema
.virtual('edad')
.get(function () {
  return ( new Date().getYear() - this.fechaNacimiento.getYear()).toString();
});

AgendaSchema.set('toObject', {virtuals: true});
AgendaSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Agenda', AgendaSchema);
