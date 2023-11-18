const express = require('express');
const route = express.Router();
const controller = require('../controllers/controller');

route.get('/', controller.listOccurrences);
route.post('/', controller.addOccurrences);
route.delete('/:id', controller.delOccurrences);
route.put('/:id', controller.updateOccurrences);

module.exports = route;