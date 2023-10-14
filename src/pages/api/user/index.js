const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Create a new user
app.post('/api/user', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body,
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

// Read all users
app.get('/api/user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

// Read a specific user by ID
app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the user" });
    }
});

// Update a user by ID
app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: req.body,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
});

// Delete a user by ID
app.delete('/api/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the user" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
