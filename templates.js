const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch all templates
router.get('/templates', async (req, res) => {
    try {
        const [templates] = await db.query("SELECT * FROM Templates");
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: "Error fetching templates", error });
    }
});

// Add new template
router.post('/templates', async (req, res) => {
    const { title, content, uploaded_by } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Templates (title, content, uploaded_by) VALUES (?, ?, ?)",
            [title, content, uploaded_by]
        );
        res.json({ message: "Template added successfully", templateId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error adding template", error });
    }
});

module.exports = router;
