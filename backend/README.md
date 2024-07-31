Film Management API
Overview
This project implements a RESTful API for managing a film collection. It is built using Node.js and Express, utilizes Sequelize for ORM with a MySQL database, and includes features for viewing, adding, updating, and deleting films. The API also handles user authentication and film purchases.

Table of Contents
Setup Instructions
API Endpoints
Database
Business Logic
Testing
Documentation
Error Handling
Bonus Features
Contributing
License
Setup Instructions
To run the application locally, follow these steps:

Clone the Repository:

postmAN https://documenter.getpostman.com/view/22488992/2sA3kbgyZ1
git clone https://github.com/Tochukwu1159/film-management-api.git
cd film-management-api
Install Dependencies:


npm install
Create a .env File:
Add your environment variables to a .env file in the root directory:


DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run Database Migrations:


npx sequelize-cli db:migrate
Start the Server:


npm start
The application will be accessible at http://localhost:5000.

Access MySQL Database Console:
The MySQL database console is available at http://localhost:8080/phpmyadmin. Use the JDBC URL jdbc:mysql://localhost:3306/your-database-name to connect. Update the values in .env accordingly.

API Endpoints
User Registration (Admin): POST /api/v1/users/admin

Registers an admin user for managing films.
User Registration (Buyer): POST /api/v1/users/buyer

Registers a buyer who can purchase films.
Login: POST /api/v1/users/login

Logs in either an admin or a buyer.
Get All Films: GET /api/v1/films

Retrieves a list of all available films.
Add a New Film: POST /api/v1/films

Adds a new film to the collection. Admin authentication required.
Update Film Details: PUT /api/v1/films/:id

Updates details of a specific film. Admin authentication required.
Delete a Film: DELETE /api/v1/films/:id

Deletes a specific film from the collection. Admin authentication required.
Purchase a Film: POST /api/v1/purchase

Allows a buyer to purchase a film. User authentication required.
Database
The application uses a MySQL database for data storage. Sequelize ORM is used for database interactions. The provided .env file includes database configuration.

Business Logic
The API includes logic for managing film availability and purchases. Films can be added, updated, or deleted by admins, while buyers can purchase films.

Testing
Unit tests are implemented to ensure the correctness of the application. These tests cover various scenarios, including CRUD operations and business logic.

To run tests, execute the following command:


npm test
Documentation
API documentation is crucial for developers and users to understand how to interact with the application. Documentation for this project can be found in the docs directory.

Swagger Documentation
Postman Documentation
Error Handling
Proper error handling is implemented throughout the API. The application returns appropriate HTTP status codes and error messages to indicate the result of each request.

Bonus Features
This project includes optional bonus features:

Authentication: Protect API endpoints with authentication.
Front-End Client: Implement a simple front-end client to interact with the API.
Contributing
Contributions are welcome! Feel free to open issues and pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for details.