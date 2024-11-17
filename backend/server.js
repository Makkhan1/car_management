const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();




const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

app.get('/' , (req , res)=>{
      res.send('backend is running fine');
})

app.get('/api/docs', (req, res) => {
      res.json({
        "API Documentation": {
          "Endpoints": [
            {
              method: "POST",
              endpoint: "/api/auth/signup",
              description: "Sign up a new user.",
              request: {
                body: {
                  username: "string",
                  email: "string",
                  password: "string"
                }
              },
              response: {
                status: 201,
                body: {
                  message: "User created successfully.",
                  userId: "string"
                }
              }
            },
            {
              method: "POST",
              endpoint: "/api/auth/login",
              description: "Log in an existing user.",
              request: {
                body: {
                  email: "string",
                  password: "string"
                }
              },
              response: {
                status: 200,
                body: {
                  message: "Login successful.",
                  token: "string"
                }
              }
            },
            {
              method: "GET",
              endpoint: "/api/cars",
              description: "Retrieve a list of all cars.",
              authentication: "Bearer Token",
              response: {
                status: 200,
                body: [
                  {
                    _id: "string",
                    title: "string",
                    description: "string",
                    tags: ["string"],
                    images: ["string"]
                  }
                ]
              }
            },
            {
              method: "PUT",
              endpoint: "/api/cars/:id",
              description: "Update a car's details.",
              authentication: "Bearer Token",
              request: {
                params: { id: "Car ID (string)" },
                body: {
                  title: "string (optional)",
                  description: "string (optional)",
                  tags: ["string (optional)"],
                  images: ["File uploads (optional)" ]
                }
              },
              response: {
                status: 200,
                body: { message: "Car updated successfully." }
              }
            },
            {
              method: "DELETE",
              endpoint: "/api/cars/:id",
              description: "Delete a specific car.",
              authentication: "Bearer Token",
              request: {
                params: { id: "Car ID (string)" }
              },
              response: {
                status: 200,
                body: { message: "Car deleted successfully." }
              }
            }
          ]
        }
      });
    });

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch((error) => console.log(error.message));


  