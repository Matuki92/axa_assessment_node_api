'use strict';

const express = require('express'),
  router = express.Router(),
// fetch services
  { getClientById, getClientByName } = require('../services/clients');

/* 
  get client by id
*/
router.get('/id/:id', ({ params }, res, next) => {

  getClientById(params.id)
    .then(client => {
      // send 404 if not found
      if (!client) {
        return res.status(404).json({ code: 'client-not-found' })
      }
      // return found client
      res.status(200).json(client);
    })
    .catch(next);
});

/* 
  get client by name
 */
router.get('/name/:name', ({ params }, res, next) => {

  getClientByName(params.name)
    .then(client => {
      // send 404 if not found
      if (!client) {
        return res.status(404).json({ code: 'client-not-found' })
      }
      // return found client
      res.status(200).json(client);
    })
    .catch(next);
});

module.exports = router;
