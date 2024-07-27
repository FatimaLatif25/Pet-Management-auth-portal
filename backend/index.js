const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = "your-secret-key"; // You should store this in an environment variable for security

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Mock database
const users = [];
const pets = [];

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) return res.sendStatus(401); // If no token

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user; // Store user information in request object
    next();
  });
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, {
    expiresIn: "4h",
  });
};

// Signup route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation 
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username, email, and password" });
  }

  // Check if user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Create new user
  const newUser = { username, email, password };
  users.push(newUser);

  // Generate token
  const token = generateToken(newUser);

  res.status(201).json({ token });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = generateToken(user);

  res.status(200).json({ token });
});

// Protected route example
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: "Access granted", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Get pets route
app.get("/pets", authenticateToken, (req, res) => {
  res.json(pets);
});

// Add pet route
app.post("/pets", authenticateToken, (req, res) => {
  const { name, type, breed, price } = req.body;

  if (!name || !type || !breed || price == null) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newPet = { id: pets.length + 1, name, type, breed, price };
  pets.push(newPet);

  res.status(201).json(newPet);
});

// Update pet route
app.put("/pets/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, type, breed, price } = req.body;

  const pet = pets.find((pet) => pet.id === parseInt(id));
  if (!pet) {
    return res.status(404).json({ message: "Pet not found" });
  }

  pet.name = name || pet.name;
  pet.type = type || pet.type;
  pet.breed = breed || pet.breed;
  pet.price = price || pet.price;

  res.json(pet);
});

// Delete pet route
app.delete("/pets/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  console.log(`Trying to delete pet with ID: ${id}`);
  const index = pets.findIndex((pet) => pet.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Pet not found" });
  }

  pets.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
