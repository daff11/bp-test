const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

// Create
router.post("/create", materialController.createMaterial);

// Get All
router.get("/", materialController.getAllMaterials);

// Get By Id
router.get("/:id", materialController.getMaterialById);

// Update
router.put("/:id", materialController.updateMaterial);

// Delete
router.delete("/:id", materialController.deleteMaterial);

// Seeder
router.post("/seed/faker", materialController.seedMaterials);

module.exports = router;