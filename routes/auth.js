'use strict';

const express = require('express'),
  router = express.Router(),
// fetch services
  { getClientByEmail } = require('../services/clients'),
// bcrypt
  bcrypt = require('bcrypt'),
 /* encrypted password for further comparing with the one sent with the body on login
 this obviously belongs in the user object, it's only here for testing purposes.
 the unenctrypted password is '112233'
 */
  fakeEncryptedPassword = '$2b$04$EVX94MqNfLgM50HOWLtI5e6/NMRPXo8FGfVolS.gfGiMHVXctrJEW';

/* 
  user login
*/
router.post('/login', ({ body, session }, res, next) => {

  // sends 401 if the user is already logged in 
  if (session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  } 
  
  // return validation error if there's no email or password in the request body
  if (!body.email && !password) {
    return res.status(422).json({ code: 'validation' });
  }

  getClientByEmail(body.email)
    .then(client => {
      if (!client) {
        return res.status(404).json({ code: 'client-not-found' });
      } else if (bcrypt.compareSync(body.password, fakeEncryptedPassword)) { // check wether the entered password matches with the encrypted one
        // save client into the current session
        session.currentUser = client
        // send the client object back, for frontend displaying purposes
        return res.status(200).json(client);
      }
      // send 401 if passwords don't match
      res.status(401).json({ code: 'unauthorized' });
    })
    .catch(next);
});

/* 
  user logout
*/
router.post('/logout', ({ session }, res, next) => {

  // send unauthorized if there is no logged user in the session
  if (!session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  // delete user from session and return OK
  delete session.currentUser;
  return res.status(204).send();
});



module.exports = router;