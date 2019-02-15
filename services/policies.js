'use strict';

const fetch = require('node-fetch'),
  API_URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

module.exports = {
  /* 
    get policy by number id
  */
  getPolicyById: async id => {
    try {
      const response = await fetch(API_URL);
  
      // proceed only if status is 200
      if (response.status === 200) {
        const data = await response.json();
  
        const foundPolicy = data.policies.find(policy => {
          return policy.id === id;
        });
  
        return foundPolicy || null;
      }
      
      // for other status codes, log error and return null.
      console.log(`failed to fetch "${API_URL}", server responded with status ${response.status}`);

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  /* 
    get policies by client id
  */
  getPoliciesByClientId: async clientId => {
    try {
      const response = await fetch(API_URL);
  
      // proceed if status 200
      if (response.status === 200) {
        const data = await response.json();
  
        const foundPolicies = data.policies.filter(policy => {
          return policy.clientId === clientId;
        });

        return foundPolicies.length > 0 ? foundPolicies : null;
      }
      
      // for other status codes, log error and return null.
      console.log(`failed to fetch "${API_URL}", server responded with status ${response.status}`);

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}