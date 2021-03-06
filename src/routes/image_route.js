const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image_controller');

router.get("/:id", imageController.getImage);

module.exports = router