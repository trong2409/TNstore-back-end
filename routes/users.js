import express from "express";

const router = express.Router();

// Get all users
router.get("/", async () => {});

// Get specific user
router.get("/:id", async () => {});

// Get with users pagination
router.get("/:page/:size/", async () => {});

// Create new user
router.post("/", async () => {});

// Update user
router.patch("/", async () => {});

// Remove user
router.delete("/", async () => {});

export default router;
