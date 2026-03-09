
![QuickDrop Banner](../QuickDrop-client/src/assets/qdban.png)

# QuickDrop

QuickDrop is a full-stack parcel delivery management web application that allows users to create delivery orders, track parcels, and manage delivery operations through an admin dashboard. The system is designed to simplify the process of sending and managing parcels through a modern web interface.

## Project Screenshot

![Project Screenshot](../QuickDrop-client/src/assets/qdban.png)

You can replace the image path with any hosted image URL or another file inside the repository.

## Live Demo

Frontend: https://your-frontend-url.vercel.app
Backend API: https://your-backend-url.onrender.com

## Features

User Features

* User registration and login
* Create parcel delivery requests
* Track parcel delivery status
* View delivery history
* Update user profile information

Admin Features

* View all delivery orders
* Manage parcel delivery status
* Monitor system activity

General Features

* Secure authentication
* RESTful API architecture
* Responsive user interface
* Environment variable configuration for security

## Tech Stack

Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

## Installation and Setup

### Clone the Repository

cd quickdrop

### Install Dependencies

Backend

cd server
npm install

Frontend

cd client
npm install

### Environment Variables

Create a `.env` file in the server directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Run the Application

Backend

npm run dev

Frontend

npm run dev

The frontend will typically run on:

http://localhost:5173

## Project Structure

quickdrop
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── config
│
└── README.md

## Deployment

Frontend is deployed using Vercel.

Backend is deployed using Render.

MongoDB Atlas is used as the production database.

## Future Improvements

* Real-time parcel tracking
* Delivery agent dashboard
* Notification system
* Payment gateway integration
* Analytics dashboard for admins

## Author
Naimur Rahman

## License

This project is licensed under the Naimur's DevCraft License.
