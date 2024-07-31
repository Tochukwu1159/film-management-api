Film Management Frontend
Overview
This project is a frontend application for managing a film collection, built using React and Material-UI. It interacts with the Film Management API to provide functionalities for viewing, adding, updating, and deleting films. The frontend also includes user authentication and film purchasing features.

Table of Contents
Setup Instructions
Project Structure
Available Scripts
API Integration
Authentication
Error Handling
Testing
Documentation
Contributing
License
Setup Instructions
To run the application locally, follow these steps:

Clone the Repository:


git clone https://github.com/Tochukwu1159/film-management-frontend.git
cd film-management-frontend
Install Dependencies:


npm install
Create a .env File:
Add your environment variables to a .env file in the root directory:

env
Copy code
REACT_APP_API_URL=http://localhost:5000/api/v1
Start the Development Server:


npm start
The application will be accessible at http://localhost:3000.

Project Structure
src/: Contains the application source code.
components/: Reusable React components.
pages/: Components representing different pages of the application.
services/: API service functions.
styles/: Application-wide styles.
utils/: Utility functions and constants.
App.js: Main application component.
index.js: Entry point for the React application.
Available Scripts
In the project directory, you can run:

npm start: Starts the development server at http://localhost:3000.
npm run build: Builds the app for production to the build folder.
npm test: Runs the test suite.
API Integration
The frontend interacts with the backend API through the following endpoints:

Get All Films: /films
Add a New Film: /films
Update Film Details: /films/:id
Delete a Film: /films/:id
Purchase a Film: /purchase
Login: /users/login
Register Admin: /users/admin
Register Buyer: /users/buyer
API interactions are managed through service functions in the src/services directory.

Authentication
The application uses JWT for user authentication. Authentication tokens are stored in localStorage and included in API requests for protected routes.

Error Handling
Error handling is implemented to provide feedback to users. Errors are displayed using Material-UI components, and appropriate messages are shown based on the response from the API.

Testing
Unit tests and integration tests are implemented using Jest and React Testing Library. To run tests, use the following command:


npm test
Documentation
API documentation for the backend can be accessed here:

Swagger Documentation
Postman Documentation
Contributing
Contributions are welcome! Feel free to open issues and submit pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for details.