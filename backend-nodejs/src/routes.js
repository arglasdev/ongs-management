const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const { celebrate, Segments, Joi} = require('celebrate');

const routes = express.Router();

routes.get('/ongs',ongController.list);

/* Quando a chave do objeto é uma variável do javascript, é necessário colocar entre colchetes em volta */
routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })

}), ongController.create);
routes.delete('/ongs', ongController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.list);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })

}), incidentController.delete);

routes.get('/profile', celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

}), profileController.find);

routes.post('/sessions', sessionController.create);

module.exports = routes;


