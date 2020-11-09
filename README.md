# Technical Test 1

  

Run `npm install` to get started.

Once installed `npm run start:dev` will start up the development server.

Running `npm build` will bundle the files for deployment.

  

### TODO:
 - Refactor API calls to use the most sensible API
 - Add md5 library and generate authentication string dynamically
 - Add logic to API calls so they return data and pagination logic in one
 - Calculate servings size using ingredient API

#### Issues
 - Any authorized API endpoint returns unauthorized error with an identical MD5 string as the one sent in the request. It appears as though the Authorization header is being stripped before being sent as it is not present in the browser network request, however no evidence of this was found in testing. 
