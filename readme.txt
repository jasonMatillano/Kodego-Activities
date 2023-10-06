# Product Management CRUD Application using Node.js

Instructions:

# Step 1: Setting Up the Server
*** Create a file named server.js in your project folder. *** 
*** Import necessary Node.js modules: http, url, querystring, and fs.  ***
*** Create a file named products.json, for this is where you’re going to store and manipulate the data. ***
*** Create an HTTP server and listen on a specific port (e.g., 3000). ***

# Step 2: Implementing CRUD Operations

*** 1. Create (POST) ***
```
Handle POST requests to /products endpoint.
Parse incoming data (product details) from the request body.
Add the new product to the products array.
Return the created product with a 201 status code.
```

*** 2. Get All Products (GET) ***
```
Handle GET requests to /products endpoint.
Return the list of all products from the products array with a 200 status code.
```

*** 3. Read Single Product (GET) ***
```
Handle GET requests to /products/{id} endpoint (replace {id} with the product ID).
Extract the product ID from the URL and find the product with the matching ID.
Return the product details with a 200 status code if found; otherwise, return a 404 status code.
```

*** 4. Update (PUT) ***
```
Handle PUT requests to /products/{id} endpoint (replace {id} with the product ID).
Extract the product ID from the URL and find the product with the matching ID.
Parse incoming data (updated product details) from the request body.
Update the product details in the products array.
Return the updated product with a 200 status code if found; otherwise, return a 404 status code.
```

*** 5. Delete (DELETE) ***
```
Handle DELETE requests to /products/{id} endpoint (replace {id} with the product ID).
Extract the product ID from the URL and find the product with the matching ID.
Remove the product from the products array.
Return the deleted product with a 200 status code if found; otherwise, return a 404 status code.
```

# Additional Instructions:
```
Implement basic error handling for invalid routes and malformed requests.
Store data persistently: Consider using a JSON file to store products data between server restarts.
Add validation: Ensure that product fields are validated before processing CRUD operations.
Enhance the API: Add more features like pagination, filtering, or sorting based on product attributes.
```

# IMPORTANT NOTE:
```
SUBMIT THE CODE IN SCREENSHOT FORM
I WON’T ACCEPT ANY ZIP FILES AS SUBMISSION
ADD DESCRIPTION PER CODE SCREENSHOT
EXPLAIN THE FLOW
EXPLAIN WHY IS IT USED
ENJOY!
```