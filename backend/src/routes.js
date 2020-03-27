const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();



//login
routes.post('/session',sessionController.create);


//ongs
routes.get('/ongs',ongController.index);
routes.post('/ongs',ongController.create);


//casos
routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.index);
routes.delete('/incidents/:id',incidentController.delete);

//profile
routes.get('/profile',profileController.index);

//Exportando rotas
module.exports = routes;