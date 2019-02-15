'use strict';

const express = require('express'),
  router = express.Router(),
// fetch services
  { getPoliciesByClientId, getPolicyById } = require('../services/policies'),
  { getClientByName, getClientById } = require('../services/clients');

/* 
  get policies linked to username
 */
router.get('/policies/:name', ({ params, session }, res, next) => {
  
  // send unauthorized if not logged in
  if (!session.currentUser || session.currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }

  getClientByName(params.name)
    .then(client => {
      // send 404 if not found
      if (!client) {
        return res.status(404).json({ code: 'client-not-found' })
      }
      getPoliciesByClientId(client.id)
        .then(policies => {
          // send 404 if not found
          if (!policies) {
            return res.status(404).json({ code: 'no-policies-found' })
          }
          // return found policies
          res.status(200).json(policies);
        })
        .catch(next);
    })
    .catch(next);
});

/* 
  get client by policy id
 */
router.get('/policyowner/:id', ({ params, session }, res, next) => {

  // send unauthorized if not logged in
  if (!session.currentUser || session.currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }

  getPolicyById(params.id)
    .then(policy => {
      // send 404 if not found
      if (!policy) {
        return res.status(404).json({ code: 'policy-not-found' })
      }
      getClientById(policy.clientId)
        .then(client => {
          // send 404 if not found
          if (!client) {
            return res.status(404).json({ code: 'client-not-found' })
          }
          // return found client
          res.status(200).json(client);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
