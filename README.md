AssignFlow
A backend system designed to manage user assignments, enabling admin-level users to create, accept, and reject tasks. This application ensures secure access and smooth functionality for managing tasks and users.

Features
User Authentication (JWT-based).
Role-based access control (Admin-only access to certain APIs).
CRUD operations for assignments.
Secure and modular backend architecture.
Easy setup and deployment.

Prerequisites:-
Ensure you have the following installed:
Node.js (version 16.x or above)
MongoDB (local or hosted)
Git


Installation
Clone the Repository
git clone https://github.com/darelixoo/AssignFlow.git
cd AssignFlow
Install Dependencies
npm install


Environment Setup
Create a .env file in the project root and add the following:
PORT=3000
MONGO_URI=mongodb://localhost:27017/assignflow
JWT_SECRET=yourSecretKeyHere


Run the Server
Start the development server:
npm start
The server will be available at http://localhost:3000.

Testing
Use Postman or similar API testing tools to test the endpoints.
Include the JWT token in the headers for protected routes.

