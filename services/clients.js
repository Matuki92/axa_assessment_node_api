'use strict';

const fetch = require('node-fetch'),
  API_URL = 'http://www.mocky.io/v2/5808862710000087232b75ac';

module.exports = {
  getClientById: async id => {
    try {
      const response = await fetch(API_URL);
  
      if (response.status === 200) {
        const data = await response.json();
  
        const foundClient = data.clients.find(client => {
          return client.id === id;
        });
  
        return foundClient || null;
      }
  
      // for other status codes, log error and return null.
      console.log(`failed to fetch "${API_URL}", server responded with status ${response.status}`);

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getClientByName: async name => {
    try {
      const response = await fetch(API_URL);
  
      if (response.status === 200) {
        const data = await response.json();
  
        const foundClient = data.clients.find(client => {
          // transform to lowercase for better search results
          return client.name.toLowerCase() === name.toLowerCase();
        });
  
        return foundClient || null;
      }
  
      // for other status codes, log error and return null.
      console.log(`failed to fetch "${API_URL}", server responded with status ${response.status}`);

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getClientByEmail: async email => {
    try {
      const response = await fetch(API_URL);
  
      // proceed if status 200
      if (response.status === 200) {
        const data = await response.json();
  
        const foundClient = data.clients.find(client => {
          // transform to lowercase for better search results
          return client.email.toLowerCase() === email.toLowerCase();
        });
  
        return foundClient || null;
      }
  
      // for other status codes, log error and return null.
      console.log(`failed to fetch "${URL}", server responded with status ${response.status}`);

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}