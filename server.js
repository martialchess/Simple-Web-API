const express = require("express");
const notesRoutes = require("./routes/notes");
const { notFoundError } = require("./utils/errors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

// 404 Middleware
app.use((req, res, next) => {
    next(new notFoundError("Route not found"));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});