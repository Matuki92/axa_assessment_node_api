# BACKEND assessment test API

### STEPS

  - clone or download repo.
  ```sh
  $ git clone https://github.com/Matuki92/axa_assessment_node_api.git
  ```
  ```sh
  cd axa_assessment_node_api
  ```
  
  - install dependencies
  ```sh
  $ npm install
  ```

  - run server
  ```sh
  $ npm start
  ```

  - access the routes on http://localhost:3000/ (stated below)
  
  * IMPORTANT: in order to login you must use [Postman] client or web extension, or similar program to be able to send a body in the request.
  The body must be in json format and contain the following information.
  ```
  { "email" : <user-email>, "password" : "112233" }
  ```
  Use any client email to log in, all the passwords are "112233" for testing purposes, obviously.

  Here's the api url that provides the full list of clients.
  ```
  http://www.mocky.io/v2/5808862710000087232b75ac
  ```
  or if you feel lazy, here's an email that you can use to log in.
  ```
  manningblankenship@quotezart.com
  ```

### ROUTES
```
GET /clients/id/<id> 
```
Example client id "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
- (Returns client object with matching id, no login required.
```
GET /clients/name/<name>
```
Example name "Manning"
- (Returns client object with matching name, no login required.
```
POST /auth/login
```
- IMPORTANT: must send request body json, read steps above.
- Logs user in only if authentication succeeds.
```
POST /auth/logout
```
- Logs user out of the current session.
```
GET /admin/policyowner/<policy_number>
```
Example policy number "56b415d6-53ee-4481-994f-4bffa47b5239"
- Returns client object owner of matching policy, must be logged in.
```
GET /admin/policies/<name>
```
- Returns array of policies objects owned by matching client name, must be logged in.

### TECHNOLOGIES USED

  - [Node.js] with [Express] framework, generated with [express-generator] and updated to ES.
  - [node-fetch] for fetch API inside node.
  - [express-session] for session storage.
  - [bcrypt] for password encrypting and validation.


### COULD HAVE DONE

  - unit testing
  - use of lodash
  - more frequent git push
  - move all the data from the two api urls to a mongodb collection and use it along with session storage on mlab
